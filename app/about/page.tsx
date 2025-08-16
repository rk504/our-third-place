import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Users, Heart, Sparkles, Calendar, MapPin, Briefcase } from "lucide-react"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-[#1b1f2c]">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-2xl font-bold">Our Third Place</span>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-[#1b1f2c] to-[#646d59] hover:from-[#1b1f2c]/90 hover:to-[#646d59]/90 text-white">
                Join Now
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Our Third Place</h1>
            <p className="text-xl text-gray-700 mb-8">
              An exclusive members-only community where authentic friendships become powerful professional networks
            </p>
          </div>

          {/* Hero Image */}
          <div className="mb-16">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="/images/cocktail-networking.jpg"
                alt="Members networking at upscale event"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end">
                <div className="p-8 text-white">
                  <h2 className="text-2xl font-bold mb-2">Supercharge Your Network with Friendship</h2>
                  <p className="text-lg opacity-90">Where professional growth happens through authentic connections</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <Card className="mb-12 bg-white/70 backdrop-blur-sm border-2">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed text-center mb-8">
                Our Third Place is an exclusive members-only community that fosters authentic moments and intimate
                connections that lead to dynamic professional networks and lifelong industry friends. We believe that
                the strongest business relationships are built on genuine friendship and mutual support within a
                carefully curated environment.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#dddbd4] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-[#1b1f2c]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Authentic</h3>
                  <p className="text-gray-600">Real connections beyond surface-level networking</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#dddbd4] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-[#1b1f2c]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Intimate</h3>
                  <p className="text-gray-600">Small group settings for meaningful conversations</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#dddbd4] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-[#1b1f2c]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Dynamic</h3>
                  <p className="text-gray-600">Networks that evolve and grow with your career</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How We Started Section */}
          <Card className="mb-12 bg-white/70 backdrop-blur-sm border-2">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How We Started</h2>
              <div className="max-w-3xl mx-auto">
                {/* Add founder photo section */}
                <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                  <div className="flex-shrink-0">
                    <img
                      src="/images/founder-katherine.jpg"
                      alt="Katherine Naylor Pullman, Founder of Our Third Place"
                      className="w-48 h-48 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Meet Our Founder</h3>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                      Katherine Naylor Pullman started The Media Dinner Club in October of 2022 as a way to network that
                      charges your battery, instead of draining it. She realized networking should be based on
                      friendship, and created a recurring intimate dinner party series that allowed women to become
                      friends before they became networkers.
                    </p>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">The Media Dinner Club</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  What started as MMDC - Monthly Media Dinner Club - a once a month dinner in New York City quickly
                  boomed into a thriving community that has transformed how professional women connect and support each
                  our lives outside of O3P.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Community Photos Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">See Our Community in Action</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src="/images/intimate-conversation.jpg"
                  alt="Member engaged in meaningful conversation"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-semibold mb-2">Meaningful Conversations</h3>
                    <p className="opacity-90">Deep connections formed over shared experiences</p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src="/images/dinner-toast.jpg"
                  alt="Members celebrating together"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-semibold mb-2">Celebrating Success</h3>
                    <p className="opacity-90">Toasting to new friendships and opportunities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="bg-white/70 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[#dddbd4] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-[#1b1f2c]" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">1500+</h3>
                <p className="text-gray-600">Active Members</p>
                <p className="text-xs text-gray-500 mt-1">Goal: 3000 by 2026</p>
              </CardContent>
            </Card>
            <Card className="bg-white/70 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[#dddbd4] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-[#1b1f2c]" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">10</h3>
                <p className="text-gray-600">Dinners Per Week</p>
                <p className="text-xs text-gray-500 mt-1">Access to all events</p>
              </CardContent>
            </Card>
            <Card className="bg-white/70 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[#dddbd4] rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-[#1b1f2c]" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">4500</h3>
                <p className="text-gray-600">Weekly Messages</p>
                <p className="text-xs text-gray-500 mt-1">73% are direct messages</p>
              </CardContent>
            </Card>
            <Card className="bg-white/70 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[#dddbd4] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Briefcase className="w-6 h-6 text-[#1b1f2c]" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">38%</h3>
                <p className="text-gray-600">Daily Job Sharing</p>
                <p className="text-xs text-gray-500 mt-1">Leading to direct hires</p>
              </CardContent>
            </Card>
          </div>

          {/* How It Works */}
          <Card className="mb-12 bg-white/70 backdrop-blur-sm border-2">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How It Works</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#1b1f2c] text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Join Your Industry Community</h3>
                    <p className="text-gray-600">
                      Select your industry and complete your membership application to join our curated community.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#1b1f2c] text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Attend Intimate Events</h3>
                    <p className="text-gray-600">
                      Join dinner parties, workshops, and networking events designed for meaningful connections.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#1b1f2c] text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Build Lasting Relationships</h3>
                    <p className="text-gray-600">
                      Develop genuine friendships that naturally evolve into powerful professional networks.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Find Your Third Place?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join a community where friendship and professional growth go hand in hand
            </p>
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#1b1f2c] to-[#646d59] hover:from-[#1b1f2c]/90 hover:to-[#646d59]/90 text-white px-8 py-3 text-lg"
              >
                Start Your Membership
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
