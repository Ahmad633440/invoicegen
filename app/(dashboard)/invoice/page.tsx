'use client'

import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useMemo, useState } from 'react'
import { pdf } from "@react-pdf/renderer";
import { InvoicePDF, type InvoiceData } from '@/lib/pdf/invoice-template'

type LineItem = {
  id: string
  description: string
  quantity: number
  rate: number
}

const DEFAULT_ITEM: LineItem = {
  id: crypto.randomUUID(),
  description: '',
  quantity: 1,
  rate: 0,
}

const InvoicePage = () => {
  const [invoiceTitle, setInvoiceTitle] = useState('Invoice')
  const [invoiceNumber, setInvoiceNumber] = useState('')
  const [formFor, setFormFor] = useState('')
  const [date, setDate] = useState('')
  const [paymentTerms, setPaymentTerms] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [poNumber, setPoNumber] = useState('')
  const [billTo, setBillTo] = useState('')
  const [shipTo, setShipTo] = useState('')
  const [notes, setNotes] = useState('')
  const [terms, setTerms] = useState('')
  const [lineItems, setLineItems] = useState<LineItem[]>([DEFAULT_ITEM])
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [logoError, setLogoError] = useState<string | null>(null)
  const [advance, setAdvance] = useState(0)

  const subtotal = useMemo(
    () => lineItems.reduce((sum, item) => sum + item.quantity * item.rate, 0),
    [lineItems],
  )

  const balanceDue = Math.max(subtotal - advance, 0)

  const invoiceData = useMemo<InvoiceData>(() => ({
    companyName: invoiceTitle || 'Invoice',
    invoiceNumber: invoiceNumber || '0001',
    date,
    paymentTerms,
    dueDate,
    poNumber,
    billTo: billTo || formFor,
    shipTo,
    notes,
    terms,
    subtotal,
    total: balanceDue,
    items: lineItems.map(item => ({
      description: item.description || 'Item',
      quantity: item.quantity,
      rate: item.rate,
      amount: item.quantity * item.rate,
    })),
    logo: logoPreview || undefined,
  }), [
    invoiceTitle,
    invoiceNumber,
    date,
    paymentTerms,
    dueDate,
    poNumber,
    billTo,
    formFor,
    shipTo,
    notes,
    terms,
    subtotal,
    balanceDue,
    lineItems,
    logoPreview,
  ])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.size > 700 * 1024) {
      setLogoError('Logo must be 700KB or smaller.')
      setLogoPreview(null)
      return
    }

    setLogoError(null)
    const reader = new FileReader()
    reader.onload = () => {
      setLogoPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const updateLineItem = (id: string, values: Partial<LineItem>) => {
    setLineItems(current =>
      current.map(item => (item.id === id ? { ...item, ...values } : item)),
    )
  }

  const addLineItem = () => {
    setLineItems(current => [...current, { ...DEFAULT_ITEM, id: crypto.randomUUID() }])
  }

  const removeLineItem = (id: string) => {
    setLineItems(current => current.filter(item => item.id !== id))
  }


  async function handleDownloadPDF(data: InvoiceData) {
    const blob = await pdf(<InvoicePDF data={data} />).toBlob()
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `invoice-${data.invoiceNumber || 'invoice'}.pdf`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-8 sm:px-8">
        <div className="space-y-6">
          <Card className="border-slate-200 p-6 dark:border-slate-800">
            <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
              <div className="space-y-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <Label htmlFor="invoiceTitle">Invoice heading</Label>
                    <Input
                      id="invoiceTitle"
                      value={invoiceTitle}
                      onChange={event => setInvoiceTitle(event.target.value)}
                      placeholder="Invoice"
                    />
                  </div>
                  <div>
                    <Label htmlFor="invoiceNumber">Invoice no.</Label>
                    <Input
                      id="invoiceNumber"
                      value={invoiceNumber}
                      onChange={event => setInvoiceNumber(event.target.value)}
                      placeholder="#00123"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="formFor">Who is this invoice for?</Label>
                  <Input
                    id="formFor"
                    value={formFor}
                    onChange={event => setFormFor(event.target.value)}
                    placeholder="Client, project, or purpose"
                  />
                </div>
              </div>

              <div className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <Label htmlFor="logoUpload">Logo & photo</Label>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Upload PNG/JPG, max 700KB</p>
                  </div>
                  <input
                    id="logoUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full max-w-[220px] cursor-pointer rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
                  />
                </div>
                <div className="mt-2 min-h-[96px] overflow-hidden rounded-3xl border border-dashed border-slate-200 bg-white p-3 text-center dark:border-slate-700 dark:bg-slate-950">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo preview" className="mx-auto h-24 object-contain" />
                  ) : (
                    <p className="text-sm text-slate-500 dark:text-slate-400">No logo uploaded yet</p>
                  )}
                </div>
                {logoError ? <p className="text-sm text-rose-600">{logoError}</p> : null}
              </div>
            </div>
          </Card>

          <Card className="border-slate-200 p-6 dark:border-slate-800">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" value={date} onChange={event => setDate(event.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="paymentTerms">Payment Terms</Label>
                    <Input
                      id="paymentTerms"
                      value={paymentTerms}
                      onChange={event => setPaymentTerms(event.target.value)}
                      placeholder="e.g. Net 30"
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input id="dueDate" type="date" value={dueDate} onChange={event => setDueDate(event.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="poNumber">PO Number</Label>
                    <Input id="poNumber" value={poNumber} onChange={event => setPoNumber(event.target.value)} placeholder="PO-" />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="billTo">Bill To</Label>
                  <textarea
                    id="billTo"
                    value={billTo}
                    onChange={event => setBillTo(event.target.value)}
                    rows={5}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-950 shadow-sm transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50 dark:focus:border-emerald-500 dark:focus:ring-emerald-500/10"
                    placeholder="Client name, address, email"
                  />
                </div>
                <div>
                  <Label htmlFor="shipTo">Ship To</Label>
                  <textarea
                    id="shipTo"
                    value={shipTo}
                    onChange={event => setShipTo(event.target.value)}
                    rows={5}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-950 shadow-sm transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50 dark:focus:border-emerald-500 dark:focus:ring-emerald-500/10"
                    placeholder="Shipping address or contact"
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="border-slate-200 p-6 dark:border-slate-800">
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
              <div>
                <h2 className="text-lg font-semibold">Items</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Add invoice line items and amounts.</p>
              </div>
              <Button type="button" variant="outline" onClick={addLineItem}>
                + Add line
              </Button>
            </div>

            <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
              <div className="grid grid-cols-[3fr_1fr_1fr_1fr_auto] gap-4 border-b border-slate-200 px-4 py-3 text-sm font-medium uppercase tracking-[0.12em] text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <div>Item</div>
                <div>Quantity</div>
                <div>Rate</div>
                <div>Amount (PKR)</div>
                <div className="sr-only">Remove</div>
              </div>
              <div className="space-y-3 p-4">
                {lineItems.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-[3fr_1fr_1fr_1fr_auto] items-center gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div>
                      <Input
                        value={item.description}
                        onChange={event => updateLineItem(item.id, { description: event.target.value })}
                        placeholder={`Description ${index + 1}`}
                      />
                    </div>
                    <div>
                      <Input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={event => updateLineItem(item.id, { quantity: Number(event.target.value) || 1 })}
                      />
                    </div>
                    <div>
                      <Input
                        type="number"
                        min={0}
                        step={0.01}
                        value={item.rate}
                        onChange={event => updateLineItem(item.id, { rate: Number(event.target.value) || 0 })}
                      />
                    </div>
                    <div>
                      <Input value={(item.quantity * item.rate).toFixed(2)} readOnly />
                    </div>
                    <div>
                      {lineItems.length > 1 ? (
                        <Button type="button" variant="destructive" onClick={() => removeLineItem(item.id)}>
                          ×
                        </Button>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="border-slate-200 p-6 dark:border-slate-800">
            <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <textarea
                    id="notes"
                    value={notes}
                    onChange={event => setNotes(event.target.value)}
                    rows={5}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-950 shadow-sm transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50 dark:focus:border-emerald-500 dark:focus:ring-emerald-500/10"
                    placeholder="Add any notes for the invoice here"
                  />
                </div>
                <div>
                  <Label htmlFor="terms">Terms</Label>
                  <textarea
                    id="terms"
                    value={terms}
                    onChange={event => setTerms(event.target.value)}
                    rows={5}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-950 shadow-sm transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50 dark:focus:border-emerald-500 dark:focus:ring-emerald-500/10"
                    placeholder="Payment terms, delivery terms, or special conditions"
                  />
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                    <span>Subtotal</span>
                    <span>PKR {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                    <Label htmlFor="advance">Advance</Label>
                    <Input
                      id="advance"
                      type="number"
                      min={0}
                      value={advance}
                      onChange={event => setAdvance(Number(event.target.value))}
                      className="max-w-[140px]"
                    />
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-base font-semibold dark:border-slate-800">
                    <span>Balance</span>
                    <span>PKR {balanceDue.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                    <span>Balance Due</span>
                    <span>PKR {balanceDue.toFixed(2)}</span>
                  </div>
                  <Button type="button" className="w-full" onClick={() => handleDownloadPDF(invoiceData)}>
                    Proceed
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default InvoicePage