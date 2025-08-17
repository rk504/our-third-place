"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/footer"
import { 
  Calendar, 
  MapPin, 
  Users, 
  Star, 
  Trophy, 
  Clock,
  Building2,
  Instagram,
  Linkedin,
  Gift,
  TrendingUp,
  ChevronRight
} from "lucide-react"

type Profile = {
  user_id: string
  full_name: string | null
  city: string | null
  bio: string | null
  linkedin_url: string | null
  company?: string | null
  title?: string | null
  avatar_url?: string | null
  role?: string | null
  membership_tier?: string | null
  instagram_handle?: string | null
  birthday?: string | null
  created_at?: string | null
  additional_places?: string[] | null
  sub_industries?: string[] | null
  finance_sub_industries?: string[] | null
} | null

type Membership = {
  user_id: string
  tier: string
  status: string
  primary_location: string
  additional_places: string[]
  current_period_end: string
} | null

type Event = {
  id: number
  title: string
  description?: string
  event_date: string
  event_time?: string
  location: string
  max_attendees?: number
  price_range?: string
  industry?: string
  sub_industry?: string
}

type EventRegistration = {
  id: number
  status: string
  created_at: string
  events?: Event[]
  // For simplified debugging - these might be direct properties
  event_id?: number
  user_id?: string
}

type DashboardData = {
  profile: Profile
  membership: Membership
  upcomingEvents: EventRegistration[]
  pastEvents: EventRegistration[]
  totalEventsAttended: number
}

