import Link from "next/link"
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

export default function MembershipPage() {
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
              Everything included in your exclusive Our Third Place membership
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join an exclusive members-only community where authentic friendships become powerful professional
              networks. Your membership includes access to all events, resources, and connections across our global
              community.
            </p>
          </div>

          {/* Main Benefits Grid - 3 Across */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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

          {/* Pricing Section */}
          <Card className="mb-16 bg-gradient-to-r from-[#dddbd4] to-[#dddbd4]/70 border-2 border-[#1b1f2c]">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Membership Pricing</h2>
                <p className="text-lg text-gray-700">Choose the plan that works best for you</p>
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
                        "Access to all O3P Dinners",
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
                      <p className="text-xs text-gray-500 text-center">Cancel anytime. No long-term commitments.</p>
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
                        "Access to all O3P Dinners",
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
                      <p className="text-xs text-gray-500 text-center">Best value. Cancel anytime.</p>
                    </div>
                  </CardContent>
                </Card>
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
                    relationships.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#dddbd4] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-[#1b1f2c]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Curated Community</h3>
                  <p className="text-gray-600">
                    Our members-only community is carefully curated to ensure quality connections and shared values.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#dddbd4] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-[#1b1f2c]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Proven Results</h3>
                  <p className="text-gray-600">
                    38% of our members share job opportunities daily, leading to direct referrals and career
                    advancement.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Join Our Community?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Start building meaningful professional relationships through authentic friendships
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#1b1f2c] to-[#646d59] hover:from-[#1b1f2c]/90 hover:to-[#646d59]/90 text-white px-8 py-3 text-lg"
                >
                  Start Your Membership
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
