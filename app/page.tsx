"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react"

export default function DynagrowthSchools() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})
  const [highlightIndex, setHighlightIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(3)
  const [isAnimating, setIsAnimating] = useState(false)
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right')

  const highlightImages = [
    // Learning environment
    "/Highlights/Learning environment/geo2.jpg",
    "/Highlights/more images/class1.jpg",
    "/Highlights/Learning environment/arts 3.jpg",
    "/Highlights/Learning environment/arts 4.jpg",
    "/Highlights/more images/class2.jpg",
    "/Highlights/Learning environment/arts1.jpg",
    "/Highlights/Learning environment/arts2.jpg",
    "/Highlights/Learning environment/arts4.jpg",
    "/Highlights/more images/class3.jpg",
    "/Highlights/Learning environment/basic1.jpg",
    "/Highlights/Learning environment/geo 1.jpg",
    "/Highlights/Learning environment/pre1.jpg",
    // Christmas party
    "/Highlights/christmas party/IMG_3887.JPG",
    "/Highlights/more images/class4.jpg",
    "/Highlights/christmas party/IMG_3878.JPG",
    "/Highlights/christmas party/IMG_3925.JPG",
    "/Highlights/christmas party/IMG_3446.JPG",
    "/Highlights/christmas party/IMG_3491.JPG",
    "/Highlights/christmas party/IMG_3526.JPG",
    "/Highlights/christmas party/IMG_3646.JPG",
    "/Highlights/christmas party/IMG_3939.JPG",
    "/Highlights/christmas party/IMG_3913.JPG",
    // Airport excursion
    "/Highlights/airport excursion/air.jpg",
    "/Highlights/airport excursion/air1.jpg",
    // Independence day (only img1 kept)
    "/Highlights/independence day/independence1.jpg",
    "/Highlights/more images/class5.jpg",
  ]

  const goPrev = () => setHighlightIndex((prev) => (prev - 1 + highlightImages.length) % highlightImages.length)
  const goNext = () => setHighlightIndex((prev) => (prev + 1) % highlightImages.length)

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === 'undefined') return
      setVisibleCount(window.innerWidth >= 1024 ? 4 : 3)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const advance = (direction: 'next' | 'prev') => {
    if (isAnimating) return
    setSlideDirection(direction === 'next' ? 'right' : 'left')
    setIsAnimating(true)
    
    setTimeout(() => {
      if (direction === 'next') {
        setHighlightIndex((prev) => (prev + 1) % highlightImages.length)
      } else {
        setHighlightIndex((prev) => (prev - 1 + highlightImages.length) % highlightImages.length)
      }
    }, 150)
    
    setTimeout(() => {
      setIsAnimating(false)
    }, 400)
  }

  useEffect(() => {
    setIsVisible(true)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    // Observe all sections
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const setSectionRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el
  }

  const isSectionVisible = (id: string) => visibleSections.has(id)

  return (
    <div className="min-h-screen bg-white">
      <style jsx>{`
        @keyframes slideInRight {
          0% {
            transform: translateX(100%) scale(0.9);
            opacity: 0;
          }
          50% {
            transform: translateX(50%) scale(0.95);
            opacity: 0.7;
          }
          100% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }
        
        @keyframes slideInLeft {
          0% {
            transform: translateX(-100%) scale(0.9);
            opacity: 0;
          }
          50% {
            transform: translateX(-50%) scale(0.95);
            opacity: 0.7;
          }
          100% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }
      `}</style>
      {/* Navigation Bar */}
      <nav
        className={`bg-white shadow-sm sticky top-0 z-50 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-d4iXS1NKPMEhu5xs4Y6kxw0QgWREo0.png"
                alt="Dynagrowth Schools Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-xl text-[#1F3A93] font-eras-bold">Dynagrowth</span>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              <a
                href="#home"
                className="text-[#1F3A93] hover:underline hover:decoration-[#3BB44A] transition-all duration-300 font-eras"
              >
                Home
              </a>
                <a
                  href="#about"
                  className="text-[#1F3A93] hover:underline hover:decoration-[#3BB44A] transition-all duration-300 font-eras"
                >
                  About Us
                </a>
              <a
                href="#schools"
                className="text-[#1F3A93] hover:underline hover:decoration-[#3BB44A] transition-all duration-300 font-eras"
              >
                Our Schools
              </a>
              <a
                href="#highlights"
                className="text-[#1F3A93] hover:underline hover:decoration-[#3BB44A] transition-all duration-300 font-eras"
              >
                Highlights
              </a>
              <a
                href="#contact"
                className="text-[#1F3A93] hover:underline hover:decoration-[#3BB44A] transition-all duration-300 font-eras"
              >
                Contact
              </a>
              <Button className="bg-[#3BB44A] hover:bg-[#2F8E3A] text-white rounded-full px-6 py-2 transition-colors duration-300 font-nirmala uppercase font-semibold">
                Register Your Interest
              </Button>
            </div>

            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-[#1F3A93] hover:text-[#3BB44A] transition-colors duration-300"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="lg:hidden bg-white border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-4">
                <a
                  href="#home"
                  className="text-[#1F3A93] hover:text-[#3BB44A] transition-all duration-300 px-4 font-eras"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </a>
                <a
                  href="#about"
                  className="text-[#1F3A93] hover:text-[#3BB44A] transition-all duration-300 px-4 font-eras"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us
                </a>
                <a
                  href="#schools"
                  className="text-[#1F3A93] hover:text-[#3BB44A] transition-all duration-300 px-4 font-eras"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Our Schools
                </a>
                <a
                  href="#highlights"
                  className="text-[#1F3A93] hover:text-[#3BB44A] transition-all duration-300 px-4 font-eras"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Highlights
                </a>
                <a
                  href="#contact"
                  className="text-[#1F3A93] hover:text-[#3BB44A] transition-all duration-300 px-4 font-eras"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </a>
                <div className="px-4">
                  <Button className="bg-[#3BB44A] hover:bg-[#2F8E3A] text-white rounded-full px-6 py-2 transition-colors duration-300 w-full font-nirmala uppercase font-semibold">
                    Register Your Interest
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-0 pb-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative flex items-start justify-center min-h-[550px] md:min-h-[600px] lg:min-h-[700px] pt-16 md:pt-20 lg:pt-24">
            {/* Central Content */}
            <div className="text-center z-10 max-w-2xl mx-auto px-4">
              <div className="mb-8">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-d4iXS1NKPMEhu5xs4Y6kxw0QgWREo0.png"
                  alt="Dynagrowth Schools Logo"
                  width={120}
                  height={120}
                  className="mx-auto mb-6"
                />
              </div>
              <h1
                className={`text-4xl md:text-6xl text-[#1F3A93] mb-4 transition-all duration-1000 transform font-eras-bold ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              >
                We Learn and Grow Together
              </h1>
             
              <div
                className={`transition-all duration-1000 delay-500 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              >
                <br />
                <Button className="bg-[#3BB44A] hover:bg-[#2F8E3A] text-white rounded-full px-8 py-3 hover:scale-105 hover:shadow-lg transition-all duration-300 font-nirmala uppercase font-semibold">
                  Discover More
                </Button>
              </div>
            </div>

            {/* Surrounding Images - Spread far from center with varied dimensions */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* Top Left - Wide Rectangle */}
             {/*  <div
                className={`absolute top-2 left-1 xs:top-4 xs:left-2 sm:top-8 sm:left-4 md:top-12 md:left-8 lg:top-16 lg:left-12 xl:top-20 xl:left-16 w-20 h-12 xs:w-24 xs:h-14 sm:w-32 sm:h-20 md:w-40 md:h-24 lg:w-48 lg:h-28 xl:w-56 xl:h-32 transition-all duration-1000 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                style={{ transitionDelay: "100ms" }}
              >
                <Image
                  src="/happy-children-learning-and-playing-at-school-.jpg?height=150&width=250&query=children studying together"
                  alt="Children studying"
                  width={250}
                  height={100}
                  className="w-32 h-48 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </div> */}

              {/* Top Center - Tall Rectangle */}
              {/*<div
                className={`absolute top-0 left-1/2 sm:top-8 md:top-12 lg:top-16 xl:top-20 transform -translate-x-1/2 w-20 h-32 sm:w-24 sm:h-40 md:w-28 md:h-48 lg:w-32 lg:h-56 xl:w-36 xl:h-64 transition-all duration-1000 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                style={{ transitionDelay: "200ms" }}
              >
                <Image
                  src="/happy-children-learning-and-playing-at-school-.jpg?height=250&width=150&query=happy child learning"
                  alt="Happy child"
                  width={150}
                  height={250}
                  className="w-full h-32 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </div>*/}

              {/* Top Right - Square */}
              {/*<div
                className={`absolute top-2 right-1 xs:top-4 xs:right-2 sm:top-8 sm:right-4 md:top-12 md:right-8 lg:top-16 lg:right-12 xl:top-20 xl:right-16 w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 transition-all duration-1000 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                style={{ transitionDelay: "300ms" }}
              >
                <Image
                  src="/happy-children-learning-and-playing-at-school-.jpg?height=200&width=200&query=child in classroom"
                  alt="Child in classroom"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </div> */}

              {/* Middle Left - Narrow Tall */}
              {/*<div
                className={`absolute top-1/2 left-0 xs:left-1 sm:left-2 md:left-4 lg:left-6 xl:left-8 transform -translate-y-1/2 w-12 h-20 xs:w-14 xs:h-24 sm:w-16 sm:h-28 md:w-20 md:h-36 lg:w-24 lg:h-44 xl:w-28 xl:h-52 transition-all duration-1000 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                style={{ transitionDelay: "400ms" }}
              >
                <Image
                  src="/happy-children-learning-and-playing-at-school-.jpg?height=240&width=120&query=child playing"
                  alt="Child playing"
                  width={120}
                  height={240}
                  className="w-full h-full object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </div> */}

              {/* Middle Right - Large Square */}
              {/*<div
                className={`absolute top-1/2 right-0 xs:right-1 sm:right-2 md:right-4 lg:right-6 xl:right-8 transform -translate-y-1/2 w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 xl:w-52 xl:h-52 transition-all duration-1000 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                style={{ transitionDelay: "500ms" }}
              >
                <Image
                  src="/happy-children-learning-and-playing-at-school-.jpg?height=240&width=240&query=children playing and learning"
                  alt="Children playing"
                  width={240}
                  height={240}
                  className="w-full h-full object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </div>*/}

              {/* Bottom Left - Short Wide */}
              {/*<div
                className={`absolute bottom-8 left-8 sm:bottom-12 sm:left-16 md:bottom-20 md:left-24 lg:bottom-24 lg:left-32 xl:bottom-32 xl:left-40 w-36 h-20 sm:w-44 sm:h-24 md:w-52 md:h-28 lg:w-60 lg:h-32 xl:w-68 xl:h-36 transition-all duration-1000 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                style={{ transitionDelay: "600ms" }}
              >
                <Image
                  src="/happy-children-learning-and-playing-at-school-.jpg?height=140&width=280&query=child with blocks"
                  alt="Child with blocks"
                  width={280}
                  height={140}
                  className="w-full h-full object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </div>*/}

              {/* Bottom Right - Medium Square */}
              {/*<div
                className={`absolute bottom-8 right-8 sm:bottom-12 sm:right-16 md:bottom-20 md:right-24 lg:bottom-24 lg:right-32 xl:bottom-32 xl:right-40 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 transition-all duration-1000 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                style={{ transitionDelay: "700ms" }}
              >
                <Image
                  src="/happy-children-learning-and-playing-at-school-.jpg?height=200&width=200&query=joyful child celebrating"
                  alt="Joyful child"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </div>*/}
            </div>
          </div>
        </div>
      </section>

      {/* Academic Excellence Section - COMMENTED OUT */}
      {/* 
      <section
        ref={setSectionRef("academic-excellence")}
        id="academic-excellence"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-12 transition-all duration-1000 transform ${
              isSectionVisible("academic-excellence") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <h2 className="text-4xl text-[#1F3A93] mb-4 font-eras-bold">
              Academic Excellence Across All Levels
            </h2>
            <p className="text-[#44403D] max-w-3xl mx-auto font-nirmala">
              Our comprehensive curriculum ensures students receive the best education at every stage of their
              development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "📚",
                title: "Strong Foundation",
                desc: "Building solid academic fundamentals",
                color: "#3BB44A",
              },
              {
                icon: "💻",
                title: "Technology Integration",
                desc: "Modern tools for modern learning",
                color: "#FBC02D",
              },
              { icon: "🎨", title: "Creative Expression", desc: "Nurturing artistic talents", color: "#E53935" },
              { icon: "🏆", title: "Achievement Focus", desc: "Celebrating every success", color: "#1F3A93" },
            ].map((item, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-1000 transform ${
                  isSectionVisible("academic-excellence") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${item.color}10` }}
                >
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center"
                    style={{ backgroundColor: item.color }}
                  >
                    <span className="text-gray-800 text-sm">{item.icon}</span>
                  </div>
                </div>
                <h3 className="text-xl text-[#1F3A93] mb-2 font-eras font-semibold">{item.title}</h3>
                <p className="text-[#44403D] text-sm font-nirmala">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* About Us Section */}
      <section ref={setSectionRef("about")} id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F7F6F5]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              className={`transition-all duration-1000 transform ${
                isSectionVisible("about") ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
              }`}
            >
              <div className="aspect-[4/3] bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/About image.jpg"
                  alt="About Dynagrowth Schools"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>

            <div
              className={`space-y-8 transition-all duration-1000 transform ${
                isSectionVisible("about") ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <h2 className="text-4xl text-[#1F3A93] mb-8 font-eras-bold">About Us</h2>

              <div className="space-y-6">
                <div
                  className={`transition-all duration-700 transform ${
                    isSectionVisible("about") ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: "400ms" }}
                >
                  <p className="text-[#44403D] leading-relaxed font-nirmala">
                    At Dynagrowth Schools, we are committed to educating the total child by nurturing academic excellence, practical skills, moral values, and creativity in a safe, supportive, and community-driven environment. Our approach goes beyond the classroom, from instilling strong literacy and numeracy foundations to developing hands-on abilities and life skills that prepare students for independence, higher education, and future careers. Rooted in Jahi/Kado Kuchi, Abuja, we provide parents with access to high-quality, affordable education without having to leave their community, empowering children to learn, grow, and thrive as leaders of tomorrow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Excellence Section - Connected to About Us */}
      <section
        ref={setSectionRef("academic-excellence")}
        id="academic-excellence"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-12 transition-all duration-1000 transform ${
              isSectionVisible("academic-excellence") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <h2 className="text-4xl text-[#1F3A93] mb-4 font-eras-bold">Academic Excellence</h2>
            <p className="text-[#44403D] max-w-3xl mx-auto font-nirmala">
              Our comprehensive curriculum ensures excellence across all areas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "📚",
                title: "Strong Foundation",
                desc: "Building solid academic fundamentals",
                color: "#3BB44A",
              },
              {
                icon: "💻",
                title: "Technology Integration",
                desc: "Modern tools for modern learning",
                color: "#FBC02D",
              },
              { icon: "🎨", title: "Creative Expression", desc: "Nurturing artistic talents", color: "#E53935" },
              { icon: "🏆", title: "Achievement Focus", desc: "Celebrating every success", color: "#1F3A93" },
            ].map((item, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-1000 transform ${
                  isSectionVisible("academic-excellence") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${item.color}10` }}
                >
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center"
                    style={{ backgroundColor: item.color }}
                  >
                    <span className="text-gray-800 text-sm">{item.icon}</span>
                  </div>
                </div>
                <h3 className="text-xl text-[#1F3A93] mb-2 font-eras font-semibold">{item.title}</h3>
                <p className="text-[#44403D] text-sm font-nirmala">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Schools Section */}
      <section ref={setSectionRef("schools")} id="schools" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-12 transition-all duration-1000 transform ${
              isSectionVisible("schools") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <h2 className="text-4xl text-[#1F3A93] mb-4 font-eras-bold">Our Schools</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Pre-School & Nursery School",
                admissionRequirements: [
                  "Birth certificate",
                  "Immunization records", 
                  "Parent/guardian identification",
                  "Passport photographs (4 copies)"
                ],
                admissionNote: "No entrance examination required"
              },
              {
                name: "Basic", 
                admissionRequirements: [
                  "Birth certificate",
                  "Previous school report card",
                  "Transfer certificate (if applicable)",
                  "Passport photographs (6 copies)"
                ],
                admissionNote: "Basic literacy & numeracy evaluation"
              },
              {
                name: "College",
                admissionRequirements: [
                  "Birth certificate",
                  "Primary 6 certificate or equivalent",
                  "Previous school transcripts",
                  "Passport photographs (6 copies)"
                ],
                admissionNote: "Exam: English, Maths, Science, General Knowledge"
              },
            ].map((school, index) => (
              <Card
                key={index}
                className={`overflow-hidden hover:scale-105 hover:shadow-xl transition-all duration-700 border-0 shadow-lg transform ${
                  isSectionVisible("schools") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-6 text-center">
                    <h3 className="text-xl text-[#1F3A93] mb-2 font-eras-bold">{school.name}</h3>
                    
                    {/* Admission Requirements */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-[#1F3A93] mb-2 font-eras">Admission Requirements:</h4>
                      <ul className="space-y-1 text-center">
                        {school.admissionRequirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="text-xs text-[#44403D] font-nirmala">
                            • {req}
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-[#3BB44A] mt-2 font-nirmala italic">{school.admissionNote}</p>
                    </div>

                    <Button className="bg-[#3BB44A] hover:bg-[#2F8E3A] text-white rounded-full px-6 py-2 hover:scale-105 transition-all duration-300 w-full font-nirmala uppercase font-semibold">
                      Register Your Interest
                    </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section
        ref={setSectionRef("mission-vision")}
        id="mission-vision"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F7F6F5]"
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className={`text-4xl text-[#1F3A93] text-center mb-12 transition-all duration-1000 transform font-eras-bold ${
              isSectionVisible("mission-vision") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Mission & Vision
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div
              className={`transition-all duration-1000 transform ${
                isSectionVisible("mission-vision") ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <h3 className="text-3xl text-[#1F3A93] mb-6 font-eras-bold">Mission</h3>
              <p className="text-[#44403D] leading-relaxed mb-6 font-nirmala">
                Our mission is to provide an accessible British curriculum to children in underserved areas of Nigeria,
                fostering holistic growth, academic excellence, and lifelong learning. We aim to nurture confident,
                curious, and compassionate learners by combining international standards with local values, ensuring
                every child has the opportunity to thrive and contribute to their community.
              </p>
              <p className="text-[#3BB44A] text-lg font-nirmala-italic">Educating the total child.</p>
            </div>

            <div
              className={`border-l-2 border-[#1F3A93] pl-8 transition-all duration-1000 transform ${
                isSectionVisible("mission-vision") ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <h3 className="text-3xl text-[#1F3A93] mb-6 font-eras-bold">Vision</h3>
              <p className="text-[#44403D] leading-relaxed mb-6 font-nirmala">
                To create a nurturing environment where children in Nigerian communities can learn and grow together
                through affordable, high-quality British education.
              </p>
              <br />
                <br />
                <br />
              <p className="text-[#3BB44A] text-lg font-nirmala-italic">
                Skills for today, values for life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section - Carousel */}
      <section ref={setSectionRef("highlights")} id="highlights" className="py-16 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-12 transition-all duration-1000 transform ${
              isSectionVisible("highlights") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <h2 className="text-4xl text-[#1F3A93] mb-4 font-eras-bold">Highlights</h2>
            <p className="text-[#44403D] max-w-3xl mx-auto font-nirmala">
              Some highlights from our past events and our students learning
            </p>
          </div>

          {/* Manual Slider - shows 3-4 images with smooth slide animation */}
          <div className={`relative max-w-7xl mx-auto transition-all duration-1000 transform ${isSectionVisible("highlights") ? "opacity-100" : "opacity-0"}`}>
            <div className="overflow-hidden rounded-2xl">
              <div className="flex gap-6">
                {Array.from({ length: visibleCount }).map((_, idx) => {
                  const imageIdx = (highlightIndex + idx) % highlightImages.length
                  const src = highlightImages[imageIdx]
                  const translateClass = isAnimating
                    ? (slideDirection === 'right' ? 'translate-x-3' : '-translate-x-3')
                    : 'translate-x-0'
                  const opacityClass = isAnimating ? 'opacity-80' : 'opacity-100'
                  return (
                    <div 
                      key={`hl-${imageIdx}-${highlightIndex}`} 
                      className={`flex-shrink-0 w-64 sm:w-72 md:w-80 lg:w-96 transition-all duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${translateClass} ${opacityClass}`}
                      style={{ transitionDelay: `${idx * 40}ms`, willChange: 'transform, opacity' }}
                    >
                      <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <Image
                          src={src}
                          alt="Highlight"
                          width={400}
                          height={300}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          sizes="(min-width: 1024px) 384px, (min-width: 768px) 320px, 256px"
                          loading="lazy"
                          quality={70}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <button
              type="button"
              aria-label="Previous highlight"
              onClick={() => advance('prev')}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#1F3A93] rounded-full p-2 shadow"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              type="button"
              aria-label="Next highlight"
              onClick={() => advance('next')}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#1F3A93] rounded-full p-2 shadow"
            >
              <ChevronRight size={24} />
            </button>
            <div className="mt-4 flex justify-center gap-2">
              {highlightImages.map((_, idx) => (
                <button
                  key={idx}
                  aria-label={`Go to slide ${idx + 1}`}
                  onClick={() => setHighlightIndex(idx)}
                  className={`h-2 w-2 rounded-full ${idx === highlightIndex ? 'bg-[#1F3A93]' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* Contact Section */}
      <section ref={setSectionRef("contact")} id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F7F6F5]">
        <div className="max-w-7xl mx-auto">
          <h2
            className={`text-4xl text-[#1F3A93] text-center mb-12 transition-all duration-1000 transform font-eras-bold ${
              isSectionVisible("contact") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Contact Us
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div
              className={`space-y-6 transition-all duration-1000 transform ${
                isSectionVisible("contact") ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              {[
                { title: "Address", content: "1234 Example St.,\nAbuja, Nigeria" },
                { title: "Visiting Hours", content: "Mon-Fri: 9:00am – 5:00pm" },
                { title: "Phone", content: "+234 123 4567 890" },
                { title: "Email", content: "info@example.com" },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 transform ${
                    isSectionVisible("contact") ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <h3 className="text-xl text-[#1F3A93] mb-2 font-eras font-semibold">{item.title}</h3>
                  <p className="text-[#44403D] whitespace-pre-line font-nirmala">{item.content}</p>
                </div>
              ))}

              <div
                className={`transition-all duration-700 transform ${
                  isSectionVisible("contact") ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: "800ms" }}
              >
                <Button className="bg-[#3BB44A] hover:bg-[#2F8E3A] text-white rounded-full px-8 py-3 hover:scale-105 transition-all duration-300 font-nirmala uppercase font-semibold">
                  Get in Touch
                </Button>
              </div>
            </div>

            <div
              className={`transition-all duration-1000 transform ${
                isSectionVisible("contact") ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <div className="relative aspect-[4/3] bg-[#A6DCF5] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d828.2092682552654!2d7.435807464667049!3d9.095665882313147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOcKwMDUnNDUuMCJOIDfCsDI2JzEwLjUiRQ!5e0!3m2!1sen!2suk!4v1758795826484!5m2!1sen!2suk"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
                <a
                  href="https://www.google.com/maps/place/9%C2%B005'45.0%22N+7%C2%B026'10.5%22E/@9.095666,7.435807,19z/data=!4m4!3m3!8m2!3d9.0958333!4d7.43625?hl=en&entry=ttu&g_ep=EgoyMDI1MDkyMi4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0"
                  aria-label="Open in Google Maps"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1F3A93] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="flex items-center space-x-3">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-d4iXS1NKPMEhu5xs4Y6kxw0QgWREo0.png"
                alt="Dynagrowth Schools Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <span className="text-xl font-eras-bold">Dynagrowth Schools</span>
                <p className="text-sm opacity-90 font-nirmala-italic">We Learn and Grow Together</p>
              </div>
            </div>

            <div className="text-center">
              <div className="flex flex-wrap justify-center gap-6">
                <a href="#home" className="hover:text-[#A6DCF5] transition-colors duration-300 font-eras">
                  Home
                </a>
                <a href="#about" className="hover:text-[#A6DCF5] transition-colors duration-300 font-eras">
                  About Us
                </a>
                <a href="#schools" className="hover:text-[#A6DCF5] transition-colors duration-300 font-eras">
                  Our Schools
                </a>
                <a href="#highlights" className="hover:text-[#A6DCF5] transition-colors duration-300 font-eras">
                  Highlights
                </a>
                <a href="#contact" className="hover:text-[#A6DCF5] transition-colors duration-300 font-eras">
                  Contact
                </a>
              </div>
            </div>

            <div className="flex justify-center md:justify-end space-x-4">
              {[
                { color: "#3BB44A", icon: "📘" },
                { color: "#E53935", icon: "📷" },
                { color: "#FBC02D", icon: "🐦" },
                { color: "#1F3A93", icon: "💼" },
              ].map((social, index) => (
                <div
                  key={index}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer"
                  style={{ backgroundColor: social.color }}
                >
                  <span className="text-white">{social.icon}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-sm opacity-75 font-nirmala">© Dynagrowth Schools. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
