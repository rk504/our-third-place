"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Users,
  Star,
  ChefHat,
  DollarSign,
  MessageSquare,
  Settings,
  User,
  UserPlus,
  HelpCircle,
  Menu,
  X,
  Building,
  Award,
  TrendingUp,
  Plus,
} from "lucide-react"
import { Footer } from "@/components/footer"

export default function HostPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-amber-50 to-orange-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#1b1f2c] to-[#646d59] text-white sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image
                src="/images/o3p-logo-circle.png"
                alt="Our Third Place"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-2xl font-light" style={{ fontFamily: "Josefin Sans, sans-serif" }}>
                OUR THIRD PLACE
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/dashboard" className="hover:text-gray-200 transition-colors">
                Dashboard
              </Link>
              <Link href="/member" className="hover:text-gray-200 transition-colors">
                Member Portal
              </Link>
              <Link href="/" className="hover:text-gray-200 transition-colors">
                Home
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button onClick={toggleMenu} className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/20">
              <div className="flex flex-col space-y-3 mt-4">
                <button className="flex items-center space-x-3 text-left hover:bg-white/10 p-3 rounded-lg transition-colors">
                  <User className="w-5 h-5" />
                  <span>My Profile</span>
                </button>
                <button className="flex items-center space-x-3 text-left hover:bg-white/10 p-3 rounded-lg transition-colors">
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </button>
                <button className="flex items-center space-x-3 text-left hover:bg-white/10 p-3 rounded-lg transition-colors">
                  <UserPlus className="w-5 h-5" />
                  <span>Refer Friends</span>
                </button>
                <Link
                  href="/dashboard/host-signin"
                  className="flex items-center space-x-3 text-left hover:bg-white/10 p-3 rounded-lg transition-colors"
                >
                  <ChefHat className="w-5 h-5" />
                  <span>Host a Dinner</span>
                </Link>
                <button className="flex items-center space-x-3 text-left hover:bg-white/10 p-3 rounded-lg transition-colors">
                  <Building className="w-5 h-5" />
                  <span>Start a New Chapter</span>
                </button>
                <button className="flex items-center space-x-3 text-left hover:bg-white/10 p-3 rounded-lg transition-colors">
                  <HelpCircle className="w-5 h-5" />
                  <span>Help</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <ChefHat className="w-16 h-16 text-[#1b1f2c] mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-[#1b1f2c] mb-4">Become a Host</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create meaningful connections by hosting intimate dinner experiences for professionals in your industry.
            </p>
          </div>
          <Button size="lg" className="bg-[#1b1f2c] hover:bg-[#1b1f2c]/90 text-white">
            <Plus className="w-5 h-5 mr-2" />
            Host Your First Dinner
          </Button>
        </div>

        {/* Host Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-white/70 backdrop-blur-sm border-2 text-center">
            <CardContent className="p-8">
              <DollarSign className="w-12 h-12 text-[#646d59] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#1b1f2c] mb-2">Earn Income</h3>
              <p className="text-gray-600">
                Earn $50-150 per dinner while building your professional network and creating lasting connections.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-2 text-center">
            <CardContent className="p-8">
              <Users className="w-12 h-12 text-[#646d59] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#1b1f2c] mb-2">Build Your Network</h3>
              <p className="text-gray-600">
                Connect with like-minded professionals in your industry and expand your circle of influence.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-2 text-center">
            <CardContent className="p-8">
              <Award className="w-12 h-12 text-[#646d59] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#1b1f2c] mb-2">Recognition</h3>
              <p className="text-gray-600">
                Build your reputation as a community leader and gain recognition within your professional circle.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* How It Works */}
            <Card className="bg-white/70 backdrop-blur-sm border-2">
              <CardHeader>
                <CardTitle className="text-[#1b1f2c]">How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-[#1b1f2c] text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1b1f2c] mb-1">Apply to Host</h3>
                      <p className="text-gray-600">
                        Submit your application and get approved to become an official O3P host.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-[#1b1f2c] text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1b1f2c] mb-1">Plan Your Event</h3>
                      <p className="text-gray-600">
                        Choose your venue, set the date, and create an engaging experience for your guests.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-[#1b1f2c] text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1b1f2c] mb-1">Host & Connect</h3>
                      <p className="text-gray-600">
                        Welcome your guests, facilitate meaningful conversations, and create lasting connections.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-[#1b1f2c] text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1b1f2c] mb-1">Get Paid</h3>
                      <p className="text-gray-600">
                        Receive payment within 48 hours and get feedback from your guests.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Host Requirements */}
            <Card className="bg-white/70 backdrop-blur-sm border-2">
              <CardHeader>
                <CardTitle className="text-[#1b1f2c]">Host Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-[#1b1f2c] mb-3">Experience</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• 3+ years in your industry</li>
                      <li>• Strong communication skills</li>
                      <li>• Passion for networking</li>
                      <li>• Previous hosting experience preferred</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1b1f2c] mb-3">Logistics</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Access to suitable venue</li>
                      <li>• Ability to host 6-12 people</li>
                      <li>• Flexible scheduling</li>
                      <li>• Reliable transportation</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Host Stats */}
            <Card className="bg-white/70 backdrop-blur-sm border-2">
              <CardHeader>
                <CardTitle className="text-[#1b1f2c]">Host Community</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-white/50 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-[#646d59] mx-auto mb-2" />
                    <p className="text-2xl font-bold text-[#1b1f2c]">150+</p>
                    <p className="text-sm text-gray-600">Active Hosts</p>
                  </div>
                  <div className="text-center p-4 bg-white/50 rounded-lg">
                    <Star className="w-8 h-8 text-[#646d59] mx-auto mb-2" />
                    <p className="text-2xl font-bold text-[#1b1f2c]">4.8</p>
                    <p className="text-sm text-gray-600">Average Rating</p>
                  </div>
                  <div className="text-center p-4 bg-white/50 rounded-lg">
                    <DollarSign className="w-8 h-8 text-[#646d59] mx-auto mb-2" />
                    <p className="text-2xl font-bold text-[#1b1f2c]">$95</p>
                    <p className="text-sm text-gray-600">Avg Earnings</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Hosts */}
            <Card className="bg-white/70 backdrop-blur-sm border-2">
              <CardHeader>
                <CardTitle className="text-[#1b1f2c]">Top Hosts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Image
                      src="/images/user-headshot.jpg"
                      alt="Katherine Martinez"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-[#1b1f2c]">Katherine Martinez</p>
                      <p className="text-sm text-gray-600">Finance • 24 dinners</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm">4.9</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Image
                      src="/images/user-headshot.jpg"
                      alt="James Chen"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-[#1b1f2c]">James Chen</p>
                      <p className="text-sm text-gray-600">Media • 18 dinners</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm">4.8</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Image
                      src="/images/user-headshot.jpg"
                      alt="Sarah Kim"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-[#1b1f2c]">Sarah Kim</p>
                      <p className="text-sm text-gray-600">Tech • 16 dinners</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm">4.9</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/70 backdrop-blur-sm border-2">
              <CardHeader>
                <CardTitle className="text-[#1b1f2c]">Get Started</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full bg-[#1b1f2c] hover:bg-[#1b1f2c]/90 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Apply to Host
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Host Resources
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    FAQ
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
