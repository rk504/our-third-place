"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Users, Calendar, MapPin, Heart } from 'lucide-react'
import { Footer } from "@/components/footer"

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-[#1b1f2c]">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image
                src="/images/o3p-logo-circle.png"
                alt="Our Third Place"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-2xl font-light text-[#1b1f2c]" style={{ fontFamily: "Josefin Sans, sans-serif" }}>
                OUR THIRD PLACE
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/about" className="text-gray-700 hover:text-[#1b1f2c] transition-colors">
                About
              </Link>
              <Link href="/membership" className="text-gray-700 hover:text-[#1b1f2c] transition-colors">
                Membership
              </Link>
              <Link href="/benefits" className="text-gray-700 hover:text-[#1b1f2c] transition-colors">
                Benefits
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-[#1b1f2c] transition-colors">
                Member Portal
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-[#1b1f2c] border-[#1b1f2c] hover:bg-[#1b1f2c] hover:text-white bg-transparent"
                >
                  Member Portal
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            {/* Logo */}
            <div className="mb-12">
              <Image
                src="/images/o3p-logo-new.png"
                alt="Our Third Place Logo"
                width={200}
                height={200}
                className="mx-auto"
              />
            </div>

            {/* Welcome Message */}
            <h1
              className="text-4xl md:text-5xl font-light text-white mb-8 leading-tight tracking-wide"
              style={{ fontFamily: "Josefin Sans, sans-serif" }}
            >
              WELCOME TO OUR THIRD PLACE
            </h1>

            <p className="text-xl text-white/90 mb-12 leading-relaxed">
              Thank you for joining our community of powerhouse women and non-binary professionals
            </p>
          </div>
        </div>
      </section>

      {/* About Our Third Place Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-12">
                <h2
                  className="text-4xl md:text-5xl font-light text-[#1b1f2c] mb-8 text-center tracking-wide"
                  style={{ fontFamily: "Josefin Sans, sans-serif" }}
                >
                  REDEFINING NETWORKING THROUGH FRIENDSHIP
                </h2>
                
                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
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
                  
                  <p className="text-[#646d59] font-medium text-xl">
                    Join us and experience what networking can feel like - natural, meaningful, and something you'll actually look forward to.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Next Steps Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-light text-white mb-12 text-center tracking-wide"
              style={{ fontFamily: "Josefin Sans, sans-serif" }}
            >
              YOUR NEXT STEPS
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Step 1 */}
              <Card className="bg-white/95 backdrop-blur-sm border-2 border-white/30 hover:border-[#646d59] transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-[#646d59] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1b1f2c] mb-3">
                    Access Your Dashboard
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Explore your member portal and connect with the community
                  </p>
                  <Link href="/dashboard">
                    <Button className="w-full bg-[#1b1f2c] hover:bg-[#646d59] text-white">
                      Go to Dashboard
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Step 2 */}
              <Card className="bg-white/95 backdrop-blur-sm border-2 border-white/30 hover:border-[#646d59] transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-[#646d59] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1b1f2c] mb-3">
                    Browse Events
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Find dinner parties and events in your city and industry
                  </p>
                  <Link href="/events">
                    <Button className="w-full bg-[#1b1f2c] hover:bg-[#646d59] text-white">
                      View Events
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Step 3 */}
              <Card className="bg-white/95 backdrop-blur-sm border-2 border-white/30 hover:border-[#646d59] transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-[#646d59] rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1b1f2c] mb-3">
                    Join Your Industry
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Connect with professionals in your specific industry
                  </p>
                  <Link href="/industry/media">
                    <Button className="w-full bg-[#1b1f2c] hover:bg-[#646d59] text-white">
                      Explore Industries
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Step 4 */}
              <Card className="bg-white/95 backdrop-blur-sm border-2 border-white/30 hover:border-[#646d59] transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-[#646d59] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1b1f2c] mb-3">
                    Start Connecting
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Begin building meaningful professional friendships
                  </p>
                  <Link href="/member-recommendations">
                    <Button className="w-full bg-[#1b1f2c] hover:bg-[#646d59] text-white">
                      Meet Members
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
