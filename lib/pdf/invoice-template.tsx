import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    backgroundColor: "#ffffff",
    color: "#0f172a",
  },

  // ---------- Header ----------
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 28,
  },
  logo: { width: 100, height: 56, objectFit: "contain" },
  logoPlaceholder: {
    width: 100,
    height: 56,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#cbd5e1",
  },
  titleBlock: { alignItems: "flex-end" },
  invoiceTitle: {
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: "#0f172a",
  },
  invoiceNumber: { fontSize: 10, color: "#64748b", marginTop: 4 },

  // ---------- Meta grid (dates/terms) ----------
  metaGrid: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  metaCol: { marginLeft: 24, minWidth: 90 },
  metaLabel: {
    fontSize: 8,
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 2,
  },
  metaValue: { fontSize: 10, color: "#0f172a" },

  // ---------- Parties (Bill To / Ship To) ----------
  partiesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#e2e8f0",
  },
  partyBlock: { width: "48%" },
  partyLabel: {
    fontSize: 8,
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  partyValue: { fontSize: 10, lineHeight: 1.5 },
  forLine: { fontSize: 9, color: "#64748b", marginBottom: 20 },

  // ---------- Items table ----------
  table: { width: "100%" },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#0f172a",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  tableHeaderText: {
    color: "#ffffff",
    fontSize: 9,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#e2e8f0",
  },
  tableRowAlt: { backgroundColor: "#f8fafc" },
  colDesc: { width: "46%" },
  colQty: { width: "14%", textAlign: "center" },
  colRate: { width: "20%", textAlign: "right" },
  colAmount: { width: "20%", textAlign: "right" },

  // ---------- Summary ----------
  summaryWrap: { flexDirection: "row", justifyContent: "flex-end", marginTop: 16 },
  summaryBox: { width: "45%" },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  summaryLabel: { fontSize: 9, color: "#64748b" },
  summaryValue: { fontSize: 9, color: "#0f172a" },
  summaryDivider: { height: 1, backgroundColor: "#e2e8f0", marginVertical: 4 },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    marginTop: 4,
    borderTopWidth: 1.5,
    borderColor: "#0f172a",
  },
  balanceLabel: { fontSize: 11, fontWeight: "bold", color: "#0f172a" },
  balanceValue: { fontSize: 13, fontWeight: "bold", color: "#0f172a" },

  // ---------- Notes / Terms ----------
  notesSection: { marginTop: 28, flexDirection: "row", justifyContent: "space-between" },
  notesBlock: { width: "48%" },
  notesLabel: {
    fontSize: 8,
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  notesText: { fontSize: 9, color: "#475569", lineHeight: 1.5 },

  // ---------- Signature ----------
  signatureRow: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  signatureBlock: { width: 180, alignItems: "center" },
  signatureImage: { width: 140, height: 50, objectFit: "contain" },
  signatureLine: {
    borderTopWidth: 1,
    borderColor: "#0f172a",
    width: "100%",
    marginTop: 4,
    paddingTop: 4,
  },
  signatureCaption: {
    fontSize: 8,
    color: "#94a3b8",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  footer: {
    position: "absolute",
    bottom: 24,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 8,
    color: "#94a3b8",
  },
});

export type InvoiceLineItem = {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
};

export type InvoiceData = {
  // Header
  invoiceTitle?: string;      // defaults to "Invoice"
  invoiceNumber: string;
  logo?: string;
  formFor?: string;           // "who this invoice is for" note under parties

  // Meta
  date: string;
  paymentTerms?: string;
  dueDate?: string;
  poNumber?: string;

  // Parties
  billTo: string;
  shipTo?: string;

  // Items
  items: InvoiceLineItem[];

  // Totals
  currency?: string;          // e.g. "PKR", "$"
  subtotal: number;
  tax?: number;
  discount?: number;
  shipping?: number;
  advance?: number;           // amount paid
  balanceDue: number;

  // Footer
  notes?: string;
  terms?: string;
  signature?: string;         // image data URL
};

function money(currency: string, value: number) {
  return `${currency} ${value.toFixed(2)}`;
}

