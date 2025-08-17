"use client"

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Users,
  MapPin,
  Star,
  GraduationCap,
  User,
  Settings,
  UserPlus,
  ChefHat,
  Building,
  HelpCircle,
  Menu,
  X,
  ChevronDown,
  BriefcaseIcon,
  Crown,
  Gift,
  Network,
  BookOpen,
  Mail,
  Linkedin,
  DollarSign,
  Camera,
  Heart,
  ExternalLink,
  MessageSquare,
  Coffee,
  Target,
  CheckCircle,
  Clock,
  Copy,
  Building2,
  Briefcase,
} from "lucide-react"
import { Footer } from "@/components/footer"

type Profile = { // real user data will be stored in the profiles table
  user_id: string;
  full_name: string | null;
  city: string | null;
  bio: string | null;
  linkedin_url: string | null;
  company?: string | null; // only if this column exists
  title?: string | null;   // only if this column exists
  avatar_url?: string | null; // if you store this
};

// Mock user data
const userData = {
  name: "Sarah Chen",
  profilePicture: "/images/user-headshot.jpg",
  company: "TechFlow Solutions",
  title: "Marketing Director",
  subCommunities: ["Media Professionals", "Finance Network", "Marketing Leaders"],
}

// Mock data for events
const upcomingEvents = [
  {
    id: 1,
    title: "Media Mavens Mixer",
    date: "2024-02-15",
    time: "7:30 PM",
    location: "The Smith, NYC",
    neighborhood: "Midtown",
    attendees: 6,
    maxAttendees: 8,
    priceRange: "$$",
    industry: "Media",
    subIndustry: "Marketing",
    host: "Katherine Chen",
    description: "Join fellow marketing professionals for an evening of networking and industry insights.",
    imageUrl: "/placeholder.svg?height=200&width=300",
    userRegistered: true,
    femaleOwned: true,
    bipocOwned: false,
  },
  {
    id: 2,
    title: "Finance Leaders Lunch",
    date: "2024-02-18",
    time: "12:00 PM",
    location: "Gramercy Tavern, NYC",
    neighborhood: "Gramercy",
    attendees: 4,
    maxAttendees: 6,
    priceRange: "$$$",
    industry: "Finance",
    subIndustry: "Investment Banking",
    host: "Michael Rodriguez",
    description: "Intimate lunch discussion about current market trends and career development.",
    imageUrl: "/placeholder.svg?height=200&width=300",
    userRegistered: false,
    femaleOwned: false,
    bipocOwned: true,
  },
]

const recentEvents = [
  {
    id: 3,
    title: "Finance Leaders Networking Dinner",
    date: "2024-02-10",
    time: "7:00 PM",
    location: "The Capital Grille, Downtown",
    neighborhood: "Downtown",
    attendees: 8,
    maxAttendees: 8,
    priceRange: "$$$",
    industry: "Finance",
    subIndustry: "Investment Banking",
    host: "Katherine Martinez",
    description: "An incredible evening of networking with finance professionals.",
    imageUrl: "/images/intimate-conversation.jpg",
    userAttended: true,
    femaleOwned: false,
    bipocOwned: true,
    userRating: 5.0,
    newConnections: 3,
  },
]

