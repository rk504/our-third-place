"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, MapPin, User, Settings, UserPlus, ChefHat, Building, HelpCircle, Menu, X, ChevronDown, DollarSign, Camera, Utensils, Heart, Search, Filter, Clock, ArrowLeft } from 'lucide-react'
import { Footer } from "@/components/footer"

// Mock data for all events
const allEvents = [
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
  imageUrl: "/images/cocktail-networking.jpg",
  userRegistered: true,
  status: "open",
  type: "dinner",
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
  imageUrl: "/images/intimate-conversation.jpg",
  userRegistered: false,
  status: "open",
  type: "dinner",
},
{
  id: 3,
  title: "AdTech After Hours",
  date: "2024-02-20",
  time: "6:00 PM",
  location: "Balthazar, NYC",
  neighborhood: "SoHo",
  attendees: 8,
  maxAttendees: 10,
  priceRange: "$$$",
  industry: "Media",
  subIndustry: "AdTech",
  host: "Sarah Kim",
  description: "Explore the latest in advertising technology while enjoying great food and company.",
  imageUrl: "/images/dinner-toast.jpg",
  userRegistered: false,
  status: "open",
  type: "networking",
},
{
  id: 4,
  title: "PR Professionals Gathering",
  date: "2024-02-22",
  time: "7:00 PM",
  location: "Union Square Cafe, NYC",
  neighborhood: "Union Square",
  attendees: 5,
  maxAttendees: 8,
  priceRange: "$$",
  industry: "Media",
  subIndustry: "PR",
  host: "Jessica Davis",
  description: "Connect with PR professionals and discuss industry best practices over dinner.",
  imageUrl: "/images/genuine-connections.jpg",
  userRegistered: false,
  status: "open",
  type: "dinner",
},
{
  id: 5,
  title: "Fintech Founders Forum",
  date: "2024-02-25",
  time: "6:30 PM",
  location: "The High Line Hotel, NYC",
  neighborhood: "Chelsea",
  attendees: 12,
  maxAttendees: 15,
  priceRange: "$$",
  industry: "Finance",
  subIndustry: "Fintech",
  host: "David Park",
  description: "Founders and leaders in fintech share insights and build connections.",
  imageUrl: "/images/park-picnic.jpg",
  userRegistered: false,
  status: "open",
  type: "networking",
},
{
  id: 6,
  title: "MoMA Art & Media Tour",
  date: "2024-02-17",
  time: "2:00 PM",
  location: "Museum of Modern Art, NYC",
  neighborhood: "Midtown",
  attendees: 15,
  maxAttendees: 20,
  priceRange: "$",
  industry: "Cross-Industry",
  subIndustry: "Art & Culture",
  host: "Amanda Liu",
  description: "Explore modern art through the lens of media and advertising.",
  imageUrl: "/images/cocktail-networking.jpg",
  userRegistered: false,
  status: "open",
  type: "workshop",
},
{
  id: 7,
  title: "Brooklyn Bridge Networking Walk",
  date: "2024-02-24",
  time: "10:00 AM",
  location: "Brooklyn Bridge, NYC",
  neighborhood: "DUMBO",
  attendees: 8,
  maxAttendees: 12,
  priceRange: "Free",
  industry: "Cross-Industry",
  subIndustry: "Wellness",
  host: "Robert Chen",
  description: "Start your weekend with a scenic walk and meaningful conversations.",
  imageUrl: "/images/park-picnic.jpg",
  userRegistered: false,
  status: "open",
  type: "brunch",
},
{
  id: 8,
  title: "Investment Banking Roundtable",
  date: "2024-02-28",
  time: "7:00 PM",
  location: "Le Bernardin, NYC",
  neighborhood: "Midtown West",
  attendees: 10,
  maxAttendees: 10,
  priceRange: "$$$$",
  industry: "Finance",
  subIndustry: "Investment Banking",
  host: "Alexandra Stone",
  description: "Exclusive dinner for senior investment banking professionals.",
  imageUrl: "/images/intimate-conversation.jpg",
  userRegistered: false,
  status: "full",
  type: "dinner",
},
{
  id: 9,
  title: "Women in Finance Brunch",
  date: "2024-03-02",
  time: "11:00 AM",
  location: "The Plaza Food Hall, NYC",
  neighborhood: "Midtown",
  attendees: 18,
  maxAttendees: 20,
  priceRange: "$$",
  industry: "Finance",
  subIndustry: "Leadership",
  host: "Maria Santos",
  description: "Empowering brunch for women leaders in finance.",
  imageUrl: "/images/genuine-connections.jpg",
  userRegistered: false,
  status: "waitlist",
  type: "brunch",
},
{
  id: 10,
  title: "Private Equity Dinner Series",
  date: "2024-03-05",
  time: "8:00 PM",
  location: "Eleven Madison Park, NYC",
  neighborhood: "Flatiron",
  attendees: 6,
  maxAttendees: 8,
  priceRange: "$$$$",
  industry: "Finance",
  subIndustry: "Private Equity",
  host: "Jonathan Wright",
  description: "Intimate dinner for private equity professionals and investors.",
  imageUrl: "/images/dinner-toast.jpg",
  userRegistered: false,
  status: "open",
  type: "dinner",
},
]

