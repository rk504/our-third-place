"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { Footer } from "@/components/footer"

const subindustries = [
  "FINANCE",
  "MEDIA",
  "ADS",
  "SALES",
  "ADTECH",
  "MARKETING",
  "PUBLIC RELATIONS",
  "AGENCY",
  "CREATIVE",
  "INVESTMENT BANKING",
  "HEDGE FUNDS",
  "MERGERS & ACQUISITION",
  "MEASUREMENT",
  "TECH",
  "HEALTHCARE",
  "LEGAL",
  "CONSULTING",
  "REAL ESTATE",
]

export default function HomePage() {
  const [currentIndustryIndex, setCurrentIndustryIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndustryIndex((prev) => (prev + 1) % subindustries.length)
    }, 2000)
    return () => clearInterval(timer)
  }, [])

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
          <div className="max-w-6xl mx-auto">
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

            {/* Main Headline with Rotating Text */}
            <h1
              className="text-3xl font-light text-white mb-12 leading-tight tracking-wide"
              style={{ fontFamily: "Josefin Sans, sans-serif" }}
            >
              SUPERCHARGE YOUR
              <br />
              <span className="inline-block min-w-[280px]">
                <span key={currentIndustryIndex} className="text-[#dddbd4] animate-fade-in-out">
                  {subindustries[currentIndustryIndex]}
                </span>
              </span>{" "}
              NETWORK
              <br />
              WITH FRIENDSHIP
            </h1>

            {/* Choose Your Place Section */}
            <div className="mt-16">
              <h2
                className="text-3xl md:text-4xl font-light text-white mb-8 tracking-wide"
                style={{ fontFamily: "Josefin Sans, sans-serif" }}
              >
                CHOOSE YOUR PLACE:
              </h2>

              <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch max-w-6xl mx-auto">
                {/* Finance Card */}
                <Card className="w-full md:w-[450px] bg-white/95 backdrop-blur-sm border-2 border-white/30 hover:border-white transition-all duration-300 hover:shadow-2xl group flex flex-col">
                  <CardContent className="p-8 text-center flex flex-col flex-grow">
                    <div className="mb-6">
                      <Image
                        src="/images/finance-dinner-club-logo.png"
                        alt="Finance Dinner Club"
                        width={120}
                        height={120}
                        className="mx-auto rounded-full"
                      />
                    </div>
                    <h3
                      className="text-2xl font-light text-[#1b1f2c] mb-4 tracking-wide"
                      style={{ fontFamily: "Josefin Sans, sans-serif" }}
                    >
                      FINANCE
                    </h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      Connect with finance professionals through intimate dinner experiences
                    </p>

                    {/* Finance Subindustries */}
                    <div className="mb-6 flex-grow">
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 h-full">
                        <div className="text-left">
                          <div className="font-medium mb-2">INVESTMENT BANKING</div>
                          <div className="font-medium mb-2">HEDGE FUNDS</div>
                          <div className="font-medium mb-2">PRIVATE EQUITY</div>
                          <div className="font-medium mb-2">ASSET MANAGEMENT</div>
                        </div>
                        <div className="text-left">
                          <div className="font-medium mb-2">M&A</div>
                          <div className="font-medium mb-2">MEASUREMENT</div>
                          <div className="font-medium mb-2">TRADING</div>
                          <div className="font-medium mb-2">RISK MANAGEMENT</div>
                        </div>
                      </div>
                    </div>

                    <Link href="/industry/finance" className="mt-auto">
                      <Button className="w-full bg-[#1b1f2c] hover:bg-[#1b1f2c]/90 text-white group-hover:bg-[#646d59] transition-colors">
                        Enter Finance Place
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Media Card */}
                <Card className="w-full md:w-[450px] bg-white/95 backdrop-blur-sm border-2 border-white/30 hover:border-white transition-all duration-300 hover:shadow-2xl group flex flex-col">
                  <CardContent className="p-8 text-center flex flex-col flex-grow">
                    <div className="mb-6">
                      <Image
                        src="/images/media-dinner-club-logo.png"
                        alt="Media Dinner Club"
                        width={120}
                        height={120}
                        className="mx-auto rounded-full"
                      />
                    </div>
                    <h3
                      className="text-2xl font-light text-[#1b1f2c] mb-4 tracking-wide"
                      style={{ fontFamily: "Josefin Sans, sans-serif" }}
                    >
                      MEDIA
                    </h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      Build relationships with media professionals in curated settings
                    </p>

                    {/* Media Subindustries */}
                    <div className="mb-6 flex-grow">
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 h-full">
                        <div className="text-left">
                          <div className="font-medium mb-2">ADS</div>
                          <div className="font-medium mb-2">SALES</div>
                          <div className="font-medium mb-2">ADTECH</div>
                          <div className="font-medium mb-2">MARKETING</div>
                        </div>
                        <div className="text-left">
                          <div className="font-medium mb-2">PUBLIC RELATIONS</div>
                          <div className="font-medium mb-2">AGENCY</div>
                          <div className="font-medium mb-2">CREATIVE</div>
                          <div className="font-medium mb-2">CONTENT STRATEGY</div>
                        </div>
                      </div>
                    </div>

                    <Link href="/industry/media" className="mt-auto">
                      <Button className="w-full bg-[#1b1f2c] hover:bg-[#1b1f2c]/90 text-white group-hover:bg-[#646d59] transition-colors">
                        Enter Media Place
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Other Industries Section */}
            <div className="mt-16 mb-8">
              <p
                className="text-xl font-light text-white tracking-wide"
                style={{ fontFamily: "Josefin Sans, sans-serif" }}
              >
                INTERESTED IN ANOTHER INDUSTRY?{" "}
                <Link href="/signup" className="text-[#dddbd4] hover:text-white underline transition-colors">
                  FILL OUT THIS FORM
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes fade-in-out {
          0% { opacity: 0; transform: translateY(20px); }
          20% { opacity: 1; transform: translateY(0); }
          80% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-20px); }
        }
        
        .animate-fade-in-out {
          animation: fade-in-out 2s ease-in-out;
        }
      `}</style>
    </div>
  )
}
