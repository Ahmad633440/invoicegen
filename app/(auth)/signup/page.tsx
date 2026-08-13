"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"

import { useState } from 'react';
import { authClient } from '@/lib/auth/client';

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const form = new FormData(e.currentTarget);
    const name = (form.get('name') as string) || '';
    const email = form.get('email') as string;
    const password = form.get('password') as string;

    const { error } = await authClient.signUp.email({ email, password, name });
    setIsLoading(false);
    if (error) {
      setError(error.message || 'Failed to create account');
      return;
    }
    // on success redirect (respect redirect query param)
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

      <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
        <Card className="w-full max-w-md rounded-xl border-[color:var(--border)] bg-[color:var(--card)] p-6 shadow-sm sm:p-8">
          <div className="space-y-6">
            <div className="space-y-1.5 text-center sm:text-left">
              <h1 className="text-2xl font-semibold tracking-tight text-[color:var(--foreground)]">
                Create your account
              </h1>
            
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                 <Label htmlFor="name" className="text-xs font-medium text-[color:var(--foreground)]">
                   Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-medium text-[color:var(--foreground)]">
                  Email 
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-medium text-[color:var(--foreground)]">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="********"
                  required
                />
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Creating…' : 'Create Account'}
              </Button>
            </form>
            {error ? <p className="text-sm text-rose-600">{error}</p> : null}
            <div className="text-center text-sm text-[color:var(--muted-foreground)]">
              Already registered?{" "}
              <Link href="/signin" className="font-medium text-[color:var(--primary)] hover:underline dark:text-[color:var(--primary-foreground)]">
                Log in
              </Link>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}