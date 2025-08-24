"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, MapPin, Building2, DollarSign, Camera, Utensils, Heart, Filter, Clock, ArrowLeft, X, ChefHat } from 'lucide-react'
import { Footer } from "@/components/footer"
import AppHeader from "@/components/AppHeader"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import { registerForEvent, deregisterFromEvent } from "@/lib/supabase/events"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

// Types based on Supabase schema
type Event = {
  id: string // uuid
  title: string
  event_date: string // timestamptz
  city: string
  location: string
  industry: string
  sub_industry: string
  type: string
  status: string
  image_url: string | null
  created_at: string // timestamptz
  capacity: number // From database
  // Computed fields for UI
  current_attendees?: number
  host_name?: string
  user_registered?: boolean
}

// Available event images categorized by event type/industry
const eventImagesByType = {
  media: [
    "/images/media-networking-hero.jpg",
    "/images/img-1513_720.jpg",
    "/images/img_3738_720.jpg",
    "/images/img_3756_720.jpg",
    "/images/img_3728_720.jpg",
    "/images/img_3748_720.jpg",
    "/images/img_3759_720.jpg",
    "/images/20250612_mdc_brandlaunch_lowres-12_720.jpg"
  ],
  finance: [
    "/images/dinner-toast.jpg",
    "/images/genuine-connections.jpg",
    "/images/20250612_mdc_brandlaunch_lowres-21_720.jpg",
    "/images/img_0513_720.jpg",
    "/images/img_1793_720.jpg",
    "/images/img_3725__1__720.jpg",
    "/images/img_5837_720.jpg"
  ],
  networking: [
    "/images/cocktail-networking.jpg",
    "/images/824261c4-be46-4b7e-b7d4-c9599331d348_720.jpg",
    "/images/20250612_mdc_brandlaunch_lowres-5_720.jpg",
    "/images/img_2786_720.jpg",
    "/images/tezza-4130_720.jpg",
    "/images/img_3777_720.jpg",
    "/images/img_3793_720.jpg"
  ],
  default: [
    "/images/park-picnic.jpg",
    "/images/genuine-connections.jpg",
    "/images/cocktail-networking.jpg",
    "/images/image_from_ios_720.jpg"
  ]
}

// Simple deterministic hash function for stable image assignment
const simpleHash = (str: string): number => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}

// Function to get appropriate image for event - deterministic and stable
const getEventImage = (event: Event) => {
  if (event.image_url) {
    return event.image_url
  }
  
  // Determine image category based on event properties
  let imageCategory = 'default'
  if (event.industry?.toLowerCase().includes('media')) {
    imageCategory = 'media'
  } else if (event.industry?.toLowerCase().includes('finance')) {
    imageCategory = 'finance'
  } else if (event.type?.toLowerCase().includes('networking')) {
    imageCategory = 'networking'
  }
  
  // Get available images for this category
  const categoryImages = eventImagesByType[imageCategory as keyof typeof eventImagesByType] || eventImagesByType.default
  
  // Use event ID for consistent hash - this ensures same event always gets same image
  const hash = simpleHash(event.id)
  const imageIndex = hash % categoryImages.length
  
  return categoryImages[imageIndex]
}

// Price range mappings for display
const priceRanges = {
$: "Budget Friendly ($15-30)",
$$: "Moderate ($30-50)",
$$$: "Upscale ($50-80)",
$$$$: "Fine Dining ($80+)",
Free: "Free Event",
}

// Cities based on actual event data (normalized to match database values)
const cities = [
  "Amsterdam",
  "Atlanta", 
  "Austin",
  "Boca Raton / Broward County",
  "Boston",
  "Charleston",
  "Charlotte", 
  "Chicago",
  "Dallas",
  "Denver",
  "Detroit",
  "Houston",
  "Jacksonville",
  "London",
  "Los Angeles",
  "Miami",
  "Nashville",
  "New Orleans", 
  "New York",
  "New York City",
  "Orlando",
  "Philadelphia",
  "Salt Lake City",
  "San Diego",
  "San Francisco",
  "Tampa",
  "Toronto"
]

// NYC neighborhoods (what was previously called "cities")
const nycNeighborhoods = [
  "Midtown",
  "Gramercy", 
  "SoHo",
  "Union Square",
  "Chelsea",
  "DUMBO",
  "Midtown West",
  "Flatiron",
  "Lower East Side",
  "Upper East Side",
  "Upper West Side",
  "Tribeca",
  "West Village",
  "East Village",
  "Financial District"
]

