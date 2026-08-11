import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, backgroundColor: '#ffffff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  branding: { flexDirection: 'row', alignItems: 'center', width: '60%' },
  logo: { width: 100, height: 60, objectFit: 'contain', marginRight: 20 },
  companyName: { fontSize: 10, color: '#475569', textTransform: 'uppercase', letterSpacing: 1.2 },
  titleBlock: { flexDirection: 'column', alignItems: 'center', width: '30%' },
  title: { fontSize: 28, fontWeight: 'bold', letterSpacing: 1.4 },
  invoiceNumber: { fontSize: 11, marginTop: 4, color: '#64748b' },
  metaBlock: { width: '30%', alignItems: 'flex-end' },
  metaLabel: { fontSize: 10, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 },
  metaValue: { fontSize: 11, fontWeight: 'bold', marginTop: 2, color: '#0f172a' },
  divider: { height: 1, backgroundColor: '#e2e8f0', marginVertical: 18 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  section: { marginBottom: 18 },
  sectionHeader: { fontSize: 11, fontWeight: 'bold', marginBottom: 6, letterSpacing: 0.8, textTransform: 'uppercase' },
  table: { marginTop: 16, width: '100%', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, overflow: 'hidden' },
  tableHeader: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#e2e8f0', paddingVertical: 10, backgroundColor: '#f8fafc', fontWeight: 'bold' },
  tableRow: { flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 1, borderColor: '#e2e8f0' },
  tableRowLast: { borderBottomWidth: 0 },
  col1: { width: '50%', paddingRight: 8 },
  col2: { width: '16.66%', textAlign: 'right' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 18, paddingTop: 12, borderTopWidth: 1, borderColor: '#e2e8f0' },
  totalLabel: { fontSize: 11, color: '#475569' },
  totalValue: { fontSize: 14, fontWeight: 'bold', color: '#0f172a' },
  notes: { marginTop: 14, fontSize: 10, lineHeight: 1.5 },
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
          <View style={styles.branding}>
            {data.logo ? <Image src={data.logo} style={styles.logo} /> : null}
            <View>
              <Text style={styles.companyName}>{data.companyName || 'Invoice'}</Text>
            </View>
          </View>
          <View style={styles.titleBlock}>
            <Text style={styles.title}>INVOICE</Text>
            <Text style={styles.invoiceNumber}>#{data.invoiceNumber}</Text>
          </View>
          <View style={styles.metaBlock}>
            <Text style={styles.metaLabel}>Date</Text>
            <Text style={styles.metaValue}>{data.date || '-'}</Text>
            <Text style={styles.metaLabel}>Due Date</Text>
            <Text style={styles.metaValue}>{data.dueDate || '-'}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Invoice details</Text>
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