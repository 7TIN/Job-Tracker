"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cellContents from "@/data/cellContents";
// import { Button } from "./ui/button"
// import { redirect } from "next/navigation"
import { useRouter } from "next/navigation";

interface AnimatedCell {
  id: string;
  content: string;
  x: number;
  y: number;
  angle: number;
  delay: number;
  duration: number;
  distance: number;
  type:
    | "company"
    | "position"
    | "status"
    | "date"
    | "location"
    | "salary"
    | "skill"
    | "level";
}

export default function AnimatedHero() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/dashboard");
  };
  const [cells, setCells] = useState<AnimatedCell[]>([]);
  // const [usedPositions, setUsedPositions] = useState<Set<string>>(new Set())

  const generateRandomCell = (): AnimatedCell => {
    const angle = Math.random() * 360;
    const distance = 100 + Math.random() * 500; // Distance from center
    const screenW = typeof window !== "undefined" ? window.innerWidth : 1600;
    const screenH = typeof window !== "undefined" ? window.innerHeight : 900;
    const centerX = screenW / 2;
    const centerY = screenH / 2;

    let x = centerX + Math.cos((angle * Math.PI) / 180) * distance;
    let y = centerY + Math.sin((angle * Math.PI) / 180) * distance;

    // Keep cells away from edges (avoid seam issue)
    const margin = 60;
    x = Math.min(Math.max(margin, x), screenW - margin);
    y = Math.min(Math.max(margin, y), screenH - margin);

    const types = Object.keys(cellContents) as Array<keyof typeof cellContents>;
    const randomType = types[Math.floor(Math.random() * types.length)];
    const typeContents = cellContents[randomType];
    const content =
      typeContents[Math.floor(Math.random() * typeContents.length)];

    return {
      id: Math.random().toString(36).substr(2, 9),
      content,
      type: randomType,
      x,
      y,
      angle,
      distance,
      delay: Math.random() * 0.5,
      duration: 4 + Math.random() * 3,
    };
  };

  useEffect(() => {
    const interval = setInterval(
      () => {
        setCells((prev) => {
          // Remove old cells
          const now = Date.now();
          const filtered = prev.filter((cell) => {
            const cellAge = now - Number.parseInt(cell.id, 36) * 1000;
            return cellAge < 8000; // Keep for 8 seconds max
          });

          // Add new cell if we have space
          if (filtered.length < 12) {
            let newCell = generateRandomCell();
            let attempts = 0;

            // Ensure no overlaps
            while (attempts < 15) {
              const hasConflict = filtered.some((cell) => {
                const dx = cell.x - newCell.x;
                const dy = cell.y - newCell.y;
                return Math.sqrt(dx * dx + dy * dy) < 80; // min spacing
              });

              if (!hasConflict) break;
              newCell = generateRandomCell();
              attempts++;
            }

            return [...filtered, newCell];
          }

          return filtered;
        });
      },
      300 + Math.random() * 700 // Random intervals between 300-1000ms
    );

    return () => clearInterval(interval);
  }, []);

  const getCellStyling = (type: string) => {
    const baseStyles = "border shadow-lg font-medium";

    switch (type) {
      case "company":
        return `${baseStyles} bg-primary/10 border-primary/30 text-primary`;
      case "position":
        return `${baseStyles} bg-secondary/10 border-secondary/30 text-secondary-foreground`;
      case "status":
        return `${baseStyles} bg-accent/10 border-accent/30 text-accent-foreground`;
      case "salary":
        return `${baseStyles} bg-emerald-500/10 border-emerald-500/30 text-emerald-600`;
      case "location":
        return `${baseStyles} bg-orange-500/10 border-orange-500/30 text-orange-600`;
      default:
        return `${baseStyles} bg-muted/20 border-muted/40 text-muted-foreground`;
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-background via-background to-secondary/5">
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/50 to-background opacity-60" />

      {/* Animated background cells */}
      <AnimatePresence>
        {cells.map((cell) => {
          const centerX =
            typeof window !== "undefined" ? window.innerWidth / 2 : 800;
          const centerY =
            typeof window !== "undefined" ? window.innerHeight / 2 : 400;

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
                filter: [
                  "blur(20px)",
                  "blur(8px)",
                  "blur(2px)",
                  "blur(0px)",
                  "blur(1px)",
                ],
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
              <div
                className={`px-3 py-1.5 rounded-lg text-sm ${getCellStyling(
                  cell.type
                )}`}
              >
                {cell.content}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Central content */}
      <div className="absolute inset-0 flex items-center justify-center z-20 overflow-auto">
        <div className="text-center space-y-6">
          <motion.h1
            className="text-3xl sm:text-5xl md:text-7xl font-bold 
             bg-gradient-to-r from-primary via-primary/80 to-primary/60 
             bg-clip-text text-transparent px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Job Application Tracker
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-2xl text-muted-foreground 
             max-w-md sm:max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Track your job applications with style and precision. Watch your
            career opportunities come to life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <button
              onClick={handleStart}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Get Started
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
