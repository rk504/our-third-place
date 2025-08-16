import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Users, Calendar, MapPin } from "lucide-react"
import { Footer } from "@/components/footer"

export default function FinancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-[#1b1f2c]">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-2xl font-bold">Our Third Place</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Finance Professionals</h1>
            <p className="text-xl text-gray-700 mb-8">Connect with ambitious women in the finance industry</p>
          </div>

          {/* Coming Soon Section */}
          <Card className="mb-12 bg-white/70 backdrop-blur-sm border-2">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Coming Soon</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <p className="text-lg text-gray-700 leading-relaxed">
                We're excited to expand Our Third Place community to include finance professionals. Our finance chapter
                will offer the same authentic networking experience with industry-specific events and connections.
              </p>

              <div className="bg-amber-50/50 p-8 rounded-2xl mb-8 border border-amber-200">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    We've created the ultimate membership for women
                  </h3>
                  <p className="text-lg text-gray-700 mb-6">A space where you can connect, recharge, and grow.</p>

                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-[#1b1f2c] mb-2">JOIN A COMMUNITY</h4>
                    </div>
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-[#1b1f2c] mb-2">CREATE LIFE LONG FRIENDS</h4>
                    </div>
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-[#1b1f2c] mb-2">BUILD YOUR NETWORK</h4>
                    </div>
                  </div>

                  <p className="text-lg text-gray-700 leading-relaxed">
                    This is your space - to be inspired, supported, and surrounded by women who just get it, across the
                    world and across life stages, in person and online.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#dddbd4] rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-[#1b1f2c]" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Exclusive Network</h3>
                  <p className="text-sm text-gray-600">Connect with finance industry leaders</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#dddbd4] rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-6 h-6 text-[#1b1f2c]" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Industry Events</h3>
                  <p className="text-sm text-gray-600">Finance-focused networking opportunities</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#dddbd4] rounded-full flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-6 h-6 text-[#1b1f2c]" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Major Markets</h3>
                  <p className="text-sm text-gray-600">Launching in key financial hubs</p>
                </div>
              </div>

              <div className="bg-[#dddbd4] p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Be the First to Know</h3>
                <p className="text-gray-700 mb-4">
                  Join our waitlist to be notified when our finance chapter launches. Early members will receive
                  exclusive founding member benefits.
                </p>
                <Button className="bg-gradient-to-r from-[#1b1f2c] to-[#646d59] hover:from-[#1b1f2c]/90 hover:to-[#646d59]/90 text-white">
                  Join Waitlist
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center">
            <p className="text-lg text-gray-600 mb-8">In the meantime, check out our thriving Media community</p>
            <Link href="/industry/media">
              <Button
                variant="outline"
                size="lg"
                className="border-[#1b1f2c] text-[#1b1f2c] hover:bg-[#dddbd4] bg-transparent"
              >
                Explore Media Community
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
