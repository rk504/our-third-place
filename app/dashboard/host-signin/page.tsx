"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  Users,
  MapPin,
  Clock,
  Edit,
  Trash2,
  Mail,
  Share2,
  Plus,
  ChefHat,
  HelpCircle,
  Menu,
  X,
  ChevronDown,
  User,
  Settings,
  UserPlus,
  Instagram,
  Linkedin,
  Star,
  Camera,
} from "lucide-react"
import { Footer } from "@/components/footer"
import { useState } from "react"

export default function HostSignInPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newDinner, setNewDinner] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    maxAttendees: "",
    industry: "Finance",
    priceRange: "",
    description: "",
  })

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    if (isDropdownOpen) setIsDropdownOpen(false)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleAddDinner = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit to an API
    console.log("Adding new dinner:", newDinner)
    setShowAddForm(false)
    setNewDinner({
      title: "",
      date: "",
      time: "",
      location: "",
      maxAttendees: "",
      industry: "Finance",
      priceRange: "",
      description: "",
    })
  }

  const upcomingDinners = [
    {
      id: 1,
      title: "Finance Leaders Networking Dinner",
      date: "March 20, 2024",
      time: "7:00 PM",
      location: "The Capital Grille, Downtown San Diego",
      attendees: 8,
      maxAttendees: 12,
      industry: "Finance",
      priceRange: "$75-100",
      status: "confirmed",
    },
    {
      id: 2,
      title: "Investment Banking Professionals Meetup",
      date: "April 5, 2024",
      time: "6:30 PM",
      location: "Addison Del Mar",
      attendees: 6,
      maxAttendees: 10,
      industry: "Finance",
      priceRange: "$100-125",
      status: "confirmed",
    },
  ]

  const pastDinners = [
    {
      id: 1,
      title: "Tech Entrepreneurs Dinner",
      date: "February 28, 2024",
      location: "Cucina Urbana",
      attendees: 10,
      rating: 4.8,
      industry: "Technology",
      feedback: "Amazing connections made!",
    },
    {
      id: 2,
      title: "Healthcare Leaders Lunch",
      date: "February 15, 2024",
      location: "George's at the Cove",
      attendees: 8,
      rating: 4.9,
      industry: "Healthcare",
      feedback: "Great venue and conversations",
    },
    {
      id: 3,
      title: "Media Professionals Mixer",
      date: "January 30, 2024",
      location: "Lionfish Modern Coastal Cuisine",
      attendees: 12,
      rating: 4.7,
      industry: "Media",
      feedback: "Excellent networking opportunity",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
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
              <span className="text-2xl font-bold">Dinner Host Portal</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/dashboard" className="hover:text-gray-200 transition-colors">
                Back to Dashboard
              </Link>
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
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Profile
                    </Link>
                    <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Settings
                    </Link>
                    <Link href="/refer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Refer Friends
                    </Link>
                    <Link href="/help" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Help
                    </Link>
                  </div>
                )}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button onClick={toggleMenu} className="md:hidden p-2 rounded-md hover:bg-white/10 transition-colors">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/20">
              <div className="flex flex-col space-y-2 mt-4">
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-white/10 rounded-md transition-colors"
                >
                  <ChevronDown className="w-4 h-4 rotate-90" />
                  <span>Back to Dashboard</span>
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-white/10 rounded-md transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>My Profile</span>
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-white/10 rounded-md transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </Link>
                <Link
                  href="/refer"
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-white/10 rounded-md transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Refer Friends</span>
                </Link>
                <Link
                  href="/help"
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-white/10 rounded-md transition-colors"
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1b1f2c] mb-2">Dinner Host Dashboard</h1>
          <p className="text-gray-600">Manage your hosted dinners and create new networking experiences</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Dinners Hosted</p>
                  <p className="text-2xl font-bold text-blue-900">15</p>
                </div>
                <ChefHat className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Upcoming Dinners</p>
                  <p className="text-2xl font-bold text-green-900">{upcomingDinners.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Total Attendees</p>
                  <p className="text-2xl font-bold text-purple-900">147</p>
                </div>
                <Users className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add New Dinner */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <Plus className="w-5 h-5" />
                    <span>Add New Dinner</span>
                  </span>
                  <Button
                    size="sm"
                    onClick={() => setShowAddForm(!showAddForm)}
                    variant={showAddForm ? "secondary" : "default"}
                  >
                    {showAddForm ? "Cancel" : "Create"}
                  </Button>
                </CardTitle>
              </CardHeader>
              {showAddForm && (
                <CardContent>
                  <form onSubmit={handleAddDinner} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Dinner Title</Label>
                      <Input
                        id="title"
                        value={newDinner.title}
                        onChange={(e) => setNewDinner({ ...newDinner, title: e.target.value })}
                        placeholder="e.g., Finance Leaders Networking"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={newDinner.location}
                        onChange={(e) => setNewDinner({ ...newDinner, location: e.target.value })}
                        placeholder="Restaurant name and address"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={newDinner.date}
                          onChange={(e) => setNewDinner({ ...newDinner, date: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="time">Time</Label>
                        <Input
                          id="time"
                          type="time"
                          value={newDinner.time}
                          onChange={(e) => setNewDinner({ ...newDinner, time: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="attendees">Max Attendees</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select capacity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6">6 people</SelectItem>
                          <SelectItem value="8">8 people</SelectItem>
                          <SelectItem value="10">10 people</SelectItem>
                          <SelectItem value="12">12 people</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="industry">Industry Focus</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="media">Media</SelectItem>
                          <SelectItem value="tech">Technology</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="price">Price Range</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select price range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="50-75">$50-75</SelectItem>
                          <SelectItem value="75-100">$75-100</SelectItem>
                          <SelectItem value="100-125">$100-125</SelectItem>
                          <SelectItem value="125+">$125+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newDinner.description}
                        onChange={(e) => setNewDinner({ ...newDinner, description: e.target.value })}
                        placeholder="Describe the dinner experience and what attendees can expect..."
                        rows={3}
                      />
                    </div>
                    <Button className="w-full bg-[#1b1f2c] hover:bg-[#1b1f2c]/90">Create Dinner</Button>
                  </form>
                </CardContent>
              )}
            </Card>
          </div>

          {/* Upcoming Dinners */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Upcoming Dinners</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingDinners.map((dinner) => (
                    <div key={dinner.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-[#1b1f2c]">{dinner.title}</h3>
                        <Badge className="bg-green-100 text-green-800">{dinner.status}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{dinner.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{dinner.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{dinner.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>
                            {dinner.attendees}/{dinner.maxAttendees} confirmed
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          <Badge variant="outline">{dinner.industry}</Badge>
                          <Badge variant="outline">{dinner.priceRange}</Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            <Mail className="w-4 h-4 mr-1" />
                            Email Attendees
                          </Button>
                          <Button size="sm" variant="outline">
                            <Share2 className="w-4 h-4 mr-1" />
                            Promote
                          </Button>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t flex space-x-2">
                        <Button size="sm" variant="ghost" className="text-blue-600">
                          <Instagram className="w-4 h-4 mr-1" />
                          Share on Instagram
                        </Button>
                        <Button size="sm" variant="ghost" className="text-blue-600">
                          <Linkedin className="w-4 h-4 mr-1" />
                          Share on LinkedIn
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-1" />
                          Cancel Dinner
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Past Dinners */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="w-5 h-5" />
                  <span>Dinners Hosted in the Past</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pastDinners.map((dinner) => (
                    <div key={dinner.id} className="border rounded-lg p-4">
                      <h4 className="font-semibold text-[#1b1f2c] mb-2">{dinner.title}</h4>
                      <div className="space-y-2 text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{dinner.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{dinner.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{dinner.attendees} attendees</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <Badge variant="outline">{dinner.industry}</Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{dinner.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 italic">"{dinner.feedback}"</p>
                      <div className="mt-3 pt-3 border-t">
                        <Button size="sm" variant="outline" className="w-full bg-transparent">
                          View Analytics
                        </Button>
                        <div className="mt-2">
                          <Button size="sm" variant="outline" className="w-full bg-transparent">
                            <Camera className="w-4 h-4 mr-1" />
                            Add Photos from Event
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
