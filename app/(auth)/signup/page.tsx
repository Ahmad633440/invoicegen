"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
        <Card className="w-full max-w-md rounded-xl border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-8">
          <div className="space-y-6">
            <div className="space-y-1.5 text-center sm:text-left">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">
                Create your account
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Enter your details below to start generating invoices
              </p>
            </div>

            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-medium text-slate-900 dark:text-slate-100">
                  Full name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Jane Doe"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-medium text-slate-900 dark:text-slate-100">
                  Email address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-medium text-slate-900 dark:text-slate-100">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a secure password"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-emerald-600 text-white hover:bg-emerald-700">
                Create Account
              </Button>
            </form>

            <div className="text-center text-sm text-slate-600 dark:text-slate-400">
              Already registered?{" "}
              <Link href="/login" className="font-medium text-emerald-600 hover:underline dark:text-emerald-400">
                Log in
              </Link>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}