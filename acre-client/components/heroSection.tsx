"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface AnimatedCell {
  id: string
  content: string
  x: number
  y: number
  angle: number
  delay: number
  duration: number
  distance: number
  type: "company" | "position" | "status" | "date" | "location" | "salary" | "skill" | "level"
}

const cellContents = {
  company: [
    "Google",
    "Microsoft",
    "Apple",
    "Meta",
    "Netflix",
    "Amazon",
    "Tesla",
    "Spotify",
    "Uber",
    "Airbnb",
    "Stripe",
    "OpenAI",
    "GitHub",
    "Figma",
    "Slack",
    "Discord",
    "Zoom",
    "Adobe",
    "Salesforce",
    "Oracle",
  ],
  position: [
    "Software Engineer",
    "Frontend Developer",
    "Backend Engineer",
    "Full Stack Engineer",
    "DevOps Engineer",
    "Data Scientist",
    "Product Manager",
    "UI/UX Designer",
    "Mobile Developer",
    "Cloud Architect",
    "Security Engineer",
    "ML Engineer",
    "QA Engineer",
    "Site Reliability Engineer",
  ],
  status: [
    "Applied",
    "Interview",
    "Rejected",
    "Pending",
    "Offer",
    "Negotiating",
    "Accepted",
    "Withdrawn",
    "On Hold",
    "Follow Up",
    "Phone Screen",
    "Technical Round",
    "Final Round",
  ],
  date: [
    "2025-01-15",
    "2025-03-12",
    "2025-01-08",
    "2025-04-03",
    "2025-02-01",
    "2025-09-05",
    "2025-03-10",
    "2025-02-15",
    "2025-03-01",
    "2024-06-08",
    "2025-03-12",
    "2025-08-20",
  ],
  location: [
    "Mountain View, CA",
    "Seattle, WA",
    "Menlo Park, CA",
    "Austin, TX",
    "New York, NY",
    "San Francisco, CA",
    "Los Angeles, CA",
    "Boston, MA",
    "Chicago, IL",
    "Denver, CO",
    "Portland, OR",
    "Remote",
    "Hybrid",
  ],
  salary: [
    "$150,000",
    "$140,000",
    "$155,000",
    "$135,000",
    "$160,000",
    "$145,000",
    "$170,000",
    "$125,000",
    "$180,000",
    "$165,000",
    "$190,000",
    "$200,000+",
  ],
  skill: [
    "React",
    "Node.js",
    "Python",
    "TypeScript",
    "AWS",
    "Docker",
    "Kubernetes",
    "GraphQL",
    "MongoDB",
    "PostgreSQL",
    "Redis",
    "Next.js",
    "Vue.js",
    "Angular",
    "Go",
    "Rust",
  ],
  level: [
    "Junior",
    "Mid-Level",
    "Senior",
    "Lead",
    "Principal",
    "Staff",
    "Entry Level",
    "Intern",
    "Contractor",
    "Part-Time",
    "Full-Time",
    "Freelance",
  ],
}