export default function EventsPage() {
const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
const [selectedType, setSelectedType] = useState("all")
const [selectedIndustry, setSelectedIndustry] = useState("all")
const [selectedSubIndustry, setSelectedSubIndustry] = useState("all")
const [selectedCity, setSelectedCity] = useState("all")
const [selectedNeighborhood, setSelectedNeighborhood] = useState("all")
const [events, setEvents] = useState<Event[]>([])
const [loading, setLoading] = useState(true)
const [currentUser, setCurrentUser] = useState<any>(null)
const [showRegistrationModal, setShowRegistrationModal] = useState(false)
const [registeredEventTitle, setRegisteredEventTitle] = useState('')
const router = useRouter()
const supabase = createSupabaseBrowserClient()

// Fetch events from Supabase
useEffect(() => {
  const fetchEvents = async () => {
    try {
      // Get current user for registration status
      const { data: { user } } = await supabase.auth.getUser()
      setCurrentUser(user)

      // Fetch events with registration counts and user registration status
      console.log('=== FETCHING EVENTS ===')
      
      // First, try a simple query to test basic connectivity
      const { data: testData, error: testError } = await supabase
        .from('events')
        .select('*')
        .limit(1)
      
      console.log('Test query result:', testData, testError)
      
      const { data: eventsData, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true })

      console.log('Events data:', eventsData)
      console.log('Events error:', error)

      if (error) {
        console.error('Error fetching events:', error)
        toast.error('Failed to load events')
        return
      }

      if (!eventsData || eventsData.length === 0) {
        console.log('No events found in database')
        toast.info('No events found')
        setEvents([])
        return
      }

      console.log(`Found ${eventsData.length} events`)

      // Get registration counts for each event
      const eventsWithCounts = await Promise.all(
        (eventsData || []).map(async (event) => {
          // Count registrations - try simpler query first
          const { data: allEventRegs, error: countError } = await supabase
            .from('event_registrations')
            .select('status, cancelled_at')
            .eq('event_id', event.id)

          console.log(`All registrations for ${event.title}:`, allEventRegs, countError)
          
          // Count active registrations in JavaScript
          const count = allEventRegs?.filter(reg => 
            reg.status === 'registered'
          ).length || 0
          
          console.log(`Active registration count for ${event.title}:`, count)

          // Check if current user is registered (only confirmed registrations)
          let userRegistered = false
          if (user) {
            // First check ALL registrations for this user/event for debugging
            const { data: allRegs } = await supabase
              .from('event_registrations')
              .select('id, status, cancelled_at')
              .eq('event_id', event.id)
              .eq('user_id', user.id)

            console.log(`User registrations for event ${event.title}:`, allRegs)

            // Try a simpler query first
            const { data: registration, error: regError } = await supabase
              .from('event_registrations')
              .select('id, status, cancelled_at')
              .eq('event_id', event.id)
              .eq('user_id', user.id)
              .maybeSingle()

            console.log(`Registration query for ${event.title}:`, { registration, regError })
            
            // Check if registration is active (registered and not cancelled)
            const isActive = registration && 
              registration.status === 'registered'
            
            console.log(`Is active registration for ${event.title}:`, isActive)
            userRegistered = !!isActive
          }

          return {
            ...event,
            current_attendees: count || 0,
            host_name: 'Host', // Default host name since host info isn't in schema yet
            user_registered: userRegistered
          }
        })
      )

      console.log('Events with counts:', eventsWithCounts)
      setEvents(eventsWithCounts)
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to load events')
    } finally {
      setLoading(false)
    }
  }

  fetchEvents()
}, [supabase])



