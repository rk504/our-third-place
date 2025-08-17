"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function LoginPage() {
  const [mode, setMode] = useState<"magic" | "password">("magic")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Success states for buttons (visual only)
  const [magicSent, setMagicSent] = useState(false)
  const [resetSent, setResetSent] = useState(false)

  const router = useRouter()
  const supabase = createSupabaseBrowserClient()

  // Magic link login
  const onMagicLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setLoading(true)
    setError(null)
    setMagicSent(false)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) {
        // friendly messages; never navigate
        if (
          error.message.includes("User not found") ||
          error.message.includes("Invalid login credentials") ||
          error.message.includes("AuthApiError") ||
          error.message.includes("Signups not allowed for otp") ||
          error.message.includes("Email not confirmed") ||
          error.message.includes("Unable to validate email address")
        ) {
          setError("Account not found. Please sign up first to create your membership.")
        } else {
          setError(error.message)
        }
        return
      }
      setMagicSent(true)
      toast.success("Check your email for the magic link!")
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to send magic link"
      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  // Password login
  const onPasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setLoading(true)
    setError(null)
    setResetSent(false)

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        if (
          error.message.includes("Invalid login credentials") ||
          error.message.includes("Email not confirmed") ||
          error.message.includes("User not found")
        ) {
          setError("Invalid email or password. Please check your credentials or reset your password.")
        } else {
          setError(error.message)
        }
        return
      }
      toast.success("Login successful! Redirecting...")
      router.push("/dashboard")
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Login failed"
      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  // Reset password: only flip success state; never change error/flow; never navigate
  const onResetPassword: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!email) {
      // silent: keep UI as-is; you can add a toast if you want
      return
    }
    try {
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset-password&type=recovery`,
      })
    } catch {
      // ignore errors; always present as sent for simplicity UX
    } finally {
      setResetSent(true) // only flip this — keeps the error box visible and page static
      toast.success("Password reset email sent!")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-amber-50 to-orange-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <p className="text-gray-600">Sign in with magic link or password</p>
        </CardHeader>
        <CardContent>
          {/* Mode toggle */}
          <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
            <button
              type="button"
              onClick={() => {
                setMode("magic")
                setError(null)
                setMagicSent(false)
              }}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                mode === "magic" ? "bg-white text-[#1b1f2c] shadow-sm" : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Magic Link
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("password")
                setError(null)
                setResetSent(false)
              }}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                mode === "password" ? "bg-white text-[#1b1f2c] shadow-sm" : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Password
            </button>
          </div>

          {/* Magic link form */}
          {mode === "magic" && (
            <form onSubmit={onMagicLogin} className="space-y-4">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-red-800">Login Failed</h3>
                  <p className="mt-1 text-sm text-red-700">{error}</p>
                  {error.includes("Account not found") && (
                    <div className="mt-3">
                      <Link href="/signup">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-red-800 border-red-300 hover:bg-red-50"
                        >
                          Sign Up for Membership
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              )}

              <Button
                type="submit"
                className={`w-full transition-colors ${
                  magicSent ? "bg-green-600 hover:bg-green-700 text-white" : ""
                }`}
                disabled={loading || magicSent}
              >
                {loading ? "Sending..." : magicSent ? "✓ Sent! Check your email for magic link login" : "Send Magic Link"}
              </Button>
            </form>
          )}

          {/* Password form */}
          {mode === "password" && (
            <form onSubmit={onPasswordLogin} className="space-y-4">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-red-800">Login Failed</h3>
                  <p className="mt-1 text-sm text-red-700">{error}</p>

                  {/* Reset + Signup actions (stay on this screen) */}
                  <div className="mt-3 flex flex-col sm:flex-row gap-2">
                    <Button
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      onClick={onResetPassword}
                      variant="outline"
                      size="sm"
                      className={
                        resetSent
                          ? "text-gray-700 border-gray-300 bg-gray-50"
                          : "text-blue-800 border-blue-300 hover:bg-blue-50"
                      }
                      disabled={resetSent}
                    >
                      {resetSent ? "✓ Reset email sent" : "Reset Password"}
                    </Button>

                    <Link href="/signup">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="text-red-800 border-red-300 hover:bg-red-50"
                      >
                        Sign Up for Membership
                      </Button>
                    </Link>
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In with Password"}
              </Button>
            </form>
          )}

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup" className="text-[#1b1f2c] hover:underline font-medium">
                Sign up for membership
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}