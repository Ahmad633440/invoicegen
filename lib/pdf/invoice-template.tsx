import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Optional: register a custom font so it doesn't default to Helvetica
Font.register({
  family: "Inter",
  fonts: [
    { src: "/fonts/Inter-Regular.ttf" },
    { src: "/fonts/Inter-Bold.ttf", fontWeight: "bold" },
  ],
});

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: "Inter", fontSize: 10 },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 24 },
  title: { fontSize: 24, fontWeight: "bold" },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  table: { marginTop: 16 },
  tableHeader: { flexDirection: "row", borderBottom: 1, paddingBottom: 4, fontWeight: "bold" },
  tableRow: { flexDirection: "row", paddingVertical: 4, borderBottom: 0.5, borderColor: "#e5e5e5" },
  col1: { width: "50%" },
  col2: { width: "16.66%", textAlign: "right" },
});

type InvoiceData = {
  invoiceNumber: string;
  date: string;
  companyName: string;
  billTo: string;
  items: { description: string; quantity: number; rate: number; amount: number }[];
  subtotal: number;
  total: number;
};

export function InvoicePDF({ data }: { data: InvoiceData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>{data.companyName}</Text>
          <View>
            <Text style={styles.title}>INVOICE</Text>
            <Text>#{data.invoiceNumber}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text>Bill To: {data.billTo}</Text>
          <Text>Date: {data.date}</Text>
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
              <Text style={styles.col2}>${(item.rate / 100).toFixed(2)}</Text>
              <Text style={styles.col2}>${(item.amount / 100).toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={{ marginTop: 16, alignItems: "flex-end" }}>
          <Text>Total: ${(data.total / 100).toFixed(2)}</Text>
        </View>
      </Page>
    </Document>
  );
}