// Event registration function
const handleEventRegistration = async (event: Event) => {
  if (!currentUser) {
    toast.error('Please log in to register for events')
    router.push('/login?next=/events')
    return
  }

  if (event.current_attendees && event.capacity && event.current_attendees >= event.capacity && !event.user_registered) {
    toast.error('This event is full')
    return
  }

  try {
    if (event.user_registered) {
      // Deregister using RPC function
      await deregisterFromEvent(supabase, event.id)

      // Update local state
      setEvents(events.map(e => 
        e.id === event.id 
          ? { ...e, user_registered: false, current_attendees: Math.max((e.current_attendees || 1) - 1, 0) }
          : e
      ))

      toast.success('Successfully cancelled registration!')
    } else {
      // Register using RPC function
      await registerForEvent(supabase, event.id)

      // Update local state
      setEvents(events.map(e => 
        e.id === event.id 
          ? { ...e, user_registered: true, current_attendees: (e.current_attendees || 0) + 1 }
          : e
      ))

      // Show registration success modal
      setRegisteredEventTitle(event.title)
      setShowRegistrationModal(true)
    }
  } catch (error) {
    console.error('Registration error:', error)
    toast.error(event.user_registered ? 'Failed to cancel registration' : 'Failed to register for event')
  }
}

// Filter events based on filters (no search)
const filteredEvents = events.filter((event) => {
  // Case-insensitive type matching
  const matchesType = selectedType === "all" || event.type?.toLowerCase() === selectedType.toLowerCase()
  
  // Industry matching
  const matchesIndustry = selectedIndustry === "all" || event.industry === selectedIndustry
  
  // Sub-industry matching (handle null values)
  const matchesSubIndustry = selectedSubIndustry === "all" || event.sub_industry === selectedSubIndustry
  
  // City matching - normalize city names for comparison
  const normalizeCity = (city: string) => city?.toUpperCase().replace(/\s+/g, ' ').trim()
  const eventCityNormalized = normalizeCity(event.city || '')
  const selectedCityNormalized = normalizeCity(selectedCity)
  const matchesCity = selectedCity === "all" || eventCityNormalized === selectedCityNormalized
  
  // Neighborhood matching - check location field for NYC neighborhoods
  const matchesNeighborhood = selectedNeighborhood === "all" || 
    event.location?.toLowerCase().includes(selectedNeighborhood.toLowerCase())

  return matchesType && matchesIndustry && matchesSubIndustry && matchesCity && matchesNeighborhood
})

const getIndustryColor = (industry: string) => {
  switch (industry) {
    case "Media":
      return "bg-[#646d59] text-white"
    case "Finance":
      return "bg-blue-100 text-blue-800"
    case "Cross-Industry":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusColor = (event: Event) => {
  if (event.current_attendees && event.capacity && event.current_attendees >= event.capacity) {
    return "bg-red-100 text-red-800"
  }
  if (event.current_attendees && event.capacity && event.current_attendees >= event.capacity * 0.8) {
    return "bg-yellow-100 text-yellow-800"
  }
  return "bg-green-100 text-green-800"
}

const getStatusText = (event: Event) => {
  if (event.current_attendees && event.capacity && event.current_attendees >= event.capacity) {
    return "Full"
  }
  if (event.current_attendees && event.capacity && event.current_attendees >= event.capacity * 0.8) {
    return "Almost Full"
  }
  return "Open"
}

const getEventIcon = (type: string) => {
  switch (type) {
    case "workshop":
      return Camera
    case "brunch":
      return Clock
    case "networking":
      return Users
    default:
      return Utensils
  }
}

// Format date and time for display
const formatEventDateTime = (eventDate: string) => {
  const date = new Date(eventDate)
  const dateStr = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })
  const timeStr = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  })
  return { dateStr, timeStr }
}

if (loading) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-amber-50 to-orange-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Loading events...</h2>
      </div>
    </div>
  )
}

