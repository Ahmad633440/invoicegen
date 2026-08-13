"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"

import { useState } from 'react';
import { authClient } from '@/lib/auth/client';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const form = new FormData(e.currentTarget);
    const email = form.get('email') as string;
    const password = form.get('password') as string;

    const { error } = await authClient.signIn.email({ email, password });
    setIsLoading(false);
    if (error) {
      setError(error.message || 'Failed to sign in. Try again');
      return;
    }
    try {
      const params = new URLSearchParams(window.location.search)
      const redirect = params.get('redirect') || '/invoice'
      window.location.href = redirect
    } catch (_) {
      window.location.href = '/'
    }
  }
  return (
    <div className="flex min-h-screen flex-col bg-[color:var(--background)] text-[color:var(--foreground)]">
      <Navbar />
      
      <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md rounded-2xl border-[color:var(--border)] bg-[color:var(--card)] p-6 shadow-sm sm:p-8">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight text-[color:var(--foreground)]">
                Sign in 
              </h1>
             
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="Enter your email" 
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link 
                    href="/forgot-password" 
                    className="text-xs font-medium text-[color:var(--primary)] hover:underline dark:text-[color:var(--primary-foreground)]"
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
                  className="border-[color:var(--border)] bg-[color:var(--card)] text-[color:var(--foreground)] dark:border-[color:var(--border)] dark:bg-[color:var(--card)] dark:text-[color:var(--foreground)]"
                />
              </div>

              <Button type="submit" disabled={isLoading} className="w-full font-medium bg-emerald-600 text-white hover:bg-emerald-700" size="lg">
                {isLoading ? 'Signing in…' : 'Sign In'}
              </Button>
            </form>
            {error ? <p className="text-sm text-rose-600">{error}</p> : null}

            <div className="text-center text-sm text-[color:var(--muted-foreground)]">
              Don’t have an account?{" "}
              <Link 
                href="/signup" 
                className="font-medium text-[color:var(--primary)] hover:underline dark:text-[color:var(--primary-foreground)]"
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