export default function DashboardClient({ data }: { data: DashboardData }) {
  const { profile, membership, upcomingEvents, pastEvents, totalEventsAttended } = data
  const displayName =
    profile?.full_name ||
    profile?.company ||
    "Member"

  const memberSince = profile?.created_at 
    ? new Date(profile.created_at).toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
      })
    : null

  // Calculate days as a member
  const daysSinceMember = profile?.created_at 
    ? Math.floor((new Date().getTime() - new Date(profile.created_at).getTime()) / (1000 * 3600 * 24))
    : 0

  // Check if it's user's birthday today or soon
  const isBirthdayToday = profile?.birthday 
    ? new Date(profile.birthday).toDateString() === new Date().toDateString()
    : false

  const isBirthdaySoon = profile?.birthday 
    ? (() => {
        const today = new Date()
        const birthday = new Date(profile.birthday)
        birthday.setFullYear(today.getFullYear())
        const diffTime = birthday.getTime() - today.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays > 0 && diffDays <= 7
      })()
    : false

  // Calculate achievements
  const getAchievements = () => {
    const achievements = []
    if (totalEventsAttended >= 1) achievements.push({ name: "First Event", icon: "🎉", description: "Attended your first event!" })
    if (totalEventsAttended >= 5) achievements.push({ name: "Social Butterfly", icon: "🦋", description: "Attended 5+ events" })
    if (totalEventsAttended >= 10) achievements.push({ name: "Networking Pro", icon: "🏆", description: "Attended 10+ events" })
    if (daysSinceMember >= 30) achievements.push({ name: "30-Day Member", icon: "📅", description: "Active for 30+ days" })
    if (daysSinceMember >= 365) achievements.push({ name: "Anniversary", icon: "🎂", description: "One year member!" })
    if (profile?.bio && profile.bio.length > 50) achievements.push({ name: "Storyteller", icon: "📝", description: "Complete profile bio" })
    if (profile?.linkedin_url && profile?.instagram_handle) achievements.push({ name: "Connected", icon: "🔗", description: "All social links added" })
    return achievements
  }

  const achievements = getAchievements()

  const getMembershipBadgeColor = (tier?: string) => {
    switch (tier?.toLowerCase()) {
      case 'premium': return 'bg-yellow-100 text-yellow-800'
      case 'basic': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatEventDate = (dateString: string, timeString?: string) => {
    const date = new Date(dateString)
    const dateFormatted = date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
    return timeString ? `${dateFormatted} at ${timeString}` : dateFormatted
  }

  // Generate personalized welcome message
  const getPersonalizedWelcome = () => {
    const timeOfDay = new Date().getHours()
    let greeting = "Welcome back"
    if (timeOfDay < 12) greeting = "Good morning"
    else if (timeOfDay < 17) greeting = "Good afternoon"
    else greeting = "Good evening"

    if (isBirthdayToday) {
      return `🎉 Happy Birthday, ${displayName}! 🎂`
    }
    if (isBirthdaySoon) {
      return `${greeting}, ${displayName}! 🎈 Your birthday is coming up soon!`
    }
    if (upcomingEvents.length > 0) {
      return `${greeting}, ${displayName}! You have ${upcomingEvents.length} upcoming event${upcomingEvents.length > 1 ? 's' : ''}!`
    }
    return `${greeting}, ${displayName}!`
  }

  const getPersonalizedSubtext = () => {
    const parts = []
    if (profile?.city) parts.push(`Based in ${profile.city}`)
    if (memberSince) parts.push(`Member since ${memberSince}`)
    if (totalEventsAttended > 0) parts.push(`${totalEventsAttended} event${totalEventsAttended > 1 ? 's' : ''} attended`)
    
    const baseText = parts.length > 0 ? parts.join(" • ") + ". " : ""
    
    if (achievements.length > 0) {
      return baseText + `You've earned ${achievements.length} achievement${achievements.length > 1 ? 's' : ''}! 🌟`
    }
    return baseText + "Let's supercharge your network! 🚀"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#1b1f2c] to-[#646d59] text-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image src="/images/o3p-logo-circle.png" alt="Our Third Place" width={40} height={40} className="rounded-full" />
              <span className="text-2xl font-light" style={{ fontFamily: "Josefin Sans, sans-serif" }}>
                OUR THIRD PLACE
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/profile" className="hover:text-gray-200 transition-colors">My Profile</Link>
              <Link href="/events" className="hover:text-gray-200 transition-colors">Events</Link>
              <Link href="/help" className="hover:text-gray-200 transition-colors">Help</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Personalized welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1b1f2c] mb-2">{getPersonalizedWelcome()}</h1>
          <p className="text-gray-600 text-lg">
            {getPersonalizedSubtext()}
          </p>
          {isBirthdayToday && (
            <div className="mt-4 p-4 bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200 rounded-lg">
              <p className="text-pink-800 font-medium">🎂 It's your special day! Enjoy a complimentary drink at your next event!</p>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Events Attended</p>
                  <p className="text-2xl font-bold text-blue-900">{totalEventsAttended}</p>
                  {totalEventsAttended > 0 && (
                    <p className="text-xs text-blue-600 mt-1">
                      {totalEventsAttended >= 10 ? "Networking Pro! 🏆" : totalEventsAttended >= 5 ? "Social Butterfly! 🦋" : "Great start! 🎉"}
                    </p>
                  )}
                </div>
                <Trophy className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Upcoming Events</p>
                  <p className="text-2xl font-bold text-green-900">{upcomingEvents.length}</p>
                  {upcomingEvents.length > 0 && (
                    <p className="text-xs text-green-600 mt-1">Ready to network! ⚡</p>
                  )}
                </div>
                <Calendar className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Membership</p>
                  <p className="text-2xl font-bold text-purple-900 capitalize">
                    {membership?.tier || profile?.membership_tier || 'Basic'}
                  </p>
                  <p className="text-xs text-purple-600 mt-1">
                    {daysSinceMember >= 365 ? "Loyal member! 🎂" : daysSinceMember >= 30 ? "Established! 📅" : "Welcome! 👋"}
                  </p>
                </div>
                <Star className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600">Achievements</p>
                  <p className="text-2xl font-bold text-orange-900">{achievements.length}</p>
                  <p className="text-xs text-orange-600 mt-1">
                    {achievements.length >= 5 ? "Superstar! ⭐" : achievements.length >= 3 ? "Rising star! 🌟" : "Getting started! 🚀"}
                  </p>
                </div>
                <Gift className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile snapshot - Left column */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-2 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Your Profile</span>
                  {membership && (
                    <Badge className={getMembershipBadgeColor(membership.tier)}>
                      {membership.tier}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src={profile?.avatar_url || "/images/user-headshot.jpg"}
                      alt="Avatar"
                      width={64}
                      height={64}
                      className="rounded-full border-4 border-white shadow"
                    />
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-[#1b1f2c]">{displayName}</p>
                      <p className="text-sm text-gray-600">
                        {[profile?.title, profile?.company].filter(Boolean).join(" • ") || "—"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">{profile?.bio || "Add a short bio to complete your profile."}</p>
                    
                    {profile?.city && (
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {profile.city}
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      {profile?.linkedin_url && (
                        <Link 
                          href={profile.linkedin_url} 
                          target="_blank"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Linkedin className="w-4 h-4" />
                        </Link>
                      )}
                      {profile?.instagram_handle && (
                        <Link 
                          href={`https://instagram.com/${profile.instagram_handle}`} 
                          target="_blank"
                          className="text-pink-600 hover:text-pink-800"
                        >
                          <Instagram className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Industries */}
                  {(profile?.sub_industries || profile?.finance_sub_industries) && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Industries</p>
                      <div className="flex flex-wrap gap-1">
                        {profile?.sub_industries?.map((industry, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {industry}
                          </Badge>
                        ))}
                        {profile?.finance_sub_industries?.map((industry, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {industry}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button asChild className="w-full bg-[#1b1f2c] hover:bg-[#1b1f2c]/90">
                    <Link href="/profile">Edit Profile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Achievements Section */}
            {achievements.length > 0 && (
              <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-yellow-600" />
                    <span className="text-yellow-800">Your Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-white/70 rounded-lg border border-yellow-100">
                        <span className="text-2xl">{achievement.icon}</span>
                        <div className="flex-1">
                          <p className="font-medium text-yellow-900">{achievement.name}</p>
                          <p className="text-sm text-yellow-700">{achievement.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {achievements.length < 7 && (
                    <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
                      <p className="text-sm text-yellow-800 font-medium">
                        🎯 Keep networking to unlock more achievements!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" asChild className="w-full justify-start bg-transparent">
                  <Link href="/events">
                    <Calendar className="w-4 h-4 mr-2" />
                    Browse Events
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full justify-start bg-transparent">
                  <Link href="/member-recommendations">
                    <Users className="w-4 h-4 mr-2" />
                    Meet Members
                  </Link>
                </Button>
                {profile?.role === 'host' && (
                  <Button variant="outline" asChild className="w-full justify-start bg-transparent">
                    <Link href="/dashboard/host-signin">
                      <Building2 className="w-4 h-4 mr-2" />
                      Host Dashboard
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Events and Activity - Right columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Upcoming Events</span>
                  </span>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/events" className="text-[#1b1f2c]">
                      View All <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingEvents.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingEvents.map((registration) => {
                      // Handle both complex and simple event data structures
                      const event = registration.events?.[0]
                      return (
                        <div key={registration.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-[#1b1f2c]">
                              {event?.title || `Event Registration #${registration.id}`}
                            </h3>
                            <Badge className="bg-green-100 text-green-800">{registration.status}</Badge>
                          </div>
                          <div className="space-y-1 text-sm text-gray-600">
                            {event?.event_date && (
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2" />
                                {formatEventDate(event.event_date, event.event_time)}
                              </div>
                            )}
                            {event?.location && (
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2" />
                                {event.location}
                              </div>
                            )}
                            {!event && (
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                Event ID: {registration.event_id || 'Unknown'}
                              </div>
                            )}
                          </div>
                          {event?.description && (
                            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                              {event.description}
                            </p>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No upcoming events yet</p>
                    <Button asChild>
                      <Link href="/events">Browse Events</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {pastEvents.length > 0 ? (
                  <div className="space-y-3">
                    {pastEvents.map((registration) => {
                      const event = registration.events?.[0]
                      return (
                        <div key={registration.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {event?.title ? `Attended "${event.title}"` : `Event Registration #${registration.id}`}
                            </p>
                            <p className="text-xs text-gray-500">
                              {event?.event_date 
                                ? `${formatEventDate(event.event_date)} • ${event.location || 'Location TBD'}` 
                                : `Registered on ${new Date(registration.created_at).toLocaleDateString()}`
                              }
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <TrendingUp className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">No recent activity</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Member Journey */}
            <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                  <span className="text-indigo-800">Your Journey</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-white/70 rounded-lg">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-indigo-900">
                        Joined Our Third Place
                      </p>
                      <p className="text-xs text-indigo-600">
                        {memberSince} • {daysSinceMember} days ago
                      </p>
                    </div>
                  </div>
                  
                  {totalEventsAttended > 0 && (
                    <div className="flex items-center space-x-3 p-3 bg-white/70 rounded-lg">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-indigo-900">
                          First Event Attended
                        </p>
                        <p className="text-xs text-indigo-600">
                          {totalEventsAttended} event{totalEventsAttended > 1 ? 's' : ''} total
                        </p>
                      </div>
                    </div>
                  )}

                  {profile?.bio && profile.bio.length > 0 && (
                    <div className="flex items-center space-x-3 p-3 bg-white/70 rounded-lg">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-indigo-900">
                          Profile Completed
                        </p>
                        <p className="text-xs text-indigo-600">
                          Bio, social links, and more
                        </p>
                      </div>
                    </div>
                  )}

                  {upcomingEvents.length > 0 && (
                    <div className="flex items-center space-x-3 p-3 bg-white/70 rounded-lg">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-indigo-900">
                          Next Event Coming Up
                        </p>
                        <p className="text-xs text-indigo-600">
                          {upcomingEvents.length} event{upcomingEvents.length > 1 ? 's' : ''} registered
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 p-3 bg-indigo-100 rounded-lg">
                  <p className="text-sm text-indigo-800 font-medium">
                    🌟 You're making great progress in building your network!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Membership Info */}
            {membership && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Gift className="w-5 h-5" />
                    <span>Membership Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Plan</p>
                      <p className="text-lg font-semibold capitalize">{membership.tier}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Status</p>
                      <Badge className={membership.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {membership.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Primary Location</p>
                      <p className="text-sm">{membership.primary_location}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Current Period Ends</p>
                      <p className="text-sm">
                        {membership.current_period_end ? new Date(membership.current_period_end).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        }) : 'N/A'}
                      </p>
                    </div>
                  </div>
                  {membership?.additional_places && membership.additional_places.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Additional Places</p>
                      <div className="flex flex-wrap gap-1">
                        {membership.additional_places.map((place, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {place}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