export default function AnimatedHero() {
  const [cells, setCells] = useState<AnimatedCell[]>([])
  const [usedPositions, setUsedPositions] = useState<Set<string>>(new Set())

  const generateRandomCell = (): AnimatedCell => {
    const angle = Math.random() * 360
    const distance = 100 + Math.random() * 500 // Distance from center
    const centerX = typeof window !== "undefined" ? window.innerWidth / 2 : 800
    const centerY = typeof window !== "undefined" ? window.innerHeight / 2 : 400

    const x = centerX + Math.cos((angle * Math.PI) / 180) * distance
    const y = centerY + Math.sin((angle * Math.PI) / 180) * distance

    // Check for position conflicts
    const positionKey = `${Math.round(x / 50)}-${Math.round(y / 50)}`

    const types = Object.keys(cellContents) as Array<keyof typeof cellContents>
    const randomType = types[Math.floor(Math.random() * types.length)]
    const typeContents = cellContents[randomType]
    const content = typeContents[Math.floor(Math.random() * typeContents.length)]

    return {
      id: Math.random().toString(36).substr(2, 9),
      content,
      type: randomType,
      x,
      y,
      angle,
      distance,
      delay: Math.random() * 0.5,
      duration: 4 + Math.random() * 3, // 4-7 seconds duration
    }
  }

  useEffect(() => {
    const interval = setInterval(
      () => {
        setCells((prev) => {
          // Remove old cells
          const now = Date.now()
          const filtered = prev.filter((cell) => {
            const cellAge = now - Number.parseInt(cell.id, 36) * 1000
            return cellAge < 8000 // Keep for 8 seconds max
          })

          // Add new cell if we have space
          if (filtered.length < 12) {
            let newCell = generateRandomCell()
            let attempts = 0

            // Try to find a non-conflicting position
            while (attempts < 10) {
              const positionKey = `${Math.round(newCell.x / 50)}-${Math.round(newCell.y / 50)}`
              const hasConflict = filtered.some((cell) => {
                const existingKey = `${Math.round(cell.x / 50)}-${Math.round(cell.y / 50)}`
                return existingKey === positionKey
              })

              if (!hasConflict) break
              newCell = generateRandomCell()
              attempts++
            }

            return [...filtered, newCell]
          }
          return filtered
        })
      },
      300 + Math.random() * 700, // Random intervals between 300-1000ms
    )

    return () => clearInterval(interval)
  }, [])

  const getCellStyling = (type: string) => {
    const baseStyles = "border shadow-lg font-medium"

    switch (type) {
      case "company":
        return `${baseStyles} bg-primary/10 border-primary/30 text-primary`
      case "position":
        return `${baseStyles} bg-secondary/10 border-secondary/30 text-secondary-foreground`
      case "status":
        return `${baseStyles} bg-accent/10 border-accent/30 text-accent-foreground`
      case "salary":
        return `${baseStyles} bg-emerald-500/10 border-emerald-500/30 text-emerald-600`
      case "location":
        return `${baseStyles} bg-orange-500/10 border-orange-500/30 text-orange-600`
      default:
        return `${baseStyles} bg-muted/20 border-muted/40 text-muted-foreground`
    }
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-background via-background to-secondary/5">
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/50 to-background opacity-60" />

      {/* Animated background cells */}
      <AnimatePresence>
        {cells.map((cell) => {
          const centerX = typeof window !== "undefined" ? window.innerWidth / 2 : 800
          const centerY = typeof window !== "undefined" ? window.innerHeight / 2 : 400

          return (
            <motion.div
              key={cell.id}
              className="absolute pointer-events-none z-10"
              initial={{
                x: centerX,
                y: centerY,
                opacity: 0,
                scale: 0.1,
                filter: "blur(20px)",
              }}
              animate={{
                x: cell.x,
                y: cell.y,
                opacity: [0, 0.3, 0.8, 0.9, 0.8],
                scale: [0.1, 0.6, 1, 1.1, 1],
                filter: ["blur(20px)", "blur(8px)", "blur(2px)", "blur(0px)", "blur(1px)"],
                boxShadow: [
                  "0 0 0px rgba(79, 156, 249, 0)",
                  "0 0 5px rgba(79, 156, 249, 0.2)",
                  "0 0 15px rgba(79, 156, 249, 0.4)",
                  "0 0 25px rgba(79, 156, 249, 0.6)",
                  "0 0 15px rgba(79, 156, 249, 0.3)",
                ],
              }}
              exit={{
                opacity: [0.8, 1, 1, 0],
                scale: [1, 1.5, 3, 0],
                rotate: [0, 90, 180],
                filter: ["blur(1px)", "blur(0px)", "blur(10px)", "blur(30px)"],
                boxShadow: [
                  "0 0 15px rgba(79, 156, 249, 0.3)",
                  "0 0 30px rgba(79, 156, 249, 0.8)",
                  "0 0 50px rgba(79, 156, 249, 1)",
                  "0 0 0px rgba(79, 156, 249, 0)",
                ],
                transition: {
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  times: [0, 0.2, 0.6, 1],
                },
              }}
              transition={{
                duration: cell.duration,
                delay: cell.delay,
                ease: [0.25, 0.46, 0.45, 0.94],
                times: [0, 0.2, 0.6, 0.8, 1],
              }}
            >
              <div className={`px-3 py-1.5 rounded-lg text-sm ${getCellStyling(cell.type)}`}>{cell.content}</div>
            </motion.div>
          )
        })}
      </AnimatePresence>

      {/* Central content */}
      <div className="absolute inset-0 flex items-center justify-center z-20 overflow-auto">
        <div className="text-center space-y-6">
          <motion.h1
            className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Job Application Tracker
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Track your job applications with style and precision. Watch your career opportunities come to life.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105">
              Get Started
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      {/* <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <div className="flex flex-col items-center space-y-2 text-muted-foreground">
          <span className="text-sm">Scroll to explore</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>
      </motion.div> */}
    </div>
  )
}
