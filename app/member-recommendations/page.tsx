"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Search,
  Users,
  MapPin,
  Building,
  MessageSquare,
  X,
  Heart,
  UserPlus,
  Linkedin,
  Calendar,
  Award,
} from "lucide-react"
import { Footer } from "@/components/footer"

// Mock data for member recommendations
const memberRecommendations = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Senior Producer",
    company: "Netflix",
    location: "NYC",
    industry: "Media",
    avatar: "/images/user-headshot.jpg",
    matchPercentage: 95,
    mutualConnections: 8,
    interests: ["Content Strategy", "Streaming", "Documentary", "International Markets"],
    connectionStatus: "available",
    joinedDate: "2023-10-15",
    eventsAttended: 12,
    badges: ["Media Maven", "Content Creator"],
    bio: "Passionate about creating compelling content that resonates globally. Always looking to connect with fellow creatives and industry innovators.",
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    title: "Managing Director",
    company: "Sequoia Capital",
    location: "NYC",
    industry: "Finance",
    avatar: "/images/user-headshot.jpg",
    matchPercentage: 92,
    mutualConnections: 5,
    interests: ["Venture Capital", "Fintech", "AI/ML", "Early Stage Investing"],
    connectionStatus: "available",
    joinedDate: "2023-09-20",
    eventsAttended: 18,
    badges: ["Investment Leader", "Startup Mentor"],
    bio: "Focused on identifying and nurturing the next generation of transformative companies. Love connecting with entrepreneurs and fellow investors.",
  },
  {
    id: 3,
    name: "Emily Watson",
    title: "Creative Director",
    company: "Wieden+Kennedy",
    location: "NYC",
    industry: "Media",
    avatar: "/images/user-headshot.jpg",
    matchPercentage: 88,
    mutualConnections: 12,
    interests: ["Brand Strategy", "Creative Campaigns", "Digital Marketing", "Art Direction"],
    connectionStatus: "connected",
    joinedDate: "2023-11-02",
    eventsAttended: 9,
    badges: ["Creative Visionary", "Brand Builder"],
    bio: "Crafting memorable brand experiences through innovative creative strategies. Always excited to collaborate with like-minded creatives.",
  },
  {
    id: 4,
    name: "David Kim",
    title: "Portfolio Manager",
    company: "BlackRock",
    location: "NYC",
    industry: "Finance",
    avatar: "/images/user-headshot.jpg",
    matchPercentage: 85,
    mutualConnections: 3,
    interests: ["Asset Management", "ESG Investing", "Market Analysis", "Risk Management"],
    connectionStatus: "pending",
    joinedDate: "2023-08-10",
    eventsAttended: 15,
    badges: ["Finance Expert", "ESG Advocate"],
    bio: "Dedicated to sustainable investing and creating long-term value. Enjoy discussing market trends and investment strategies with peers.",
  },
  {
    id: 5,
    name: "Jessica Park",
    title: "Head of Content",
    company: "Spotify",
    location: "NYC",
    industry: "Media",
    avatar: "/images/user-headshot.jpg",
    matchPercentage: 90,
    mutualConnections: 7,
    interests: ["Audio Content", "Podcasting", "Music Industry", "Content Curation"],
    connectionStatus: "available",
    joinedDate: "2023-12-01",
    eventsAttended: 6,
    badges: ["Audio Pioneer", "Content Curator"],
    bio: "Passionate about the power of audio to connect and inspire. Always looking for innovative ways to engage audiences through sound.",
  },
  {
    id: 6,
    name: "Alex Thompson",
    title: "Managing Director",
    company: "Goldman Sachs",
    location: "NYC",
    industry: "Finance",
    avatar: "/images/user-headshot.jpg",
    matchPercentage: 87,
    mutualConnections: 9,
    interests: ["Investment Banking", "M&A", "Corporate Finance", "Capital Markets"],
    connectionStatus: "available",
    joinedDate: "2023-07-15",
    eventsAttended: 21,
    badges: ["Deal Maker", "Finance Leader"],
    bio: "Experienced in complex financial transactions and strategic advisory. Enjoy mentoring junior professionals and sharing industry insights.",
  },
  {
    id: 7,
    name: "Rachel Green",
    title: "VP of Marketing",
    company: "HBO Max",
    location: "NYC",
    industry: "Media",
    avatar: "/images/user-headshot.jpg",
    matchPercentage: 83,
    mutualConnections: 4,
    interests: ["Entertainment Marketing", "Audience Development", "Social Media", "Brand Partnerships"],
    connectionStatus: "available",
    joinedDate: "2023-09-05",
    eventsAttended: 11,
    badges: ["Marketing Strategist", "Entertainment Expert"],
    bio: "Driving audience engagement through innovative marketing strategies. Love exploring new ways to connect content with communities.",
  },
  {
    id: 8,
    name: "Michael Chang",
    title: "Principal",
    company: "Andreessen Horowitz",
    location: "NYC",
    industry: "Finance",
    avatar: "/images/user-headshot.jpg",
    matchPercentage: 89,
    mutualConnections: 6,
    interests: ["Venture Capital", "Tech Investing", "Consumer Products", "Mobile Apps"],
    connectionStatus: "available",
    joinedDate: "2023-10-20",
    eventsAttended: 14,
    badges: ["Tech Investor", "Innovation Catalyst"],
    bio: "Investing in the future of consumer technology. Passionate about supporting founders who are building the next generation of digital experiences.",
  },
]

