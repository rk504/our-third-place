import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Users, Calendar, MessageSquare, BookOpen, Globe, MapPin, Briefcase } from "lucide-react"
import { Footer } from "@/components/footer"

const benefits = [
  {
    title: "O3P Dinners",
    description:
      "What we're known for! Our dinner party series is hosted by our Chapter and Dinner Leads. These dinners are intimate, informal, and all about coming as you are for a girls' night out.",
    icon: Users,
    color: "brand",
    bgColor: "bg-[#dddbd4]",
    iconColor: "text-[#1b1f2c]",
    borderColor: "border-[#1b1f2c]",
  },
  {
    title: "O3P Events",
    description:
      "The chance to come together in big group settings! These sponsored events gather all of our members for an enjoyable night of activities, open bars, and networking.",
    icon: Calendar,
    color: "brand",
    bgColor: "bg-[#dddbd4]",
    iconColor: "text-[#1b1f2c]",
    borderColor: "border-[#1b1f2c]",
  },
  {
    title: "Savory Sessions",
    description:
      "Savory Sessions offers a fresh take on professional development where members engage in a friend-to-friend mentorship exchange.",
    icon: BookOpen,
    color: "brand",
    bgColor: "bg-[#dddbd4]",
    iconColor: "text-[#1b1f2c]",
    borderColor: "border-[#1b1f2c]",
  },
  {
    title: "Table Talk",
    description:
      "Your weekly newsletter round-up that keeps you up-to-date on the industry, our club, our lives outside of O3P, and topics/conversations in our Slack that we think everyone should know about.",
    icon: MessageSquare,
    color: "brand",
    bgColor: "bg-[#dddbd4]",
    iconColor: "text-[#1b1f2c]",
    borderColor: "border-[#1b1f2c]",
  },
  {
    title: "Global Slack Community",
    description:
      "Online community across all chapters with dozens of topics, such as Open Roles, AI-News, Industry Events, and Mom Talk.",
    icon: Globe,
    color: "brand",
    bgColor: "bg-[#dddbd4]",
    iconColor: "text-[#1b1f2c]",
    borderColor: "border-[#1b1f2c]",
  },
  {
    title: "O3P Field Trips",
    description:
      "Meet with other MDC members for Field Trips! These are intimate gatherings outside of dinner throughout our cities — think museums, workout classes, hikes, and more.",
    icon: MapPin,
    color: "brand",
    bgColor: "bg-[#dddbd4]",
    iconColor: "text-[#1b1f2c]",
    borderColor: "border-[#1b1f2c]",
  },
  {
    title: "Industry Meet Ups",
    description:
      "Meet other O3P Members at conferences year-round! During the hustle and bustle of meetings, take the time to sit back, relax, and network with other members.",
    icon: Briefcase,
    color: "brand",
    bgColor: "bg-[#dddbd4]",
    iconColor: "text-[#1b1f2c]",
    borderColor: "border-[#1b1f2c]",
  },
]

export default function BenefitsPage() {
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
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Membership Benefits</h1>
            <p className="text-xl text-gray-700 mb-8">
              Everything you get as part of our exclusive members-only community
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <Card
                  key={index}
                  className={`${benefit.bgColor} ${benefit.borderColor} border-2 hover:shadow-lg transition-shadow`}
                >
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-16 h-16 ${benefit.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 border-2 ${benefit.borderColor}`}
                    >
                      <IconComponent className={`w-8 h-8 ${benefit.iconColor}`} />
                    </div>
                    <CardTitle className="text-xl text-gray-900">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Featured Benefit */}
          <Card className="mb-16 bg-gradient-to-r from-[#dddbd4] to-[#dddbd4]/70 border-2 border-[#1b1f2c]">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Users className="w-10 h-10 text-rose-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">O3P Dinners - Our Signature Experience</h2>
                <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
                  Our intimate dinner parties are what set us apart. Hosted by dedicated Chapter and Dinner Leads, these
                  aren't your typical networking events. They're genuine girls' nights out where you can come as you
                  are, share authentic conversations, and build real friendships that naturally evolve into powerful
                  professional connections.
                </p>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Intimate Setting</h3>
                    <p className="text-sm text-gray-600">Small groups for meaningful conversations</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Informal Atmosphere</h3>
                    <p className="text-sm text-gray-600">Come as you are, no pressure</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Expert Hosts</h3>
                    <p className="text-sm text-gray-600">Led by experienced Chapter Leaders</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Community Highlights */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-white/70 backdrop-blur-sm border-2">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 flex items-center">
                  <Globe className="w-6 h-6 text-green-600 mr-2" />
                  Global Slack Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Stay connected 24/7 with members across all chapters through our vibrant Slack community.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Open Roles - Job opportunities shared by members</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>AI-News - Latest industry developments</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Industry Events - Conferences and meetups</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <span>Mom Talk - Support for working mothers</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-2">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 flex items-center">
                  <MapPin className="w-6 h-6 text-pink-600 mr-2" />
                  Beyond the Dinner Table
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Connect with members through diverse activities and experiences throughout your city.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                    <span>Museum visits and cultural experiences</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span>Workout classes and wellness activities</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Hiking and outdoor adventures</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span>Conference meetups and industry events</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Experience All These Benefits?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join our exclusive members-only community of 1500+ women and start building meaningful professional
              relationships today
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
