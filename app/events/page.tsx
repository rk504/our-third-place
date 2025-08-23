"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, MapPin, Building2, DollarSign, Camera, Utensils, Heart, Search, Filter, Clock, ArrowLeft, X, ChefHat } from 'lucide-react'
import { Footer } from "@/components/footer"
import AppHeader from "@/components/AppHeader"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
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
  // Computed fields for UI
  current_attendees?: number
  capacity?: number
  host_name?: string
  user_registered?: boolean
}

// Available event images for random selection
const eventImages = [
  "/images/20250612_mdc_brandlaunch_lowres-47_720.jpg",
  "/images/20250612_mdc_brandlaunch_lowres-37_720.jpg", 
  "/images/20250612_mdc_brandlaunch_lowres-25_720.jpg",
  "/images/20250612_mdc_brandlaunch_lowres-21_720.jpg",
  "/images/824261c4-be46-4b7e-b7d4-c9599331d348_720.jpg",
  "/images/cocktail-networking.jpg",
  "/images/dinner-toast.jpg",
  "/images/genuine-connections.jpg",
  "/images/intimate-conversation.jpg",
  "/images/media-networking-hero.jpg",
  "/images/park-picnic.jpg"
]

// Function to get random image for event
const getEventImage = (event: Event) => {
  if (event.image_url) {
    return event.image_url
  }
  
  // Use event ID to ensure consistent image selection for same event
  const eventIdNumber = parseInt(event.id.replace(/\D/g, ''), 10) || 0
  const imageIndex = eventIdNumber % eventImages.length
  return eventImages[imageIndex]
}

// Price range mappings for display
const priceRanges = {
$: "Budget Friendly ($15-30)",
$$: "Moderate ($30-50)",
$$$: "Upscale ($50-80)",
$$$$: "Fine Dining ($80+)",
Free: "Free Event",
}

export default function EventsPage() {
const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
const [searchTerm, setSearchTerm] = useState("")
const [selectedType, setSelectedType] = useState("all")
const [selectedIndustry, setSelectedIndustry] = useState("all")
const [selectedSubIndustry, setSelectedSubIndustry] = useState("all")
const [selectedCity, setSelectedCity] = useState("all")
const [events, setEvents] = useState<Event[]>([])
const [loading, setLoading] = useState(true)
const [currentUser, setCurrentUser] = useState<any>(null)
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
          const { count } = await supabase
            .from('event_registrations')
            .select('*', { count: 'exact', head: true })
            .eq('event_id', event.id)

          // Check if current user is registered
          let userRegistered = false
          if (user) {
            const { data: registration } = await supabase
              .from('event_registrations')
              .select('id')
              .eq('event_id', event.id)
              .eq('user_id', user.id)
              .single()
            
            userRegistered = !!registration
          }

          return {
            ...event,
            current_attendees: count || 0,
            capacity: 12, // Default capacity since it's not in the schema yet
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
      // Deregister user
      const { error } = await supabase
        .from('event_registrations')
        .delete()
        .eq('event_id', event.id)
        .eq('user_id', currentUser.id)

      if (error) throw error

      // Update local state
      setEvents(events.map(e => 
        e.id === event.id 
          ? { ...e, user_registered: false, current_attendees: Math.max((e.current_attendees || 1) - 1, 0) }
          : e
      ))

      toast.success('Successfully deregistered from event!')
    } else {
      // Register user
      const { error } = await supabase
        .from('event_registrations')
        .insert({
          event_id: event.id,
          user_id: currentUser.id,
          status: 'confirmed'
        })

      if (error) throw error

      // Update local state
      setEvents(events.map(e => 
        e.id === event.id 
          ? { ...e, user_registered: true, current_attendees: (e.current_attendees || 0) + 1 }
          : e
      ))

      toast.success('Successfully registered for event!')
    }
  } catch (error) {
    console.error('Registration error:', error)
    toast.error(event.user_registered ? 'Failed to deregister from event' : 'Failed to register for event')
  }
}

// Filter events based on search and filters
const filteredEvents = events.filter((event) => {
  const matchesSearch =
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.sub_industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  const matchesType = selectedType === "all" || event.type === selectedType
  const matchesIndustry = selectedIndustry === "all" || event.industry === selectedIndustry
  const matchesSubIndustry = selectedSubIndustry === "all" || event.sub_industry === selectedSubIndustry
  const matchesCity = selectedCity === "all" || event.city === selectedCity

  return matchesSearch && matchesType && matchesIndustry && matchesSubIndustry && matchesCity
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

      {/* Search and Filters */}
      <Card className="bg-white/90 backdrop-blur-sm border-2 shadow-lg mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#646d59] focus:border-transparent"
              />
            </div>

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
                <option value="networking">Networking</option>
                <option value="workshop">Workshop</option>
                <option value="brunch">Brunch</option>
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
                <option value="Marketing">Marketing</option>
                <option value="Investment Banking">Investment Banking</option>
                <option value="AdTech">AdTech</option>
                <option value="PR">PR</option>
                <option value="Fintech">Fintech</option>
                <option value="Art & Culture">Art & Culture</option>
                <option value="Wellness">Wellness</option>
                <option value="Leadership">Leadership</option>
                <option value="Private Equity">Private Equity</option>
              </select>

              {/* City Filter */}
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#646d59] focus:border-transparent text-sm"
              >
                <option value="all">All Cities</option>
                <option value="Midtown">Midtown</option>
                <option value="Gramercy">Gramercy</option>
                <option value="SoHo">SoHo</option>
                <option value="Union Square">Union Square</option>
                <option value="Chelsea">Chelsea</option>
                <option value="DUMBO">DUMBO</option>
                <option value="Midtown West">Midtown West</option>
                <option value="Flatiron">Flatiron</option>
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
                      {event.current_attendees || 0}/{event.capacity || 'TBD'} attendees
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Building2 className="w-4 h-4 mr-2" />
                    <span>{event.industry}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.sub_industry} event in {event.city}</p>

                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs text-gray-500">Hosted by {event.host_name}</div>
                  {event.user_registered && (
                    <Badge className="bg-green-100 text-green-800 text-xs">✓ Registered</Badge>
                  )}
                </div>
                <Button
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
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No events found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search terms or filters to find more events.</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedType("all")
                setSelectedIndustry("all")
                setSelectedSubIndustry("all")
                setSelectedCity("all")
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
                        {selectedEvent.current_attendees || 0} of {selectedEvent.capacity || 'TBD'} spots filled
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
    </div>

    <Footer />
  </div>
)
}
