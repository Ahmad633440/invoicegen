"use client"

import Link from "next/link"
import { FileText } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--border)] bg-[color:var(--background)]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[color:var(--primary)] text-[color:var(--primary-foreground)] shadow-lg shadow-[color:var(--primary)]/20">
            <FileText size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-[color:var(--foreground)]">Invoice Gen</h1>
            {/* <p className="text-xs text-slate-500 dark:text-slate-400">PDF invoice builder</p> */}
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <nav className="hidden items-center gap-8 md:flex">
            <Link href="/signin" className="text-sm font-medium text-[color:var(--foreground)] transition hover:text-[color:var(--primary)]">
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-full border border-[color:var(--border)] bg-[color:var(--card)] px-4 py-2 text-sm font-medium text-[color:var(--foreground)] shadow-sm transition hover:bg-[color:var(--secondary)]"
            >
              Get started
            </Link>
          </nav>
          <div className="flex items-center gap-2 md:hidden">
            <Link href="/signin" className="text-sm font-medium text-[color:var(--foreground)] hover:text-[color:var(--primary)]">
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
