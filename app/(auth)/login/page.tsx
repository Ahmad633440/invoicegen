"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
      <Navbar />
      
      <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md rounded-2xl border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-8">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">
                Sign in to your account
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Enter your credentials to access your invoices
              </p>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link 
                    href="/forgot-password" 
                    className="text-xs font-medium text-emerald-600 hover:underline dark:text-emerald-400"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  placeholder="********" 
                  required
                  className="border-slate-200 bg-slate-50 text-slate-950 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                />
              </div>

              <Button type="submit" className="w-full font-medium bg-emerald-600 text-white hover:bg-emerald-700" size="lg">
                Sign In
              </Button>
            </form>

            <div className="text-center text-sm text-slate-600 dark:text-slate-400">
              Don’t have an account?{" "}
              <Link 
                href="/signup" 
                className="font-medium text-emerald-600 hover:underline dark:text-emerald-400"
              >
                Create account
              </Link>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}