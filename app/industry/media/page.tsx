"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowLeft,
  Users,
  Calendar,
  MessageSquare,
  BookOpen,
  MapPin,
  Briefcase,
  Mail,
  Heart,
  Star,
  CheckCircle,
} from "lucide-react"
import { Footer } from "@/components/footer"

const membershipBenefits = [
  {
    title: "O3P Dinners",
    description:
      "What we're known for! Our dinner party series is hosted by our Chapter and Dinner Leads. These dinners are intimate, informal, and all about coming as you are for a girls' night out.",
    icon: Users,
    color: "text-[#1b1f2c]",
    bgColor: "bg-[#dddbd4]",
    features: [
      "Intimate groups of 6-12 members",
      "Hosted by experienced Chapter Leads",
      "Carefully curated restaurant selections",
      "No pressure networking environment",
      "Average 10 dinners per week globally",
    ],
  },
  {
    title: "O3P Events",
    description:
      "The chance to come together in big group settings! These sponsored events gather all of our members for an enjoyable night of activities, open bars, and networking.",
    icon: Calendar,
    color: "text-[#1b1f2c]",
    bgColor: "bg-[#dddbd4]",
    features: [
      "Large networking mixers with 50+ attendees",
      "Complimentary open bars and appetizers",
      "Industry speakers and panel discussions",
      "Seasonal celebrations and themed events",
      "Premium venue partnerships",
    ],
  },
  {
    title: "Global Slack Community",
    description:
      "Online community across all chapters with dozens of topics, such as Open Roles, AI-News, Industry Events, and Mom Talk.",
    icon: MessageSquare,
    color: "text-[#1b1f2c]",
    bgColor: "bg-[#dddbd4]",
    features: [
      "4,500+ weekly messages across channels",
      "Open Roles channel with daily job postings",
      "Industry-specific discussion channels",
      "Mom Talk support community",
      "AI & Tech news and insights",
      "Direct messaging with 1,500+ members",
    ],
  },
  {
    title: "Savory Sessions",
    description:
      "Savory Sessions offers a fresh take on professional development where members engage in a friend-to-friend mentorship exchange.",
    icon: BookOpen,
    color: "text-[#1b1f2c]",
    bgColor: "bg-[#dddbd4]",
    features: [
      "Peer-to-peer mentorship matching",
      "Skill-sharing workshops and sessions",
      "Career development guidance",
      "Leadership training opportunities",
      "Professional growth tracking",
    ],
  },
  {
    title: "Table Talk Newsletter",
    description:
      "Your weekly newsletter round-up that keeps you up-to-date on the industry, our club, our lives outside of O3P, and topics/conversations in our Slack.",
    icon: Mail,
    color: "text-[#1b1f2c]",
    bgColor: "bg-[#dddbd4]",
    features: [
      "Weekly industry insights and trends",
      "Member spotlights and success stories",
      "Upcoming events and opportunities",
      "Curated Slack conversation highlights",
      "Personal and professional development tips",
    ],
  },
  {
    title: "O3P Field Trips",
    description:
      "Meet with other O3P members for Field Trips! These are intimate gatherings outside of dinner throughout our cities — think museums, workout classes, hikes, and more.",
    icon: MapPin,
    color: "text-[#1b1f2c]",
    bgColor: "bg-[#dddbd4]",
    features: [
      "Museum visits and cultural experiences",
      "Fitness classes and wellness activities",
      "Outdoor adventures and hiking groups",
      "Art gallery tours and creative workshops",
      "Seasonal activities and local explorations",
    ],
  },
  {
    title: "Industry Conference Meetups",
    description:
      "Meet other O3P Members at conferences year-round! During the hustle and bustle of meetings, take the time to sit back, relax, and network with other members.",
    icon: Briefcase,
    color: "text-[#1b1f2c]",
    bgColor: "bg-[#dddbd4]",
    features: [
      "Organized meetups at major industry conferences",
      "Pre-conference networking sessions",
      "Shared conference experiences and insights",
      "Group dining and social activities",
      "Professional development opportunities",
    ],
  },
]

const companyLogos = [
  { src: "/images/axios-logo.png", alt: "Axios" },
  { src: "/images/voyager-san-diego-logo.png", alt: "Voyager San Diego" },
  { src: "/images/san-diego-magazine-logo.png", alt: "San Diego Magazine" },
  { src: "/images/vicinity-logo.png", alt: "Vicinity" },
]

