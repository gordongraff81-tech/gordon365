import { SEO_CONFIG } from "./config";

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SEO_CONFIG.baseUrl}/#organization`,
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${SEO_CONFIG.baseUrl}/logo-nav.png`,
    },
    address: { "@type": "PostalAddress", addressCountry: "DE" },
    areaServed: ["DE", "AT", "CH"],
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SEO_CONFIG.baseUrl}/#website`,
    url: SEO_CONFIG.baseUrl,
    name: SEO_CONFIG.siteName,
    publisher: { "@id": `${SEO_CONFIG.baseUrl}/#organization` },
  };
}

export function buildServiceSchema(
  url: string,
  name: string,
  description: string,
  serviceType: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    description,
    serviceType,
    url,
    provider: { "@id": `${SEO_CONFIG.baseUrl}/#organization` },
  };
}
