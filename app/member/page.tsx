"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Users,
  MapPin,
  Clock,
  Star,
  MessageSquare,
  Settings,
  User,
  UserPlus,
  HelpCircle,
  Menu,
  X,
  ChefHat,
  Building,
  Phone,
  Mail,
  Edit,
  Award,
  TrendingUp,
} from "lucide-react"
import { Footer } from "@/components/footer"

export default function MemberPage() {
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
              <Link href="/host" className="hover:text-gray-200 transition-colors">
                Host a Dinner
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
                  href="/host"
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
        {/* Profile Header */}
        <div className="mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-2">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="relative">
                  <Image
                    src="/images/user-headshot.jpg"
                    alt="Sarah Chen"
                    width={120}
                    height={120}
                    className="rounded-full"
                  />
                  <button className="absolute bottom-0 right-0 bg-[#1b1f2c] text-white p-2 rounded-full hover:bg-[#1b1f2c]/90 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-[#1b1f2c] mb-2">Sarah Chen</h1>
                  <p className="text-xl text-gray-600 mb-2">Marketing Director at TechFlow</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <Mail className="w-4 h-4" />
                      <span>sarah.chen@techflow.com</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Phone className="w-4 h-4" />
                      <span>(555) 123-4567</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>San Diego, CA</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Marketing</Badge>
                    <Badge variant="secondary">Technology</Badge>
                    <Badge variant="secondary">Growth Strategy</Badge>
                    <Badge variant="secondary">Digital Marketing</Badge>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <Button className="bg-[#1b1f2c] hover:bg-[#1b1f2c]/90 text-white">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Member Stats */}
            <Card className="bg-white/70 backdrop-blur-sm border-2">
              <CardHeader>
                <CardTitle className="text-[#1b1f2c]">Member Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white/50 rounded-lg">
                    <Calendar className="w-8 h-8 text-[#646d59] mx-auto mb-2" />
                    <p className="text-2xl font-bold text-[#1b1f2c]">12</p>
                    <p className="text-sm text-gray-600">Events Attended</p>
                  </div>
                  <div className="text-center p-4 bg-white/50 rounded-lg">
                    <Users className="w-8 h-8 text-[#646d59] mx-auto mb-2" />
                    <p className="text-2xl font-bold text-[#1b1f2c]">47</p>
                    <p className="text-sm text-gray-600">Connections</p>
                  </div>
                  <div className="text-center p-4 bg-white/50 rounded-lg">
                    <Star className="w-8 h-8 text-[#646d59] mx-auto mb-2" />
                    <p className="text-2xl font-bold text-[#1b1f2c]">4.9</p>
                    <p className="text-sm text-gray-600">Avg Rating</p>
                  </div>
                  <div className="text-center p-4 bg-white/50 rounded-lg">
                    <Award className="w-8 h-8 text-[#646d59] mx-auto mb-2" />
                    <p className="text-2xl font-bold text-[#1b1f2c]">Gold</p>
                    <p className="text-sm text-gray-600">Member Tier</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white/70 backdrop-blur-sm border-2">
              <CardHeader>
                <CardTitle className="text-[#1b1f2c]">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-white/50 rounded-lg">
                    <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#1b1f2c]">Attended Finance Professionals Dinner</h3>
                      <p className="text-sm text-gray-600">Made 3 new connections at The Prado</p>
                      <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-white/50 rounded-lg">
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                      <UserPlus className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#1b1f2c]">Connected with Michael Rodriguez</h3>
                      <p className="text-sm text-gray-600">Investment Banking at Goldman Sachs</p>
                      <p className="text-xs text-gray-500 mt-1">1 week ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-white/50 rounded-lg">
                    <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                      <Star className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#1b1f2c]">Received 5-star rating</h3>
                      <p className="text-sm text-gray-600">From Media & Marketing Mixer event</p>
                      <p className="text-xs text-gray-500 mt-1">2 weeks ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-white/50 rounded-lg">
                    <div className="bg-orange-100 text-orange-600 p-2 rounded-lg">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#1b1f2c]">Upgraded to Gold Member</h3>
                      <p className="text-sm text-gray-600">Unlocked premium features and priority booking</p>
                      <p className="text-xs text-gray-500 mt-1">3 weeks ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card className="bg-white/70 backdrop-blur-sm border-2">
              <CardHeader>
                <CardTitle className="text-[#1b1f2c]">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-white/50 rounded-lg">
                    <h4 className="font-semibold text-[#1b1f2c] text-sm">Finance Professionals Dinner</h4>
                    <div className="flex items-center space-x-2 text-xs text-gray-600 mt-1">
                      <Clock className="w-3 h-3" />
                      <span>Tomorrow, 7:00 PM</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <MapPin className="w-3 h-3" />
                      <span>The Prado</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white/50 rounded-lg">
                    <h4 className="font-semibold text-[#1b1f2c] text-sm">Media & Marketing Mixer</h4>
                    <div className="flex items-center space-x-2 text-xs text-gray-600 mt-1">
                      <Clock className="w-3 h-3" />
                      <span>Friday, 6:30 PM</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <MapPin className="w-3 h-3" />
                      <span>Rooftop Bar</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* My Connections */}
            <Card className="bg-white/70 backdrop-blur-sm border-2">
              <CardHeader>
                <CardTitle className="text-[#1b1f2c]">My Connections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Image
                      src="/images/user-headshot.jpg"
                      alt="Michael Chen"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-[#1b1f2c] text-sm">Michael Chen</p>
                      <p className="text-xs text-gray-600">Investment Banking</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="w-3 h-3" />
                    </Button>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Image
                      src="/images/user-headshot.jpg"
                      alt="Emily Rodriguez"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-[#1b1f2c] text-sm">Emily Rodriguez</p>
                      <p className="text-xs text-gray-600">Marketing Director</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="w-3 h-3" />
                    </Button>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Image
                      src="/images/user-headshot.jpg"
                      alt="David Kim"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-[#1b1f2c] text-sm">David Kim</p>
                      <p className="text-xs text-gray-600">Creative Director</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  View All Connections
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/70 backdrop-blur-sm border-2">
              <CardHeader>
                <CardTitle className="text-[#1b1f2c]">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full bg-[#1b1f2c] hover:bg-[#1b1f2c]/90 text-white">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Event
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Invite Friend
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Feedback
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
