'use client'
import Link from "next/link"
import { ArrowRight, FileCheck, Sparkles, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { authClient } from '@/lib/auth/client'

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
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleStart = useCallback(async () => {
    setLoading(true)
    try {
      const res = await authClient.getSession?.()
      let session = null
      if (res) {
        if (typeof res === 'object' && 'data' in res) {
          session = (res as any).data?.session ?? (res as any).data
        } else if (typeof res === 'object' && 'session' in res) {
          session = (res as any).session
        }
      }
      if (session) {
        router.push('/invoice')
      } else {
        router.push('/signin?redirect=/invoice')
      }
    } catch (e) {
      router.push('/signin?redirect=/invoice')
    } finally {
      setLoading(false)
    }
  }, [router])

  return (
    <main className="relative overflow-hidden pb-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(5,150,105,0.14),transparent_48%)] blur-3xl" />
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 pt-22 lg:px-8">
        <section className="flex-1">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  Build thoughtful invoices faster, without design overhead.
                </h1>
                <p className="max-w-2xl text-base leading-8 text-foreground/75 sm:text-lg">
                  Fill in your client details, items, and due dates. Invoice Gen creates a modern PDF invoice instantly so you can stay focused on billing, not layout.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button className="min-w-40" size="lg" onClick={handleStart} disabled={loading}>
                  {loading ? 'Please wait…' : 'Start free now'}
                </Button>
                <Link href="/signup">
                  <Button variant="secondary" size="lg" className="min-w-40">
                    Sign up
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-3">
              {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="space-y-4 border-[color:var(--border)] bg-[color:var(--card)] p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[color:var(--primary)]/10 text-[color:var(--primary)] shadow-sm shadow-[color:var(--primary)]/10">
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