// Network connections data
const networkConnections = [
  {
    id: 1,
    name: "Michael Chen",
    title: "Investment Banking VP",
    company: "Goldman Sachs",
    industry: "Finance",
    connectionDate: "2024-01-15",
    mutualConnections: 3,
    avatar: "/images/user-headshot.jpg",
    linkedin: "linkedin.com/in/michaelchen",
    email: "michael.chen@gs.com",
  },
  {
    id: 2,
    name: "Emily Rodriguez",
    title: "Marketing Director",
    company: "Netflix",
    industry: "Media",
    connectionDate: "2024-01-10",
    mutualConnections: 5,
    avatar: "/images/user-headshot.jpg",
    linkedin: "linkedin.com/in/emilyrodriguez",
    email: "emily.rodriguez@netflix.com",
  },
  {
    id: 3,
    name: "David Kim",
    title: "Creative Director",
    company: "Ogilvy",
    industry: "Media",
    connectionDate: "2024-01-08",
    mutualConnections: 2,
    avatar: "/images/user-headshot.jpg",
    linkedin: "linkedin.com/in/davidkim",
    email: "david.kim@ogilvy.com",
  },
  {
    id: 4,
    name: "Jessica Park",
    title: "Portfolio Manager",
    company: "BlackRock",
    industry: "Finance",
    connectionDate: "2024-01-05",
    mutualConnections: 4,
    avatar: "/images/user-headshot.jpg",
    linkedin: "linkedin.com/in/jessicapark",
    email: "jessica.park@blackrock.com",
  },
]

// Enhanced referrals data with rewards system
const referrals = [
  {
    id: 1,
    name: "Alex Thompson",
    email: "alex.thompson@gmail.com",
    status: "joined",
    joinDate: "2024-01-20",
    industry: "Finance",
    referralDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria.garcia@yahoo.com",
    status: "pending",
    inviteDate: "2024-01-18",
    industry: "Media",
    referralDate: "2024-01-18",
  },
  {
    id: 3,
    name: "James Wilson",
    email: "james.wilson@outlook.com",
    status: "joined",
    joinDate: "2024-01-12",
    industry: "Finance",
    referralDate: "2024-01-08",
  },
  {
    id: 4,
    name: "Sarah Kim",
    email: "sarah.kim@gmail.com",
    status: "joined",
    joinDate: "2024-01-25",
    industry: "Media",
    referralDate: "2024-01-20",
  },
  {
    id: 5,
    name: "Robert Chen",
    email: "robert.chen@outlook.com",
    status: "joined",
    joinDate: "2024-02-01",
    industry: "Finance",
    referralDate: "2024-01-28",
  },
  {
    id: 6,
    name: "Lisa Park",
    email: "lisa.park@yahoo.com",
    status: "joined",
    joinDate: "2024-02-05",
    industry: "Media",
    referralDate: "2024-02-01",
  },
  {
    id: 7,
    name: "David Martinez",
    email: "david.martinez@gmail.com",
    status: "joined",
    joinDate: "2024-02-08",
    industry: "Finance",
    referralDate: "2024-02-03",
  },
]

// Referral rewards system
const referralRewards = [
  {
    id: 1,
    milestone: 5,
    title: "Community Starter",
    description: "Exclusive O3P branded merchandise package",
    icon: Gift,
    color: "bg-blue-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-800",
    borderColor: "border-blue-200",
    achieved: true,
    achievedDate: "2024-01-25",
  },
  {
    id: 2,
    milestone: 10,
    title: "Free Month of Membership",
    description: "One month of O3P membership completely free",
    icon: Crown,
    color: "bg-yellow-500",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-800",
    borderColor: "border-yellow-200",
    achieved: false,
    achievedDate: null,
  },
  {
    id: 3,
    milestone: 25,
    title: "VIP Dinner Host",
    description: "Host your own exclusive VIP dinner event",
    icon: Star,
    color: "bg-green-500",
    bgColor: "bg-green-50",
    textColor: "text-green-800",
    borderColor: "border-green-200",
    achieved: false,
    achievedDate: null,
  },
]

const connectOptions = [
  { icon: MessageSquare, label: "Slack", color: "bg-blue-50 border-blue-200 text-blue-800" },
  { icon: Linkedin, label: "LinkedIn Messaging", color: "bg-blue-50 border-blue-200 text-blue-800" },
  { icon: Mail, label: "Email", color: "bg-green-50 border-green-200 text-green-800" },
  { icon: Coffee, label: "Open to In Person Meet Ups", color: "bg-gray-50 border-gray-200 text-gray-800" },
]

