"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, ArrowRight } from "lucide-react"

export default function WelcomePage() {
  useEffect(() => {
    // Clear any pending payment data since user is now verified
    sessionStorage.removeItem('pendingPayment')
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="bg-white/90 backdrop-blur-sm border-2 shadow-xl">
          <CardContent className="p-8 text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>

            {/* Welcome Message */}
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Welcome! 🎉
            </h1>
            <p className="text-gray-600 mb-8">
              Your email is verified and your membership is active.
            </p>

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <p className="text-blue-800 mb-4">
                Please proceed to login, then you'll be on your dashboard.
              </p>
            </div>

            {/* Login Button */}
            <Button asChild className="w-full bg-gradient-to-r from-[#1b1f2c] to-[#646d59] hover:from-[#1b1f2c]/90 hover:to-[#646d59]/90 text-white py-3">
              <Link href="/login?next=/dashboard">
                Continue to Login <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