return (
  <div className="min-h-screen bg-gradient-to-br from-rose-100 via-amber-50 to-orange-100">
    <AppHeader />

    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="sm" asChild className="mr-4">
            <Link href="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
        <h1 className="text-4xl font-bold text-[#1b1f2c] mb-2">Upcoming Events</h1>
        <p className="text-gray-600 text-lg">
          Discover and join exclusive dinners, networking events, and experiences
        </p>
      </div>

      {/* About Our Third Place Section */}
      <Card className="bg-white/90 backdrop-blur-sm border-2 shadow-lg mb-8">
        <CardContent className="p-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold text-[#1b1f2c] mb-6">
              Redefining Networking Through Friendship
            </h2>
            
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Our Third Place is redefining networking - transforming it from a task into a joy-filled habit rooted in friendship, trust, and authenticity.
              </p>
              
              <p>
                We are a membership-based community of powerhouse women and non-binary professionals who show up as themselves, support one another, and lead with joy.
              </p>
              
              <p>
                Through our signature dinner party series, we make in-person connection effortless and enjoyable. With easy sign-up, no prep, and zero pressure to pitch, our gatherings feel more like a night out with friends than a typical networking event.
              </p>
              
              <p>
                But it doesn't end at the table. Members also connect across industries and cities through our vibrant online community and Slack space.
              </p>
              
              <p className="text-[#646d59] font-medium text-lg">
                Join us and experience what networking can feel like - natural, meaningful, and something you'll actually look forward to.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="bg-white/90 backdrop-blur-sm border-2 shadow-lg mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            {/* Filters Row */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filters:</span>
              </div>

              {/* Event Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#646d59] focus:border-transparent text-sm"
              >
                <option value="all">All Types</option>
                <option value="dinner">Dinner</option>
                <option value="lunch">Lunch</option>
                <option value="after_hours">After Hours</option>
                <option value="roundtable">Roundtable</option>
              </select>

              {/* Industry Filter */}
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#646d59] focus:border-transparent text-sm"
              >
                <option value="all">All Industries</option>
                <option value="Finance">Finance</option>
                <option value="Media">Media</option>
                <option value="Cross-Industry">Cross-Industry</option>
              </select>

              {/* Sub-Industry Filter */}
              <select
                value={selectedSubIndustry}
                onChange={(e) => setSelectedSubIndustry(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#646d59] focus:border-transparent text-sm"
              >
                <option value="all">All Sub-Industries</option>
                <option value="Streaming">Streaming</option>
                <option value="VC">VC</option>
                <option value="Investment">Investment</option>
                <option value="AdTech">AdTech</option>
                <option value="PR">PR</option>
                <option value="Networking">Networking</option>
                <option value="Marketing">Marketing</option>
                <option value="Investment Banking">Investment Banking</option>
                <option value="Fintech">Fintech</option>
              </select>

              {/* City Filter */}
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#646d59] focus:border-transparent text-sm"
              >
                <option value="all">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>

              {/* NYC Neighborhood Filter */}
              <select
                value={selectedNeighborhood}
                onChange={(e) => setSelectedNeighborhood(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#646d59] focus:border-transparent text-sm"
              >
                <option value="all">All Neighborhoods</option>
                {nycNeighborhoods.map((neighborhood) => (
                  <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredEvents.map((event) => {
          const EventIcon = getEventIcon(event.type)
          const { dateStr, timeStr } = formatEventDateTime(event.event_date)
          const isFull = event.current_attendees && event.capacity && event.current_attendees >= event.capacity
          
          return (
            <Card
              key={event.id}
              className="bg-white/90 backdrop-blur-sm border-2 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
              onClick={() => setSelectedEvent(event)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={getEventImage(event)}
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Status Badge */}
                <div className="absolute top-2 right-2">
                  <Badge className={`${getStatusColor(event)} text-xs font-medium`}>
                    {getStatusText(event)}
                  </Badge>
                </div>

                {/* Industry Badge */}
                <div className="absolute top-2 left-2">
                  <Badge className={`${getIndustryColor(event.industry)} text-xs`}>{event.industry}</Badge>
                </div>

                {/* Event Type Icon */}
                <div className="absolute bottom-2 right-2 bg-white/90 p-2 rounded-full">
                  <EventIcon className="w-4 h-4 text-[#646d59]" />
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-bold text-lg text-[#1b1f2c] mb-2 group-hover:text-[#646d59] transition-colors">
                  {event.title}
                </h3>

                <div className="space-y-2 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{dateStr} at {timeStr}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    <span>
                      {event.current_attendees || 0}/{event.capacity} attendees
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Building2 className="w-4 h-4 mr-2" />
                    <span>{event.industry}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.sub_industry} event in {event.city}</p>

          {/*       <div className="flex items-center justify-between mb-3">
                  <div className="text-xs text-gray-500">Hosted by {event.host_name}</div>
                  {event.user_registered && (
                    <Badge className="bg-green-100 text-green-800 text-xs">✓ Registered</Badge>
                  )}
                </div>
           */}      <Button
                  className={`w-full mt-3 ${
                    isFull && !event.user_registered
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : event.user_registered
                        ? "bg-green-100 hover:bg-green-200 text-green-800 border border-green-300"
                        : "bg-[#646d59] hover:bg-[#646d59]/90 text-white"
                  }`}
                  disabled={Boolean(isFull && !event.user_registered)}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleEventRegistration(event)
                  }}
                >
                  {event.user_registered
                    ? "✓ Registered - Click to Cancel"
                    : isFull
                      ? "Event Full"
                      : "Reserve Spot"}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* No Results */}
      {filteredEvents.length === 0 && (
        <Card className="bg-white/90 backdrop-blur-sm border-2 shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="text-gray-400 mb-4">
              <Filter className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No events found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters to find more events.</p>
            <Button
              onClick={() => {
                setSelectedType("all")
                setSelectedIndustry("all")
                setSelectedSubIndustry("all")
                setSelectedCity("all")
                setSelectedNeighborhood("all")
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
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
              <img
                src={getEventImage(selectedEvent)}
                alt={selectedEvent.title}
                className="w-full h-64 object-cover rounded-lg"
              />

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-3" />
                    <div>
                      <p className="font-medium">Date & Time</p>
                      <p className="text-sm">
                        {new Date(selectedEvent.event_date).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })}{" "}
                        at {formatEventDateTime(selectedEvent.event_date).timeStr}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm">{selectedEvent.location}</p>
                      <p className="text-xs text-gray-500">{selectedEvent.city}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Building2 className="w-5 h-5 mr-3" />
                    <div>
                      <p className="font-medium">Industry</p>
                      <p className="text-sm">{selectedEvent.industry}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-3" />
                    <div>
                      <p className="font-medium">Attendees</p>
                      <p className="text-sm">
                        {selectedEvent.current_attendees || 0} of {selectedEvent.capacity} spots filled
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <ChefHat className="w-5 h-5 mr-3" />
                    <div>
                      <p className="font-medium">Host</p>
                      <p className="text-sm">{selectedEvent.host_name}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Badge className={getIndustryColor(selectedEvent.industry)}>{selectedEvent.industry}</Badge>
                    {selectedEvent.sub_industry && (
                      <Badge variant="outline" className="ml-2 border-gray-300 text-gray-600">
                        {selectedEvent.sub_industry}
                      </Badge>
                    )}
                    <Badge className={`ml-2 ${getStatusColor(selectedEvent)}`}>
                      {getStatusText(selectedEvent)}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">About This Event</h3>
                <p className="text-gray-600">Join us for a {selectedEvent.sub_industry} {selectedEvent.type} in {selectedEvent.city}. This is a great opportunity to network with professionals in the {selectedEvent.industry} industry.</p>
              </div>

              <div className="flex space-x-4">
                <Button
                  className={`flex-1 ${
                    selectedEvent.current_attendees && selectedEvent.capacity && selectedEvent.current_attendees >= selectedEvent.capacity && !selectedEvent.user_registered
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : selectedEvent.user_registered
                        ? "bg-green-100 hover:bg-green-200 text-green-800 border border-green-300"
                        : "bg-gradient-to-r from-[#1b1f2c] to-[#646d59] hover:from-[#1b1f2c]/90 hover:to-[#646d59]/90 text-white"
                  }`}
                  disabled={!!(selectedEvent.current_attendees && selectedEvent.capacity && selectedEvent.current_attendees >= selectedEvent.capacity && !selectedEvent.user_registered)}
                  onClick={() => handleEventRegistration(selectedEvent)}
                >
                  {selectedEvent.user_registered
                    ? "✓ Registered - Click to Cancel Registration"
                    : selectedEvent.current_attendees && selectedEvent.capacity && selectedEvent.current_attendees >= selectedEvent.capacity
                      ? "Event Full"
                      : "Reserve Your Spot"}
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

      {/* Registration Success Modal */}
      {showRegistrationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowRegistrationModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center">
              <div className="mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">You're Registered! 🎉</h2>
              </div>
              
              <div className="mb-6">
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Successfully registered for
                </p>
                <p className="text-xl font-bold text-[#646d59] mb-4">
                  {registeredEventTitle}
                </p>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Check your dashboard for event details.</p>
                  <p>We'll send you a reminder email 48 hours before the event.</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    setShowRegistrationModal(false)
                    router.push('/dashboard')
                  }}
                  className="w-full bg-[#646d59] hover:bg-[#646d59]/90 text-white"
                >
                  View Dashboard
                </Button>
                <Button
                  onClick={() => setShowRegistrationModal(false)}
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Got it!
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

    <Footer />
  </div>
)
}
