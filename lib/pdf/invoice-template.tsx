import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10 },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 24 },
  logo: { width: 120, height: 40, objectFit: "contain" },
  title: { fontSize: 24, fontWeight: "bold" },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  section: { marginBottom: 16 },
  sectionHeader: { fontSize: 12, fontWeight: "bold", marginBottom: 4 },
  table: { marginTop: 16, width: "100%" },
  tableHeader: { flexDirection: "row", borderBottomWidth: 1, paddingBottom: 4, fontWeight: "bold" },
  tableRow: { flexDirection: "row", paddingVertical: 4, borderBottomWidth: 0.5, borderColor: "#e5e5e5" },
  col1: { width: "50%" },
  col2: { width: "16.66%", textAlign: "right" },
  totalRow: { flexDirection: "row", justifyContent: "flex-end", marginTop: 12 },
  notes: { marginTop: 12, fontSize: 10 },
});

export type InvoiceData = {
  invoiceNumber: string;
  date: string;
  companyName: string;
  logo?: string;
  paymentTerms?: string;
  dueDate?: string;
  poNumber?: string;
  billTo: string;
  shipTo?: string;
  notes?: string;
  terms?: string;
  items: { description: string; quantity: number; rate: number; amount: number }[];
  subtotal: number;
  total: number;
};

export function InvoicePDF({ data }: { data: InvoiceData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            {data.logo ? <Image src={data.logo} style={styles.logo} /> : null}
            <Text>{data.companyName}</Text>
          </View>
          <View>
            <Text style={styles.title}>INVOICE</Text>
            <Text>#{data.invoiceNumber}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Invoice details</Text>
          <View style={styles.row}>
            <Text>Date: {data.date || '-'}</Text>
            <Text>Due date: {data.dueDate || '-'}</Text>
          </View>
          <View style={styles.row}>
            <Text>Payment terms: {data.paymentTerms || '-'}</Text>
            <Text>PO#: {data.poNumber || '-'}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Billing</Text>
          <View style={styles.row}>
            <Text>Bill To: {data.billTo || '-'}</Text>
            <Text>Ship To: {data.shipTo || '-'}</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.col1}>Item</Text>
            <Text style={styles.col2}>Qty</Text>
            <Text style={styles.col2}>Rate</Text>
            <Text style={styles.col2}>Amount</Text>
          </View>
          {data.items.map((item, i) => (
            <View style={styles.tableRow} key={i}>
              <Text style={styles.col1}>{item.description}</Text>
              <Text style={styles.col2}>{item.quantity}</Text>
              <Text style={styles.col2}>PKR {item.rate.toFixed(2)}</Text>
              <Text style={styles.col2}>PKR {item.amount.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.totalRow}>
          <Text>Total: PKR {data.total.toFixed(2)}</Text>
        </View>

        {data.notes ? (
          <View style={styles.notes}>
            <Text style={styles.sectionHeader}>Notes</Text>
            <Text>{data.notes}</Text>
          </View>
        ) : null}

        {data.terms ? (
          <View style={styles.notes}>
            <Text style={styles.sectionHeader}>Terms</Text>
            <Text>{data.terms}</Text>
          </View>
        ) : null}
      </Page>
    </Document>
  );
}