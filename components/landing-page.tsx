import Link from "next/link"
import { ArrowRight, FileCheck, Sparkles, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const features = [
  {
    title: "Clean invoice templates",
    description: "Generate polished invoices with built-in spacing, totals, and client summary blocks.",
    icon: Sparkles,
  },
  {
    title: "PDF export in one click",
    description: "Download invoices instantly in printer-ready PDF format for clients and records.",
    icon: FileCheck,
  },
  {
    title: "Secure data flow",
    description: "Keep client and billing information safe with a simple, modern interface.",
    icon: ShieldCheck,
  },
]

export function LandingPage() {
  return (
    <main className="relative overflow-hidden pb-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.16),transparent_48%)] blur-3xl" />
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 pt-8 lg:px-8">
        <section className="flex-1">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-sm font-medium text-primary shadow-sm shadow-primary/5">
                Invoice Gen — simple billing in PDF
              </div>
              <div className="space-y-6">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  Build thoughtful invoices faster, without design overhead.
                </h1>
                <p className="max-w-2xl text-base leading-8 text-foreground/75 sm:text-lg">
                  Fill in your client details, items, and due dates. Invoice Gen creates a modern PDF invoice instantly so you can stay focused on billing, not layout.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="/signup">
                  <Button className="min-w-40" size="lg">
                    Start free now
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="secondary" size="lg" className="min-w-40">
                    Log in
                  </Button>
                </Link>
              </div>
            </div>

            <Card className="relative overflow-hidden border-border/80 bg-background/90 p-8 shadow-2xl shadow-slate-900/5 ring-1 ring-slate-900/5 backdrop-blur-xl sm:p-10">
              <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-r from-primary/20 via-transparent to-secondary/20 blur-2xl" />
              <div className="relative space-y-6">
                <div className="flex items-center justify-between gap-4 rounded-3xl bg-muted p-4 text-sm text-muted-foreground">
                  <span>Invoice summary preview</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">PDF ready</span>
                </div>
                <div className="space-y-4 rounded-3xl bg-card p-4 shadow-sm shadow-slate-900/5">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Client</span>
                    <span>Acme Digital</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Due date</span>
                    <span>Aug 26, 2026</span>
                  </div>
                </div>
                <div className="space-y-4 rounded-3xl bg-muted p-4 text-sm text-foreground/90">
                  <div className="flex items-center justify-between">
                    <span>Design work</span>
                    <span>$1,120.00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Domain setup</span>
                    <span>$225.00</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-border/70 pt-4 font-semibold">
                    <span>Total</span>
                    <span>$1,345.00</span>
                  </div>
                </div>
                <div className="rounded-3xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/20">
                  Preview your invoice and export an on-brand PDF in seconds.
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="space-y-4 border-border/80 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/10 text-primary shadow-sm shadow-primary/10">
                  <Icon size={20} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold text-foreground">{feature.title}</h2>
                  <p className="text-sm leading-6 text-foreground/75">{feature.description}</p>
                </div>
              </Card>
            )
          })}
        </section>

        <section className="mt-12 rounded-[2rem] border border-border/80 bg-card p-8 shadow-lg shadow-slate-900/5 sm:p-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary/80">Invoice Gen for teams</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Keep every invoice consistent, from first contact to payment.
              </h2>
            </div>
            <Link href="/signup">
              <Button variant="default" size="lg">
                Create account
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