export default function MediaIndustryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-[#1b1f2c]">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-2xl font-light font-['Josefin_Sans']">OUR THIRD PLACE</span>
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
            <div className="flex items-center justify-center mb-6">
              <Image
                src="/images/media-dinner-club-logo.png"
                alt="Media Network"
                width={100}
                height={100}
                className="rounded-full border-4 border-white shadow-lg"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-['Josefin_Sans']">OUR THIRD PLACE</h1>
            <h2 className="text-3xl md:text-4xl font-light text-[#646d59] mb-8 font-['Josefin_Sans']">
              THE MEDIA NETWORK
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Join an exclusive members-only community where authentic friendships become powerful professional networks
              in the media industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#1b1f2c] to-[#646d59] hover:from-[#1b1f2c]/90 hover:to-[#646d59]/90 text-white px-8 py-4 text-lg"
                asChild
              >
                <Link href="/signup">Start Your Membership</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#1b1f2c] text-[#1b1f2c] hover:bg-[#dddbd4] bg-transparent px-8 py-4 text-lg"
                asChild
              >
                <Link href="/membership">View Membership Benefits</Link>
              </Button>
            </div>
          </div>

          {/* About Our Third Place Section */}
          <Card className="mb-16 bg-white/70 backdrop-blur-sm border-2">
            <CardContent className="p-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1b1f2c] mb-8 text-center">
                SUPERCHARGE YOUR NETWORK WITH FRIENDSHIP
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                <p className="text-lg leading-relaxed">
                  Welcome to Our Third Place - a membership built on the intersection of networking, friendship and
                  community building.
                </p>
                <p className="text-lg leading-relaxed">
                  Our Third Place is redefining networking - transforming it from a task into a joy-filled habit rooted
                  in friendship, trust, and authenticity. We are a membership-based community of powerhouse women and
                  non-binary professionals who show up as themselves, support one another, and lead with joy.
                </p>
                <p className="text-lg leading-relaxed">
                  Through our signature dinner party series, we make in-person connection effortless and enjoyable. With
                  easy sign-up, no prep, and zero pressure to pitch, our gatherings feel more like a night out with
                  friends than a typical networking event.
                </p>
                <p className="text-lg leading-relaxed">
                  But it doesn't end at the table. Members also connect across industries, cities and generations
                  through our vibrant online community and Slack space.
                </p>
                <p className="text-xl font-semibold text-[#646d59] text-center mt-8">
                  Join us and experience what networking can feel like - natural, meaningful, and something you'll
                  actually look forward to.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Media Industry Focus */}
          <Card className="mb-16 bg-gradient-to-r from-[#1b1f2c] to-[#646d59] text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-6">Built for Media Professionals</h2>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                Connect with PR executives, marketing directors, creative professionals, and media innovators who are
                shaping the future of communications.
              </p>
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <div className="text-3xl font-bold mb-2">200+</div>
                  <div className="text-white/80">Media Members</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">15+</div>
                  <div className="text-white/80">Companies Represented</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">45+</div>
                  <div className="text-white/80">Media Events Hosted</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">85%</div>
                  <div className="text-white/80">Made New Connections</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Membership Benefits Grid */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Everything Included in Your Membership
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Access all events, resources, and connections across our global community of media professionals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {membershipBenefits.map((benefit, index) => {
                const IconComponent = benefit.icon

                return (
                  <Card
                    key={index}
                    className={`${benefit.bgColor} border-2 border-[#1b1f2c] hover:shadow-xl transition-all duration-300 h-full`}
                  >
                    <CardHeader className="text-center pb-4">
                      <div
                        className={`w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border-2 border-[#1b1f2c]`}
                      >
                        <IconComponent className={`w-8 h-8 ${benefit.color}`} />
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <p className="text-gray-700 leading-relaxed">{benefit.description}</p>

                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-gray-900">What's Included:</h3>
                        {benefit.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start space-x-3">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Stats Display */}
                      <div className="bg-white/50 rounded-xl p-4 text-center border border-white">
                        <div className="text-2xl font-bold text-[#1b1f2c] mb-1">
                          {benefit.title === "O3P Dinners" && "10/week"}
                          {benefit.title === "O3P Events" && "50+ people"}
                          {benefit.title === "Global Slack Community" && "4500 msgs"}
                          {benefit.title === "Savory Sessions" && "1:1 mentoring"}
                          {benefit.title === "Table Talk Newsletter" && "Weekly"}
                          {benefit.title === "O3P Field Trips" && "Monthly"}
                          {benefit.title === "Industry Conference Meetups" && "Year-round"}
                        </div>
                        <p className="text-gray-600 text-sm font-medium">
                          {benefit.title === "O3P Dinners" && "Average globally"}
                          {benefit.title === "O3P Events" && "Large gatherings"}
                          {benefit.title === "Global Slack Community" && "Weekly activity"}
                          {benefit.title === "Savory Sessions" && "Peer mentorship"}
                          {benefit.title === "Table Talk Newsletter" && "Industry insights"}
                          {benefit.title === "O3P Field Trips" && "Cultural activities"}
                          {benefit.title === "Industry Conference Meetups" && "Professional events"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Pricing Section */}
          <Card className="mb-16 bg-gradient-to-r from-[#dddbd4] to-[#dddbd4]/70 border-2 border-[#1b1f2c]">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
                <p className="text-lg text-gray-700">Choose the plan that works best for your media career</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Monthly Plan */}
                <Card className="bg-white/70 backdrop-blur-sm border-2 hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-bold text-gray-900">Monthly</CardTitle>
                    <div className="text-4xl font-bold text-[#1b1f2c] mb-2">$15</div>
                    <p className="text-gray-600">per month</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {[
                        "Access to all O3P Media Dinners",
                        "Large networking events with open bars",
                        "Global Slack community access",
                        "Weekly Table Talk newsletter",
                        "Savory Sessions mentorship",
                        "O3P Field Trips",
                        "Industry conference meetups",
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-4">
                      <Button
                        className="w-full bg-gradient-to-r from-[#1b1f2c] to-[#646d59] hover:from-[#1b1f2c]/90 hover:to-[#646d59]/90 text-white"
                        asChild
                      >
                        <Link href="/signup">Start Monthly Plan</Link>
                      </Button>
                      <p className="text-xs text-gray-500 text-center mt-2">
                        Cancel anytime. No long-term commitments.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Annual Plan */}
                <Card className="bg-white/70 backdrop-blur-sm border-2 hover:shadow-lg transition-shadow relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#1b1f2c] text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Save $36
                    </span>
                  </div>
                  <CardHeader className="text-center pb-4 pt-8">
                    <CardTitle className="text-2xl font-bold text-gray-900">Annual</CardTitle>
                    <div className="text-4xl font-bold text-[#1b1f2c] mb-2">$144</div>
                    <p className="text-gray-600">per year</p>
                    <p className="text-sm text-green-600 font-semibold">Just $12/month when billed annually</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {[
                        "Access to all O3P Media Dinners",
                        "Large networking events with open bars",
                        "Global Slack community access",
                        "Weekly Table Talk newsletter",
                        "Savory Sessions mentorship",
                        "O3P Field Trips",
                        "Industry conference meetups",
                        "Priority event registration",
                        "Exclusive annual member perks",
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-4">
                      <Button
                        className="w-full bg-gradient-to-r from-[#1b1f2c] to-[#646d59] hover:from-[#1b1f2c]/90 hover:to-[#646d59]/90 text-white"
                        asChild
                      >
                        <Link href="/signup">Start Annual Plan</Link>
                      </Button>
                      <p className="text-xs text-gray-500 text-center mt-2">Best value. Cancel anytime.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Company Logos */}
          <Card className="mb-16 bg-white/70 backdrop-blur-sm border-2">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1b1f2c] mb-4">
                  Trusted by Media Professionals From
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center max-w-4xl mx-auto">
                {companyLogos.map((logo, index) => (
                  <div key={index} className="flex items-center justify-center p-4">
                    <Image
                      src={logo.src || "/placeholder.svg"}
                      alt={logo.alt}
                      width={120}
                      height={60}
                      className="object-contain opacity-70 hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Community Impact Section */}
          <Card className="mb-16 bg-white/70 backdrop-blur-sm border-2">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-[#dddbd4] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Heart className="w-10 h-10 text-[#1b1f2c]" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">More Than Just Networking</h2>
                <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
                  Our Third Place isn't just about professional connections—it's about building authentic friendships
                  that naturally evolve into powerful business relationships. Here's what makes us different:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#dddbd4] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-[#1b1f2c]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Authentic Connections</h3>
                  <p className="text-gray-600">
                    We prioritize genuine friendships over transactional networking. Come as you are and build real
                    relationships in the media industry.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#dddbd4] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-[#1b1f2c]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Curated Community</h3>
                  <p className="text-gray-600">
                    Our media-focused community is carefully curated to ensure quality connections and shared
                    professional values.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#dddbd4] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-[#1b1f2c]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Proven Results</h3>
                  <p className="text-gray-600">
                    38% of our media members share job opportunities daily, leading to direct referrals and career
                    advancement in the industry.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Final CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Transform Your Media Career?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join hundreds of media professionals who have elevated their careers through authentic connections and
              exclusive opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#1b1f2c] to-[#646d59] hover:from-[#1b1f2c]/90 hover:to-[#646d59]/90 text-white px-8 py-3 text-lg"
                >
                  Start Your Media Network Journey
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#1b1f2c] text-[#1b1f2c] hover:bg-[#dddbd4] bg-transparent px-8 py-3 text-lg"
                >
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
