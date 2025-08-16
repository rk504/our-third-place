import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Users, MessageSquare, Briefcase, Calendar, TrendingUp } from "lucide-react"
import { Footer } from "@/components/footer"

const stats = [
  {
    number: "38%",
    title: "Open Roles Engagement",
    description:
      "of our members communicate daily in our Open Roles channel about open roles they're hiring for or applying to, often leading to direct referrals and hiring!",
    icon: Briefcase,
    color: "text-[#1b1f2c]",
    bgColor: "bg-[#dddbd4]",
  },
  {
    number: "4500",
    title: "Slack Messages",
    description: "Our members send a total of ~4500 messages each week on Slack. 73% of them are direct messages.",
    icon: MessageSquare,
    color: "text-[#1b1f2c]",
    bgColor: "bg-[#dddbd4]",
  },
  {
    number: "1500+",
    title: "Active Members",
    description: "There are 1500+ active Media Dinner Club members. Our goal is to reach 3000 by 2026.",
    icon: Users,
    color: "text-[#1b1f2c]",
    bgColor: "bg-[#dddbd4]",
  },
  {
    number: "10",
    title: "Dinners Per Week",
    description:
      "On average, we host 10 dinners or events per week! Your All Access Pass gives you access to all of them.",
    icon: Calendar,
    color: "text-[#1b1f2c]",
    bgColor: "bg-[#dddbd4]",
  },
]

export default function StatsPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Community Impact</h1>
            <p className="text-xl text-gray-700 mb-8">Real engagement, measurable results, lasting connections</p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our Third Place isn't just about networking—it's an exclusive members-only community creating a thriving
              ecosystem where professional growth happens naturally through authentic relationships.
            </p>
          </div>

          {/* Main Stats Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <Card key={index} className="bg-white/70 backdrop-blur-sm border-2 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 ${stat.bgColor} rounded-full flex items-center justify-center`}>
                        <IconComponent className={`w-8 h-8 ${stat.color}`} />
                      </div>
                      <div>
                        <div className="text-4xl font-bold text-[#1b1f2c] mb-1">{stat.number}</div>
                        <CardTitle className="text-xl text-gray-900">{stat.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{stat.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Growth & Goals Section */}
          <Card className="mb-16 bg-gradient-to-r from-[#dddbd4] to-[#dddbd4]/70 border-2 border-[#1b1f2c]">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <TrendingUp className="w-10 h-10 text-[#1b1f2c]" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Growing Together</h2>
                <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
                  Our community continues to expand while maintaining the intimate, authentic connections that make us
                  special. Every new member adds value to our collective network.
                </p>
                <div className="grid md:grid-cols-2 gap-8 text-center">
                  <div>
                    <div className="text-3xl font-bold text-[#1b1f2c] mb-2">1500+ → 3000</div>
                    <h3 className="font-semibold text-gray-900 mb-2">Member Growth Goal</h3>
                    <p className="text-sm text-gray-600">Doubling our community by 2026 while preserving quality</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#1b1f2c] mb-2">73%</div>
                    <h3 className="font-semibold text-gray-900 mb-2">Direct Messages</h3>
                    <p className="text-sm text-gray-600">
                      Most conversations happen one-on-one, fostering deeper bonds
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Impact Stories */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white/70 backdrop-blur-sm border-2">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 flex items-center">
                  <Briefcase className="w-5 h-5 text-[#1b1f2c] mr-2" />
                  Career Advancement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm">
                  With 38% of members actively sharing job opportunities daily, our Open Roles channel has become a
                  powerful pipeline for career growth and direct hiring.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-2">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 flex items-center">
                  <MessageSquare className="w-5 h-5 text-[#1b1f2c] mr-2" />
                  Deep Connections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm">
                  Our 4500 weekly messages show an engaged community, with 73% being direct messages that build
                  meaningful one-on-one relationships.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-2">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 flex items-center">
                  <Calendar className="w-5 h-5 text-[#1b1f2c] mr-2" />
                  Consistent Engagement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm">
                  With 10 dinners and events per week, members have constant opportunities to connect, ensuring no one
                  falls through the cracks.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Be Part of These Numbers?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join our exclusive members-only community where your professional growth is supported by genuine
              friendships and active engagement
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
