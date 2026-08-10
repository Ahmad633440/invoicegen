"use client"

import Link from "next/link"
import { FileText } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-slate-50/95 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
            <FileText size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-950 dark:text-slate-50">Invoice Gen</h1>
            {/* <p className="text-xs text-slate-500 dark:text-slate-400">PDF invoice builder</p> */}
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <nav className="hidden items-center gap-3 md:flex">
            <Link href="/login" className="text-sm font-medium text-slate-700 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-slate-50">
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-950 shadow-sm shadow-slate-900/5 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50 dark:hover:bg-slate-800"
            >
              Get started
            </Link>
          </nav>
          <div className="flex items-center gap-2 md:hidden">
            <Link href="/login" className="text-sm font-medium text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-slate-50">
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
