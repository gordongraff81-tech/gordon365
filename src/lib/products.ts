import fs from "fs";
import path from "path";

/**
 * Marketplace product types
 *
 * Mirrors the structure of products/{id}/product.json as produced by the
 * Gordon365 template pipeline (CA Hardening Pack, MFA Rollout Kit,
 * Intune Compliance Starter, ...).
 *
 * Phase 1: no database. Products are read directly from the filesystem
 * at request/build time. Phase 2 will move this into Prisma/Neon without
 * changing the shape consumed by pages/components.
 */

export type ProductCategory = "security" | "intune" | "copilot" | "reporting";
export type ProductTier = "basic" | "professional" | "msp" | "enterprise";

export interface ProductVersionFiles {
  [key: string]: string; // e.g. "policy" | "guide" | "rolloutPlan" -> relative path
}

export interface ProductVersion {
  version: string;
  releasedAt: string;
  changelog: string;
  files: ProductVersionFiles;
}

export interface ProductDependency {
  product: string;
  relationship: string;
  description: string;
}

export interface ProductCrossSell {
  relatedProducts: string[];
  bundleEligible: boolean;
  dependencies?: ProductDependency[];
  dependencyNote?: string;
  sharedRolloutPattern?: string;
  upsellTrigger?: string;
}

export interface Product {
  id: string;
  title: string;
  category: ProductCategory;
  tier: ProductTier;
  priceCents: number;
  /** Stripe Price ID (price_xxx). Null until created in Stripe dashboard / synced to env. */
  stripePriceId: string | null;
  /** Relative path to a markdown description file, resolved by getProductDescription() */
  description: string;
  currentVersion: string;
  versions: ProductVersion[];
  previewFile: string;
  ms365dscReady: boolean;
  crossSell: ProductCrossSell;
}

const PRODUCTS_DIR = path.join(process.cwd(), "products");

/**
 * Returns the slugs (directory names) of all products that have a
 * product.json file. Order is alphabetical by directory name.
 */
function getProductSlugs(): string[] {
  if (!fs.existsSync(PRODUCTS_DIR)) return [];
  return fs
    .readdirSync(PRODUCTS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) =>
      fs.existsSync(path.join(PRODUCTS_DIR, entry.name, "product.json"))
    )
    .map((entry) => entry.name)
    .sort();
}

/**
 * Loads and parses a single product.json by its slug (directory name).
 * Returns null if the product does not exist or product.json is invalid.
 */
export function getProductById(id: string): Product | null {
  const filePath = path.join(PRODUCTS_DIR, id, "product.json");
  if (!fs.existsSync(filePath)) return null;

  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw) as Product;
    return data;
  } catch (err) {
    console.error(`Failed to load product.json for "${id}":`, err);
    return null;
  }
}

/**
 * Loads all products. Used for /templates overview pages.
 * Skips any product directory whose product.json fails to parse.
 */
export function getAllProducts(): Product[] {
  return getProductSlugs()
    .map((slug) => getProductById(slug))
    .filter((p): p is Product => p !== null);
}

/**
 * Loads all products in a given category.
 */
export function getProductsByCategory(category: ProductCategory): Product[] {
  return getAllProducts().filter((p) => p.category === category);
}

/**
 * Resolves and reads a product's description markdown file.
 * `product.description` is a relative path like "./description.md"
 * relative to the product's directory (products/{id}/).
 *
 * Returns an empty string if the file does not exist, so pages can
 * render gracefully while content is still being written.
 */
export function getProductDescription(product: Product): string {
  const descPath = path.join(PRODUCTS_DIR, product.id, product.description);
  if (!fs.existsSync(descPath)) return "";
  return fs.readFileSync(descPath, "utf-8");
}

/**
 * Resolves the version entry for a product's currentVersion.
 * Falls back to the last entry in `versions` if currentVersion
 * doesn't match (defensive - should not happen with well-formed data).
 */
export function getCurrentVersion(product: Product): ProductVersion | null {
  const match = product.versions.find(
    (v) => v.version === product.currentVersion
  );
  return match ?? product.versions[product.versions.length - 1] ?? null;
}

/**
 * Resolves the absolute filesystem path to a file referenced in a
 * product version's `files` map (e.g. files.guide, files.policy).
 *
 * Used by the download route handler (Phase 1: direct file streaming
 * after Stripe checkout verification - see api/download/[token]).
 */
export function resolveProductFilePath(
  product: Product,
  fileKey: string,
  version?: string
): string | null {
  const versionEntry = version
    ? product.versions.find((v) => v.version === version)
    : getCurrentVersion(product);

  if (!versionEntry) return null;
  const relativePath = versionEntry.files[fileKey];
  if (!relativePath) return null;

  // files paths are relative to the products/ root, e.g.
  // "ca-hardening-pack/1.0.0/ca-hardening-pack.json"
  return path.join(PRODUCTS_DIR, relativePath);
}

/**
 * Resolves the absolute filesystem path to a product's preview/teaser file.
 */
export function resolveProductPreviewPath(product: Product): string | null {
  if (!product.previewFile) return null;
  return path.join(PRODUCTS_DIR, product.previewFile);
}

/**
 * Resolves related products for cross-sell display, with the current
 * product excluded and missing products silently skipped (in case a
 * referenced product hasn't been added to products/ yet).
 */
export function getRelatedProducts(product: Product): Product[] {
  return product.crossSell.relatedProducts
    .map((id) => getProductById(id))
    .filter((p): p is Product => p !== null && p.id !== product.id);
}

/**
 * Formats a price in cents as a localized currency string.
 * Defaults to EUR / de-DE formatting (e.g. "149,00 €").
 */
export function formatPrice(priceCents: number, locale: string = "de-DE"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
  }).format(priceCents / 100);
}