export default function DashboardPage() {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [showReferralModal, setShowReferralModal] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }
      setSession(session);

      // Fetch profile
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", session.user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
      } else {
        setProfile(profile);
      }
      setLoading(false);
    };

    getSession();
  }, [supabase, router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    if (isDropdownOpen) setIsDropdownOpen(false)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  // Referral system calculations
  const totalReferrals = referrals.filter((ref) => ref.status === "joined").length
  const pendingReferrals = referrals.filter((ref) => ref.status === "pending").length
  const nextReward = referralRewards.find((reward) => !reward.achieved && totalReferrals < reward.milestone)
  const referralsToNextReward = nextReward ? nextReward.milestone - totalReferrals : 0
  const achievedRewards = referralRewards.filter((reward) => reward.achieved)
  const referralLink = "https://ourthirdplace.com/join?ref=sarah-chen-2024"

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  const nextDinner = upcomingEvents.find((event) => event.userRegistered)
  const previousDinner = recentEvents[0]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#1b1f2c] to-[#646d59] text-white sticky top-0 z-50">
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
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-1 hover:text-gray-200 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Account</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg py-1 z-50">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Profile
                    </Link>
                    <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Settings
                    </Link>
                    <Link href="/refer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Refer Friends
                    </Link>
                    <Link
                      href="/dashboard/host-signin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Host a Dinner
                    </Link>
                    <Link href="/chapter" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Start a New Chapter
                    </Link>
                    <Link href="/help" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Help
                    </Link>
                  </div>
                )}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button onClick={toggleMenu} className="md:hidden p-2 hover:bg-white/10 transition-colors">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/20">
              <div className="flex flex-col space-y-2 mt-4">
                <Link
                  href="/profile"
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-white/10 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>My Profile</span>
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-white/10 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </Link>
                <Link
                  href="/refer"
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-white/10 transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Refer Friends</span>
                </Link>
                <Link
                  href="/dashboard/host-signin"
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-white/10 transition-colors"
                >
                  <ChefHat className="w-4 h-4" />
                  <span>Host a Dinner</span>
                </Link>
                <Link
                  href="/chapter"
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-white/10 transition-colors"
                >
                  <Building className="w-4 h-4" />
                  <span>Start a New Chapter</span>
                </Link>
                <Link
                  href="/help"
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-white/10 transition-colors"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Help</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1b1f2c] mb-2">Welcome back, {userData.name}!</h1>
          <p className="text-gray-600">Ready to connect with your professional community?</p>
        </div>

        {/* Dashboard Grid - First Row (3 boxes) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Box 1: My Profile */}
          <Card className="bg-white/90 backdrop-blur-sm border-2 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 uppercase">
                <User className="w-5 h-5" />
                <span>MY PROFILE</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Profile Picture and Basic Info */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Image
                      src={userData.profilePicture || "/placeholder.svg"}
                      alt={userData.name}
                      width={60}
                      height={60}
                      className="rounded-full border-4 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#1b1f2c]">{userData.name}</h3>
                    <p className="text-sm text-gray-600 flex items-center">
                      <Briefcase className="w-3 h-3 mr-1" />
                      {userData.title}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <Building2 className="w-3 h-3 mr-1" />
                      {userData.company}
                    </p>
                  </div>
                </div>

                {/* Sub Communities */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Sub Communities:</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-[#646d59] text-white">
                      <Image
                        src="/images/media-dinner-club-logo.png"
                        alt="Media"
                        width={12}
                        height={12}
                        className="rounded-full mr-1"
                      />
                      Media Professionals
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800">
                      <Image
                        src="/images/finance-dinner-club-logo.png"
                        alt="Finance"
                        width={12}
                        height={12}
                        className="rounded-full mr-1"
                      />
                      Finance Network
                    </Badge>
                    <Badge className="bg-gray-100 text-gray-800">Marketing Leaders</Badge>
                  </div>
                </div>

                {/* Ways to Connect with Me */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Ways to Connect with Me:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {connectOptions.map((option, index) => (
                      <Badge key={index} variant="outline" className={`${option.color} text-xs justify-center py-1`}>
                        <option.icon className="w-3 h-3 mr-1" />
                        {option.label}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <User className="w-3 h-3 mr-1" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Settings className="w-3 h-3 mr-1" />
                    Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Box 2: My Supercharged Network */}
          <Card className="bg-white/90 backdrop-blur-sm border-2 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 uppercase">
                <Network className="w-5 h-5" />
                <span>MY SUPERCHARGED NETWORK</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                    <div className="text-2xl font-bold text-blue-900">12</div>
                    <div className="text-xs text-blue-600">Dinners Attended</div>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                    <div className="text-2xl font-bold text-green-900">47</div>
                    <div className="text-xs text-green-600">O3P Media Network Connections</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-[#1b1f2c] mb-3">Recent Connections</h3>
                  <div className="space-y-3">
                    {networkConnections.slice(0, 4).map((connection) => (
                      <div key={connection.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                        <Image
                          src={connection.avatar || "/placeholder.svg"}
                          alt={connection.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-[#1b1f2c] text-sm">{connection.name}</p>
                          <p className="text-xs text-gray-600">{connection.title}</p>
                          <p className="text-xs text-gray-500">{connection.company}</p>
                        </div>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="ghost" className="p-1">
                            <Linkedin className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="p-1">
                            <Mail className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-[#646d59] hover:bg-[#646d59]/90 text-white">View All Connections</Button>
              </div>
            </CardContent>
          </Card>

          {/* Box 3: Next Dinner | Previous Dinner */}
          <Card className="bg-white/90 backdrop-blur-sm border-2 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 uppercase">
                <Calendar className="w-5 h-5" />
                <span>DINNERS</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Next Dinner */}
                {nextDinner && (
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-500" />
                      Your Next Dinner
                    </h3>
                    <Card
                      className="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 hover:shadow-md transition-all duration-300 group cursor-pointer"
                      onClick={() => setSelectedEvent(nextDinner)}
                    >
                      <CardContent className="p-3">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex flex-wrap gap-1">
                            <Badge className="bg-[#646d59] text-white text-xs">{nextDinner.industry}</Badge>
                            {nextDinner.femaleOwned && (
                              <Badge className="bg-pink-500 text-white text-xs">Female Owned</Badge>
                            )}
                            {nextDinner.bipocOwned && (
                              <Badge className="bg-purple-500 text-white text-xs">BIPOC Owned</Badge>
                            )}
                          </div>
                        </div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">{nextDinner.title}</h4>
                        <div className="space-y-1 text-xs text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            <span>
                              {nextDinner.date} at {nextDinner.time}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            <span>{nextDinner.location}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <div className="flex space-x-2 mt-2">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Linkedin className="w-3 h-3 mr-1" />
                        Share to LinkedIn
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Camera className="w-3 h-3 mr-1" />
                        Share to IG
                      </Button>
                    </div>
                  </div>
                )}

                {/* Previous Dinner */}
                {previousDinner && (
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center">
                      <Star className="w-4 h-4 mr-1 text-[#646d59]" />
                      Most Recent Dinner
                    </h3>
                    <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 hover:shadow-md transition-all duration-300 group">
                      <CardContent className="p-3">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex flex-wrap gap-1">
                            <Badge className="bg-blue-100 text-blue-800 text-xs">{previousDinner.industry}</Badge>
                            {previousDinner.bipocOwned && (
                              <Badge className="bg-purple-500 text-white text-xs">BIPOC Owned</Badge>
                            )}
                          </div>
                        </div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">{previousDinner.title}</h4>
                        <div className="space-y-1 text-xs text-gray-600 mb-2">
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            <span>
                              {previousDinner.date} at {previousDinner.time}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            <span>{previousDinner.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs pt-2 border-t border-green-200">
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                              <span className="text-gray-600">You rated: {previousDinner.userRating}</span>
                            </div>
                            <div className="flex items-center">
                              <Heart className="w-3 h-3 text-red-400 fill-current mr-1" />
                              <span className="text-gray-600">{previousDinner.newConnections} new connections</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Linkedin className="w-3 h-3 mr-1" />
                        LinkedIn
                      </Button>
                      <Button size="sm" variant="outline">
                        <Camera className="w-3 h-3 mr-1" />
                        Instagram
                      </Button>
                    </div>
                  </div>
                )}

                <Button className="w-full bg-[#646d59] hover:bg-[#646d59]/90 text-white" asChild>
                  <Link href="/events">View All Events</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Second Row (2 boxes) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Box 4: O3P Resources */}
          <Card className="bg-white/90 backdrop-blur-sm border-2 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 uppercase">
                <BookOpen className="w-5 h-5" />
                <span>O3P RESOURCES</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/jobs">
                    <BriefcaseIcon className="w-4 h-4 mr-2" />
                    Browse Open Roles
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/savory-sessions">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Savory Sessions Sign Up
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/coaching">
                    <User className="w-4 h-4 mr-2" />
                    1:1 Coaching
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/community-guidelines">
                    <Users className="w-4 h-4 mr-2" />
                    Community Guidelines
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/member-directory">
                    <Network className="w-4 h-4 mr-2" />
                    Member Directory
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/member-recommendations">
                    <Users className="w-4 h-4 mr-2" />
                    Member Recommendations
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/events-calendar">
                    <Calendar className="w-4 h-4 mr-2" />
                    Events Calendar
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/discount-codes">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Discount Codes
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Box 5: Referrals */}
          <Card className="bg-white/90 backdrop-blur-sm border-2 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 uppercase">
                <UserPlus className="w-5 h-5" />
                <span>REFERRALS</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Current Progress */}
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-none">
                  <div className="text-2xl font-bold text-green-900">{totalReferrals}</div>
                  <div className="text-sm text-green-600">Successful Referrals</div>
                  {pendingReferrals > 0 && <div className="text-xs text-gray-500 mt-1">{pendingReferrals} pending</div>}
                </div>

                {/* Next Reward Progress */}
                {nextReward && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-yellow-800 flex items-center text-sm">
                        <Target className="w-4 h-4 mr-1" />
                        Next Reward
                      </h4>
                      <Badge className="bg-yellow-500 text-white text-xs">{referralsToNextReward} more needed</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className={`p-1 rounded-full ${nextReward.color} text-white`}>
                          <nextReward.icon className="w-3 h-3" />
                        </div>
                        <span className="font-medium text-sm">{nextReward.title}</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full">
                        <div
                          className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(totalReferrals / nextReward.milestone) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 text-center">
                        {totalReferrals} of {nextReward.milestone} referrals
                      </div>
                    </div>
                  </div>
                )}

                {/* Recent Referrals */}
                <div>
                  <h4 className="font-semibold text-[#1b1f2c] mb-3 text-sm">Recent Referrals</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {referrals.slice(0, 3).map((referral) => (
                      <div key={referral.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                        <div>
                          <p className="font-medium text-[#1b1f2c] text-sm">{referral.name}</p>
                          <p className="text-xs text-gray-500">{referral.industry}</p>
                        </div>
                        <Badge
                          variant={referral.status === "joined" ? "default" : "secondary"}
                          className={
                            referral.status === "joined"
                              ? "bg-green-100 text-green-800 text-xs"
                              : "bg-yellow-100 text-yellow-800 text-xs"
                          }
                        >
                          {referral.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  className="w-full bg-[#1b1f2c] hover:bg-[#1b1f2c]/90 text-white"
                  onClick={() => setShowReferralModal(true)}
                >
                  <Gift className="w-4 h-4 mr-2" />
                  Invite Friends & Earn Rewards
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Referral Modal */}
        {showReferralModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-gray-900 flex items-center">
                    <Gift className="w-6 h-6 mr-2" />
                    Invite Friends & Earn Rewards
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowReferralModal(false)}
                    className="border-gray-300"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Current Progress */}
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <div className="text-3xl font-bold text-green-900 mb-2">{totalReferrals}</div>
                  <div className="text-lg text-green-700 mb-4">Successful Referrals</div>
                  {nextReward && (
                    <div className="bg-white/80 rounded-lg p-3">
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>{referralsToNextReward} more referrals</strong> to unlock:
                      </p>
                      <div className="flex items-center justify-center space-x-2">
                        <div className={`p-2 rounded-full ${nextReward.color} text-white`}>
                          <nextReward.icon className="w-4 h-4" />
                        </div>
                        <span className="font-semibold text-gray-900">{nextReward.title}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Referral Link */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">Your Referral Link</h3>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={referralLink}
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                    />
                    <Button
                      onClick={copyReferralLink}
                      className={`px-4 py-2 ${
                        copiedLink ? "bg-green-500 hover:bg-green-600" : "bg-[#1b1f2c] hover:bg-[#1b1f2c]/90"
                      } text-white`}
                    >
                      {copiedLink ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  {copiedLink && <p className="text-sm text-green-600">Link copied to clipboard!</p>}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-800">How It Works</span>
                  </div>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Share your unique referral link with friends</li>
                    <li>• They join Our Third Place using your link</li>
                    <li>• You earn rewards for each successful referral</li>
                    <li>• Track your progress and unlock exclusive benefits</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Event Detail Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-gray-900">{selectedEvent.title}</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedEvent(null)}
                    className="border-gray-300"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Badge className="bg-[#646d59] text-white">{selectedEvent.industry}</Badge>
                  {selectedEvent.femaleOwned && <Badge className="ml-2 bg-pink-500 text-white">Female Owned</Badge>}
                  {selectedEvent.bipocOwned && <Badge className="ml-2 bg-purple-500 text-white">BIPOC Owned</Badge>}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-3" />
                    <div>
                      <p className="font-medium">Date & Time</p>
                      <p className="text-sm">
                        {selectedEvent.date} at {selectedEvent.time}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm">{selectedEvent.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-3" />
                    <div>
                      <p className="font-medium">Attendees</p>
                      <p className="text-sm">
                        {selectedEvent.attendees}/{selectedEvent.maxAttendees} spots filled
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">About This Event</h3>
                  <p className="text-gray-600">{selectedEvent.description}</p>
                </div>

                <div className="flex space-x-4">
                  <Button className="flex-1 bg-gradient-to-r from-[#1b1f2c] to-[#646d59] hover:from-[#1b1f2c]/90 hover:to-[#646d59]/90 text-white">
                    {selectedEvent.userRegistered ? "View Registration" : "Reserve Your Spot"}
                  </Button>
                  <Button variant="outline" className="border-gray-300 bg-transparent">
                    <Heart className="w-4 h-4 mr-2" />
                    Save Event
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Community Highlights */}
        <Card className="bg-gradient-to-r from-[#1b1f2c] to-[#646d59] text-white mt-8">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Growing Community</h2>
            <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
              Connect with 500+ media and finance professionals across NYC through intimate dinners and unique
              experiences.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <div className="text-3xl font-bold mb-2">150+</div>
                <div className="text-white/80">Dinners Hosted</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-white/80">Active Members</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">25+</div>
                <div className="text-white/80">NYC Neighborhoods</div>
              </div>
            </div>
            <Button
              size="lg"
              className="bg-white text-[#1b1f2c] hover:bg-white/90 px-8 py-3 text-lg font-semibold"
              asChild
            >
              <a href="https://instagram.com/themediadinnerclub" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-5 h-5 mr-2" />
                Follow Our Journey
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
