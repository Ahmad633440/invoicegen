import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PDFViewer, pdf } from '@react-pdf/renderer'
import { InvoicePDF, type InvoiceData } from '@/lib/pdf/invoice-template'

type Props = {
  open: boolean
  onClose: () => void
  data: InvoiceData
}

export default function InvoicePreview({ open, onClose, data }: Props) {
  const [isPdfBusy, setIsPdfBusy] = useState(false)

  async function generatePdfBlob(data: InvoiceData) {
    setIsPdfBusy(true)
    try {
      return await pdf(<InvoicePDF data={data} />).toBlob()
    } finally {
      setIsPdfBusy(false)
    }
  }

  async function handleDownloadPDF() {
    const blob = await generatePdfBlob(data)
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `invoice-${data.invoiceNumber || 'invoice'}.pdf`
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 10000)
  }

  async function handlePrintPDF() {
    const blob = await generatePdfBlob(data)
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
    setTimeout(() => URL.revokeObjectURL(url), 10000)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm">
      <Card className="w-full max-w-6xl p-6 shadow-[0_32px_80px_rgba(15,23,42,0.18)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Invoice Preview</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Preview the final A4 invoice before downloading or printing.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button type="button" onClick={handleDownloadPDF} disabled={isPdfBusy}>
              {isPdfBusy ? 'Preparing...' : 'Download PDF'}
            </Button>
            <Button type="button" variant="secondary" onClick={handlePrintPDF} disabled={isPdfBusy}>
              Print
            </Button>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-[28px] border border-slate-200 bg-slate-100 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.12)] dark:border-slate-800 dark:bg-slate-950/80">
          <PDFViewer style={{ width: '100%', height: '80vh', border: '1px solid #d1d5db', borderRadius: 16, boxShadow: '0 18px 40px rgba(15, 23, 42, 0.12)' }}>
            <InvoicePDF data={data} />
          </PDFViewer>
        </div>
      </Card>
    </div>
  )
}