const industries = ["All Industries", "Media", "Finance"]
const interests = [
  "All Interests",
  "Content Strategy",
  "Venture Capital",
  "Brand Strategy",
  "Investment Banking",
  "Fintech",
  "Creative Campaigns",
  "Asset Management",
  "Podcasting",
  "M&A",
]

export default function MemberRecommendationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries")
  const [selectedInterest, setSelectedInterest] = useState("All Interests")
  const [selectedMember, setSelectedMember] = useState<any>(null)

  // Filter members based on search and filters
  const filteredMembers = memberRecommendations.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.company.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesIndustry = selectedIndustry === "All Industries" || member.industry === selectedIndustry

    const matchesInterest =
      selectedInterest === "All Interests" || member.interests.some((interest) => interest === selectedInterest)

    return matchesSearch && matchesIndustry && matchesInterest
  })

  const getConnectionStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "available":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getConnectionStatusText = (status: string) => {
    switch (status) {
      case "connected":
        return "Connected"
      case "pending":
        return "Pending"
      case "available":
        return "Available"
      default:
        return "Unknown"
    }
  }

  const getIndustryColor = (industry: string) => {
    switch (industry) {
      case "Media":
        return "bg-[#646d59] text-white"
      case "Finance":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#1b1f2c] to-[#646d59] text-white sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="flex items-center space-x-2 hover:text-gray-200 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <Image
                src="/images/o3p-logo-circle.png"
                alt="Our Third Place"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-xl font-light" style={{ fontFamily: "Josefin Sans, sans-serif" }}>
                OUR THIRD PLACE
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1b1f2c] mb-2">Member Recommendations</h1>
          <p className="text-gray-600">
            Discover and connect with like-minded professionals in your industry and beyond
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white/90 backdrop-blur-sm border-2 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by name, title, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Industry Filter */}
              <div className="w-full md:w-48">
                <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Interest Filter */}
              <div className="w-full md:w-48">
                <Select value={selectedInterest} onValueChange={setSelectedInterest}>
                  <SelectTrigger>
                    <SelectValue placeholder="Interest" />
                  </SelectTrigger>
                  <SelectContent>
                    {interests.map((interest) => (
                      <SelectItem key={interest} value={interest}>
                        {interest}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedIndustry !== "All Industries" || selectedInterest !== "All Interests" || searchTerm) && (
              <div className="flex flex-wrap gap-2 mt-4">
                {searchTerm && (
                  <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-800">
                    Search: "{searchTerm}"
                    <button onClick={() => setSearchTerm("")} className="ml-2 hover:text-blue-600">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {selectedIndustry !== "All Industries" && (
                  <Badge variant="outline" className="bg-green-50 border-green-200 text-green-800">
                    Industry: {selectedIndustry}
                    <button onClick={() => setSelectedIndustry("All Industries")} className="ml-2 hover:text-green-600">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {selectedInterest !== "All Interests" && (
                  <Badge variant="outline" className="bg-yellow-50 border-yellow-200 text-yellow-800">
                    Interest: {selectedInterest}
                    <button onClick={() => setSelectedInterest("All Interests")} className="ml-2 hover:text-yellow-600">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredMembers.length}</span> recommended members
          </p>
        </div>

        {/* Member Grid */}
        {filteredMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <Card
                key={member.id}
                className="bg-white/90 backdrop-blur-sm border-2 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                onClick={() => setSelectedMember(member)}
              >
                <CardContent className="p-6">
                  {/* Header with Avatar and Match */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={member.avatar || "/placeholder.svg"}
                        alt={member.name}
                        width={48}
                        height={48}
                        className="rounded-full border-2 border-white shadow-md"
                      />
                      <div>
                        <h3 className="font-semibold text-[#1b1f2c] group-hover:text-[#646d59] transition-colors">
                          {member.name}
                        </h3>
                        <p className="text-sm text-gray-600">{member.title}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{member.matchPercentage}%</div>
                      <div className="text-xs text-gray-500">match</div>
                    </div>
                  </div>

                  {/* Company and Location */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Building className="w-4 h-4 mr-2" />
                      <span>{member.company}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{member.location}</span>
                    </div>
                  </div>

                  {/* Industry and Connection Status */}
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={getIndustryColor(member.industry)}>{member.industry}</Badge>
                    <Badge className={getConnectionStatusColor(member.connectionStatus)}>
                      {getConnectionStatusText(member.connectionStatus)}
                    </Badge>
                  </div>

                  {/* Interests */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {member.interests.slice(0, 3).map((interest, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-gray-300 text-gray-600">
                          {interest}
                        </Badge>
                      ))}
                      {member.interests.length > 3 && (
                        <Badge variant="outline" className="text-xs border-gray-300 text-gray-600">
                          +{member.interests.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{member.mutualConnections} mutual</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{member.eventsAttended} events</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    {member.connectionStatus === "available" && (
                      <Button
                        size="sm"
                        className="flex-1 bg-[#1b1f2c] hover:bg-[#1b1f2c]/90 text-white"
                        onClick={(e) => {
                          e.stopPropagation()
                          // Handle connect action
                        }}
                      >
                        <UserPlus className="w-4 h-4 mr-1" />
                        Connect
                      </Button>
                    )}
                    {member.connectionStatus === "connected" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
                        onClick={(e) => {
                          e.stopPropagation()
                          // Handle message action
                        }}
                      >
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Message
                      </Button>
                    )}
                    {member.connectionStatus === "pending" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-yellow-300 text-yellow-700 hover:bg-yellow-50 bg-transparent"
                        disabled
                      >
                        <Users className="w-4 h-4 mr-1" />
                        Pending
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent"
                      onClick={(e) => {
                        e.stopPropagation()
                        // Handle save action
                      }}
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-white/90 backdrop-blur-sm border-2 shadow-lg">
            <CardContent className="p-12 text-center">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No members found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or filters to find more recommendations.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedIndustry("All Industries")
                  setSelectedInterest("All Interests")
                }}
                variant="outline"
                className="border-gray-300"
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Member Detail Modal */}
        {selectedMember && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={selectedMember.avatar || "/placeholder.svg"}
                      alt={selectedMember.name}
                      width={64}
                      height={64}
                      className="rounded-full border-4 border-white shadow-lg"
                    />
                    <div>
                      <CardTitle className="text-2xl text-gray-900">{selectedMember.name}</CardTitle>
                      <p className="text-gray-600">{selectedMember.title}</p>
                      <p className="text-gray-500">{selectedMember.company}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedMember(null)}
                    className="border-gray-300"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Match and Status */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{selectedMember.matchPercentage}%</div>
                    <div className="text-sm text-gray-600">Match Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{selectedMember.mutualConnections}</div>
                    <div className="text-sm text-gray-600">Mutual Connections</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-600">{selectedMember.eventsAttended}</div>
                    <div className="text-sm text-gray-600">Events Attended</div>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
                  <p className="text-gray-600">{selectedMember.bio}</p>
                </div>

                {/* Industry and Location */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Industry</h4>
                    <Badge className={getIndustryColor(selectedMember.industry)}>{selectedMember.industry}</Badge>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Location</h4>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{selectedMember.location}</span>
                    </div>
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Interests & Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.interests.map((interest, index) => (
                      <Badge key={index} variant="outline" className="border-gray-300 text-gray-600">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Badges */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Community Badges</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.badges.map((badge, index) => (
                      <Badge key={index} className="bg-yellow-100 text-yellow-800">
                        <Award className="w-3 h-3 mr-1" />
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Member Since */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Member Since</h4>
                  <p className="text-gray-600">
                    {new Date(selectedMember.joinedDate).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4 border-t">
                  {selectedMember.connectionStatus === "available" && (
                    <Button className="flex-1 bg-[#1b1f2c] hover:bg-[#1b1f2c]/90 text-white">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Send Connection Request
                    </Button>
                  )}
                  {selectedMember.connectionStatus === "connected" && (
                    <Button className="flex-1 bg-[#646d59] hover:bg-[#646d59]/90 text-white">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  )}
                  {selectedMember.connectionStatus === "pending" && (
                    <Button className="flex-1 bg-transparent" variant="outline" disabled>
                      <Users className="w-4 h-4 mr-2" />
                      Connection Pending
                    </Button>
                  )}
                  <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                  <Button variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
