import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Svg,
  Rect,
  Defs,
  LinearGradient,
  Stop,
  renderToBuffer,
} from "@react-pdf/renderer";
import { GORDON_LOGO_BASE64 } from "./logoBase64";

// npm install @react-pdf/renderer
// Runs in Node serverless functions without a headless browser, fits the
// existing Stripe webhook handler on Vercel without extra infrastructure.
// The logo is embedded as base64 so this never depends on filesystem or
// network access to a public asset at generation time.

const LOGO_SRC = `data:image/png;base64,${GORDON_LOGO_BASE64}`;
const LOGO_RATIO = 600 / 159; // matches the source PNG dimensions

// Colors sampled directly from the brand logo, not invented separately.
const COLORS = {
  navy: "#0B1B35", // wordmark color
  cyan: "#0DE4FD", // icon top facet
  blue: "#043CD9", // icon side facet
  paper: "#FFFFFF",
  hairline: "#E4E7EC",
  slate: "#5B6472",
};

const SELLER = {
  name: "Gordon Graff",
  brand: "Gordon365",
  tagline: "Microsoft 365 Security Templates",
  addressLine: "Nordbahnstr. 25",
  city: "13409 Berlin",
  vatId: "DE358541578",
  email: "info@gordon365.com",
};

interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: Date;
  customerName?: string;
  customerEmail: string;
  customerAddress?: string;
  productName: string;
  amountCents: number; // gross amount, identical to net amount under §19 UStG
  stripeSessionId: string;
}

function formatEUR(cents: number) {
  return (cents / 100).toLocaleString("de-DE", { style: "currency", currency: "EUR" });
}

const styles = StyleSheet.create({
  page: { padding: 0, fontFamily: "Helvetica", color: COLORS.navy, fontSize: 10 },
  body: { padding: 40, paddingTop: 26 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 26,
  },
  logo: { width: 26 * LOGO_RATIO, height: 26 },
  tagline: { fontSize: 8, color: COLORS.slate, marginTop: 6, letterSpacing: 0.5 },
  docLabel: {
    fontSize: 9,
    color: COLORS.blue,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1.5,
    textAlign: "right",
  },
  docNumber: { fontSize: 13, fontFamily: "Helvetica-Bold", textAlign: "right", marginTop: 2 },
  docDate: { fontSize: 9, color: COLORS.slate, textAlign: "right", marginTop: 2 },
  hairline: { borderBottomWidth: 1, borderBottomColor: COLORS.hairline, marginBottom: 18 },
  twoCol: { flexDirection: "row", justifyContent: "space-between", marginBottom: 22 },
  blockLabel: {
    fontSize: 8,
    color: COLORS.slate,
    letterSpacing: 1,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  blockText: { fontSize: 10, lineHeight: 1.5 },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: COLORS.navy,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  tableHeaderCell: { color: COLORS.paper, fontSize: 8, letterSpacing: 0.5, textTransform: "uppercase" },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.hairline,
  },
  colDesc: { flex: 3 },
  colQty: { flex: 1, textAlign: "center" },
  colAmount: { flex: 1, textAlign: "right" },
  totalsBlock: { marginTop: 16, alignItems: "flex-end" },
  totalPill: { backgroundColor: COLORS.navy, paddingVertical: 8, paddingHorizontal: 16, borderRadius: 3 },
  totalLabel: { color: COLORS.paper, fontSize: 8, letterSpacing: 1, textTransform: "uppercase" },
  totalAmount: { color: COLORS.paper, fontSize: 14, fontFamily: "Helvetica-Bold", marginTop: 2 },
  taxNote: { fontSize: 8, color: COLORS.slate, marginTop: 8, textAlign: "right" },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: COLORS.hairline,
    paddingTop: 10,
  },
  footerText: { fontSize: 7.5, color: COLORS.slate, lineHeight: 1.5 },
});

function GradientBand() {
  return (
    <Svg width={595.28} height={6} viewBox="0 0 595.28 6">
      <Defs>
        <LinearGradient id="band" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor={COLORS.cyan} />
          <Stop offset="1" stopColor={COLORS.blue} />
        </LinearGradient>
      </Defs>
      <Rect x={0} y={0} width={595.28} height={6} fill="url(#band)" />
    </Svg>
  );
}

function InvoiceDocument({ data }: { data: InvoiceData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <GradientBand />
        <View style={styles.body}>
          <View style={styles.headerRow}>
            <View>
              <Image src={LOGO_SRC} style={styles.logo} />
              <Text style={styles.tagline}>{SELLER.tagline}</Text>
            </View>
            <View>
              <Text style={styles.docLabel}>Rechnung</Text>
              <Text style={styles.docNumber}>{data.invoiceNumber}</Text>
              <Text style={styles.docDate}>{data.invoiceDate.toLocaleDateString("de-DE")}</Text>
            </View>
          </View>

          <View style={styles.hairline} />

          <View style={styles.twoCol}>
            <View>
              <Text style={styles.blockLabel}>Rechnungsempfänger</Text>
              <Text style={styles.blockText}>{data.customerName ?? data.customerEmail}</Text>
              {data.customerAddress && <Text style={styles.blockText}>{data.customerAddress}</Text>}
              <Text style={styles.blockText}>{data.customerEmail}</Text>
            </View>
            <View>
              <Text style={styles.blockLabel}>Rechnungssteller</Text>
              <Text style={styles.blockText}>{SELLER.name}</Text>
              <Text style={styles.blockText}>
                {SELLER.addressLine}, {SELLER.city}
              </Text>
              <Text style={styles.blockText}>USt IdNr {SELLER.vatId}</Text>
            </View>
          </View>

          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, styles.colDesc]}>Beschreibung</Text>
            <Text style={[styles.tableHeaderCell, styles.colQty]}>Menge</Text>
            <Text style={[styles.tableHeaderCell, styles.colAmount]}>Betrag</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.colDesc}>{data.productName}</Text>
            <Text style={styles.colQty}>1</Text>
            <Text style={styles.colAmount}>{formatEUR(data.amountCents)}</Text>
          </View>

          <View style={styles.totalsBlock}>
            <View style={styles.totalPill}>
              <Text style={styles.totalLabel}>Gesamtbetrag</Text>
              <Text style={styles.totalAmount}>{formatEUR(data.amountCents)}</Text>
            </View>
            <Text style={styles.taxNote}>
              Gemäß § 19 UStG wird keine Umsatzsteuer berechnet und ausgewiesen.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {SELLER.brand}, {SELLER.name}, {SELLER.addressLine}, {SELLER.city}, {SELLER.email}
          </Text>
          <Text style={styles.footerText}>Zahlungsreferenz: {data.stripeSessionId}</Text>
        </View>
      </Page>
    </Document>
  );
}

export async function generateInvoicePdf(data: InvoiceData): Promise<Buffer> {
  return renderToBuffer(<InvoiceDocument data={data} />);
}

/*
Usage inside the Stripe webhook handler, attaching the invoice to the
confirmation mail sent via Nodemailer:

const invoiceNumber = await nextInvoiceNumber();
const pdfBuffer = await generateInvoicePdf({
  invoiceNumber,
  invoiceDate: new Date(),
  customerEmail: session.customer_details!.email!,
  customerName: session.customer_details!.name ?? undefined,
  customerAddress: formatStripeAddress(session.customer_details!.address),
  productName: product.title,
  amountCents: session.amount_total!,
  stripeSessionId: session.id,
});

await transporter.sendMail({
  // existing fields ...
  attachments: [{ filename: `${invoiceNumber}.pdf`, content: pdfBuffer }],
});
*/