const priceRanges = {
$: "Budget Friendly ($15-30)",
$$: "Moderate ($30-50)",
$$$: "Upscale ($50-80)",
$$$$: "Fine Dining ($80+)",
Free: "Free Event",
}

export default function EventsPage() {
const [isMenuOpen, setIsMenuOpen] = useState(false)
const [isDropdownOpen, setIsDropdownOpen] = useState(false)
const [selectedEvent, setSelectedEvent] = useState<any>(null)
const [searchTerm, setSearchTerm] = useState("")
const [selectedType, setSelectedType] = useState("all")
const [selectedIndustry, setSelectedIndustry] = useState("all")
const [selectedSubIndustry, setSelectedSubIndustry] = useState("all")
const [selectedCity, setSelectedCity] = useState("all")

const toggleMenu = () => {
  setIsMenuOpen(!isMenuOpen)
  if (isDropdownOpen) setIsDropdownOpen(false)
}

const toggleDropdown = () => {
  setIsDropdownOpen(!isDropdownOpen)
}

// Filter events based on search and filters
const filteredEvents = allEvents.filter((event) => {
  const matchesSearch =
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  const matchesType = selectedType === "all" || event.type === selectedType
  const matchesIndustry = selectedIndustry === "all" || event.industry === selectedIndustry
  const matchesSubIndustry = selectedSubIndustry === "all" || event.subIndustry === selectedSubIndustry
  const matchesCity = selectedCity === "all" || event.neighborhood === selectedCity

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

const getStatusColor = (status: string) => {
  switch (status) {
    case "open":
      return "bg-green-100 text-green-800"
    case "full":
      return "bg-red-100 text-red-800"
    case "waitlist":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
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

return (
  <div className="min-h-screen bg-gradient-to-br from-rose-100 via-amber-50 to-orange-100">
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
          return (
            <Card
              key={event.id}
              className="bg-white/90 backdrop-blur-sm border-2 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
              onClick={() => setSelectedEvent(event)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={event.imageUrl || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Status Badge */}
                <div className="absolute top-2 right-2">
                  <Badge className={`${getStatusColor(event.status)} text-xs font-medium`}>
                    {event.status === "open" ? "Open" : event.status === "full" ? "Full" : "Waitlist"}
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
                    <span>
                      {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      at {event.time}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    <span>
                      {event.attendees}/{event.maxAttendees} attendees
                    </span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span>{priceRanges[event.priceRange as keyof typeof priceRanges]}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">Hosted by {event.host}</div>
                  {event.userRegistered && (
                    <Badge className="bg-yellow-100 text-yellow-800 text-xs">Registered</Badge>
                  )}
                </div>

                <Button
                  className={`w-full mt-3 ${
                    event.status === "full"
                      ? "bg-gray-400 cursor-not-allowed"
                      : event.status === "waitlist"
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-[#646d59] hover:bg-[#646d59]/90"
                  } text-white`}
                  disabled={event.status === "full"}
                >
                  {event.userRegistered
                    ? "View Registration"
                    : event.status === "full"
                      ? "Event Full"
                      : event.status === "waitlist"
                        ? "Join Waitlist"
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
                src={selectedEvent.imageUrl || "/placeholder.svg"}
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
                        {new Date(selectedEvent.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })}{" "}
                        at {selectedEvent.time}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm">{selectedEvent.location}</p>
                      <p className="text-xs text-gray-500">{selectedEvent.neighborhood}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <DollarSign className="w-5 h-5 mr-3" />
                    <div>
                      <p className="font-medium">Price Range</p>
                      <p className="text-sm">{priceRanges[selectedEvent.priceRange as keyof typeof priceRanges]}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-3" />
                    <div>
                      <p className="font-medium">Attendees</p>
                      <p className="text-sm">
                        {selectedEvent.attendees} of {selectedEvent.maxAttendees} spots filled
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <ChefHat className="w-5 h-5 mr-3" />
                    <div>
                      <p className="font-medium">Host</p>
                      <p className="text-sm">{selectedEvent.host}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Badge className={getIndustryColor(selectedEvent.industry)}>{selectedEvent.industry}</Badge>
                    {selectedEvent.subIndustry && (
                      <Badge variant="outline" className="ml-2 border-gray-300 text-gray-600">
                        {selectedEvent.subIndustry}
                      </Badge>
                    )}
                    <Badge className={`ml-2 ${getStatusColor(selectedEvent.status)}`}>
                      {selectedEvent.status === "open"
                        ? "Open"
                        : selectedEvent.status === "full"
                          ? "Full"
                          : "Waitlist"}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">About This Event</h3>
                <p className="text-gray-600">{selectedEvent.description}</p>
              </div>

              <div className="flex space-x-4">
                <Button
                  className={`flex-1 ${
                    selectedEvent.status === "full"
                      ? "bg-gray-400 cursor-not-allowed"
                      : selectedEvent.status === "waitlist"
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-gradient-to-r from-[#1b1f2c] to-[#646d59] hover:from-[#1b1f2c]/90 hover:to-[#646d59]/90"
                  } text-white`}
                  disabled={selectedEvent.status === "full"}
                >
                  {selectedEvent.userRegistered
                    ? "View Registration"
                    : selectedEvent.status === "full"
                      ? "Event Full"
                      : selectedEvent.status === "waitlist"
                        ? "Join Waitlist"
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
