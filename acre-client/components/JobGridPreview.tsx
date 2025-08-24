"use client"

// import type { Job } from "@/types/job"
import { ClientSideRowModelModule, type ColDef, ModuleRegistry, themeQuartz } from "ag-grid-community"
import { AgGridReact } from "ag-grid-react"
import { useRef, useState } from "react"

ModuleRegistry.registerModules([ClientSideRowModelModule])


export interface Job {
  company: string | null;
  position: string | null;
  status: string | null; 
  appliedDate: string | null;
  location: string | null;
  salary: string | null;
}

type Props = {
  data: Job[]
}

const previewTheme = themeQuartz.withParams({
  accentColor: "#4F9CF9",
  backgroundColor: "#FFFFFF",
  borderColor: "rgba(0, 0, 0, 0.1)",
  borderRadius: 8,
  fontSize: 12,
  foregroundColor: "#1a1a1a",
  headerBackgroundColor: "#f8fafc",
  headerFontSize: 11,
  headerFontWeight: 500,
  headerTextColor: "#64748b",
  rowBorder: true,
  rowVerticalPaddingScale: 0.7,
  spacing: 4,
  wrapperBorder: true,
})

export default function JobGridPreview({ data }: Props) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const columnDefs: ColDef<Job>[] = [
    { headerName: "#", width: 40, valueGetter: "node.rowIndex + 1", pinned: "left" },
    { headerName: "Company", field: "company", width: 120 },
    { headerName: "Position", field: "position", width: 140 },
    { headerName: "Status", field: "status", width: 100 },
    { headerName: "Applied", field: "appliedDate", width: 90 },
    { headerName: "Location", field: "location", width: 120 },
    { headerName: "Salary", field: "salary", width: 100 },
  ]

    const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  return (
    <div className="relative group animate-float">
      {/* Glow effect */}
      <div className="absolute -inset-4 bg-primary/20 rounded-2xl blur-xl animate-glow-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Main container */}
      <div className="relative table-tilt group-hover:table-tilt-hover transition-smooth shadow-lg rounded-xl overflow-hidden bg-card border border-border">
        {/* Header with gradient */}
        <div className="h-2 w-full gradient-primary" />

        {/* Table container */}
        <div
          ref={containerRef}
          className="h-[320px] w-[640px] relative overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <AgGridReact
            rowData={data}
            columnDefs={columnDefs}
            theme={previewTheme}
            defaultColDef={{
              sortable: false,
              filter: false,
              editable: false,
              resizable: false,
            }}
            suppressHorizontalScroll={true}
            headerHeight={32}
            rowHeight={28}
          />

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(
                180deg,
                transparent 0%,
                transparent 60px,
                rgba(255, 255, 255, 0.1) 80px,
                rgba(255, 255, 255, 0.3) 110px,
                rgba(255, 255, 255, 0.5) 140px,
                rgba(255, 255, 255, 0.7) 170px,
                rgba(255, 255, 255, 0.85) 200px,
                rgba(255, 255, 255, 0.95) 230px
              )`,
              maskImage: isHovering
                ? `radial-gradient(
                circle 80px at ${mousePos.x}px ${mousePos.y}px,
                transparent 0%,
                transparent 30%,
                black 70%,
                black 100%
              )`
                : undefined,
              WebkitMaskImage: isHovering
                ? `radial-gradient(
                circle 80px at ${mousePos.x}px ${mousePos.y}px,
                transparent 0%,
                transparent 30%,
                black 70%,
                black 100%
              )`
                : undefined,
              transition: "mask-image 0.1s ease-out, -webkit-mask-image 0.1s ease-out",
            }}
          />
        </div>

        {/* Bottom info */}
        <div className="px-4 py-2 text-xs text-muted-foreground border-t border-primary/10">
          <span className="text-primary font-medium">{data.length}</span> job applications tracked
        </div>
      </div>
    </div>
  )
}
