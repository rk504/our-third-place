import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Users, Calendar, MapPin } from "lucide-react"
import { Footer } from "@/components/footer"

export default function EntertainmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Entertainment Professionals</h1>
            <p className="text-xl text-gray-700 mb-8">
              Connect with creative women in film, television, music, and entertainment
            </p>
          </div>

          {/* Coming Soon Section */}
          <Card className="mb-12 bg-white/70 backdrop-blur-sm border-2">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Coming Soon</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <p className="text-lg text-gray-700 leading-relaxed">
                We're excited to expand Our Third Place community to include entertainment professionals. Our
                entertainment chapter will offer the same authentic networking experience with industry-specific events
                and connections.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Creative Network</h3>
                  <p className="text-sm text-gray-600">Connect with entertainment industry leaders</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Industry Events</h3>
                  <p className="text-sm text-gray-600">Entertainment-focused networking opportunities</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Creative Hubs</h3>
                  <p className="text-sm text-gray-600">Launching in key entertainment markets</p>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Be the First to Know</h3>
                <p className="text-gray-700 mb-4">
                  Join our waitlist to be notified when our entertainment chapter launches. Early members will receive
                  exclusive founding member benefits.
                </p>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
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
                className="border-purple-600 text-purple-600 hover:bg-purple-50 bg-transparent"
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