export function InvoicePDF({ data }: { data: InvoiceData }) {
  const currency = data.currency || "PKR";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerRow}>
          {data.logo ? (
            <Image src={data.logo} style={styles.logo} />
          ) : (
            <View style={styles.logoPlaceholder} />
          )}
          <View style={styles.titleBlock}>
            <Text style={styles.invoiceTitle}>{data.invoiceTitle || "Invoice"}</Text>
            <Text style={styles.invoiceNumber}>
              {data.invoiceNumber ? `#${data.invoiceNumber}` : ""}
            </Text>
          </View>
        </View>

        {/* Meta grid */}
        <View style={styles.metaGrid}>
          <View style={styles.metaCol}>
            <Text style={styles.metaLabel}>Date</Text>
            <Text style={styles.metaValue}>{data.date || "-"}</Text>
          </View>
          {data.dueDate ? (
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>Due Date</Text>
              <Text style={styles.metaValue}>{data.dueDate}</Text>
            </View>
          ) : null}
          {data.paymentTerms ? (
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>Payment Terms</Text>
              <Text style={styles.metaValue}>{data.paymentTerms}</Text>
            </View>
          ) : null}
          {data.poNumber ? (
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>PO Number</Text>
              <Text style={styles.metaValue}>{data.poNumber}</Text>
            </View>
          ) : null}
        </View>

        {/* Bill To / Ship To */}
        <View style={styles.partiesRow}>
          <View style={styles.partyBlock}>
            <Text style={styles.partyLabel}>Bill To</Text>
            <Text style={styles.partyValue}>{data.billTo || "-"}</Text>
          </View>
          {data.shipTo ? (
            <View style={styles.partyBlock}>
              <Text style={styles.partyLabel}>Ship To</Text>
              <Text style={styles.partyValue}>{data.shipTo}</Text>
            </View>
          ) : null}
        </View>

        {data.formFor ? (
          <Text style={styles.forLine}>For: {data.formFor}</Text>
        ) : null}

        {/* Items table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.colDesc]}>Item</Text>
            <Text style={[styles.tableHeaderText, styles.colQty]}>Qty</Text>
            <Text style={[styles.tableHeaderText, styles.colRate]}>Rate</Text>
            <Text style={[styles.tableHeaderText, styles.colAmount]}>Amount</Text>
          </View>
          {data.items.map((item, i) => (
            <View
              style={[styles.tableRow, ...(i % 2 === 1 ? [styles.tableRowAlt] : [])]}
              key={i}
            >
              <Text style={styles.colDesc}>{item.description}</Text>
              <Text style={styles.colQty}>{item.quantity}</Text>
              <Text style={styles.colRate}>{money(currency, item.rate)}</Text>
              <Text style={styles.colAmount}>{money(currency, item.amount)}</Text>
            </View>
          ))}
        </View>

        {/* Summary */}
        <View style={styles.summaryWrap}>
          <View style={styles.summaryBox}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>{money(currency, data.subtotal)}</Text>
            </View>
            {data.discount ? (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Discount</Text>
                <Text style={styles.summaryValue}>-{money(currency, data.discount)}</Text>
              </View>
            ) : null}
            {data.tax ? (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tax</Text>
                <Text style={styles.summaryValue}>{money(currency, data.tax)}</Text>
              </View>
            ) : null}
            {data.shipping ? (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Shipping</Text>
                <Text style={styles.summaryValue}>{money(currency, data.shipping)}</Text>
              </View>
            ) : null}
            {data.advance ? (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Advance Paid</Text>
                <Text style={styles.summaryValue}>-{money(currency, data.advance)}</Text>
              </View>
            ) : null}

            <View style={styles.summaryDivider} />

            <View style={styles.balanceRow}>
              <Text style={styles.balanceLabel}>Balance Due</Text>
              <Text style={styles.balanceValue}>{money(currency, data.balanceDue)}</Text>
            </View>
          </View>
        </View>

        {/* Notes / Terms */}
        {(data.notes || data.terms) && (
          <View style={styles.notesSection}>
            {data.notes ? (
              <View style={styles.notesBlock}>
                <Text style={styles.notesLabel}>Notes</Text>
                <Text style={styles.notesText}>{data.notes}</Text>
              </View>
            ) : <View style={styles.notesBlock} />}
            {data.terms ? (
              <View style={styles.notesBlock}>
                <Text style={styles.notesLabel}>Terms</Text>
                <Text style={styles.notesText}>{data.terms}</Text>
              </View>
            ) : null}
          </View>
        )}

        {/* Signature */}
        <View style={styles.signatureRow}>
          <View style={styles.signatureBlock}>
            {data.signature ? (
              <Image src={data.signature} style={styles.signatureImage} />
            ) : (
              <View style={{ height: 50 }} />
            )}
            <View style={styles.signatureLine}>
              <Text style={styles.signatureCaption}>Authorized Signature</Text>
            </View>
          </View>
        </View>

        <Text style={styles.footer} fixed>
          Thank you for your business.
        </Text>
      </Page>
    </Document>
  );
}