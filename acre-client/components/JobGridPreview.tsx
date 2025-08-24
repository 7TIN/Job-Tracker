"use client";

// import type { Job } from "@/types/job"
import {
  ClientSideRowModelModule,
  type ColDef,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useRef, useState } from "react";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export interface Job {
  company: string | null;
  position: string | null;
  status: string | null;
  appliedDate: string | null;
  location: string | null;
  salary: string | null;
}

type Props = {
  data: Job[];
};

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
});

export default function JobGridPreview({ data }: Props) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const columnDefs: ColDef<Job>[] = [
    {
      headerName: "#",
      valueGetter: "node.rowIndex + 1",
      pinned: "left",
      maxWidth: 60,
    },
    { headerName: "Company", field: "company", flex: 1, minWidth: 80 },
    { headerName: "Position", field: "position", flex: 1, minWidth: 80 },
    { headerName: "Status", field: "status", flex: 1, minWidth: 80 },
    { headerName: "Applied", field: "appliedDate", flex: 1, minWidth: 80 },
    { headerName: "Location", field: "location", flex: 1, minWidth: 80 },
    { headerName: "Salary", field: "salary", flex: 1, minWidth: 80 },
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div className="relative">
      {/* Complete border lines with extensions and fade */}
      <div className="relative p-2 sm:p-4 md:p-8 lg:p-20 ">
        {/* Top border line with extensions */}
        <div className="absolute top-0 left-0 right-0 h-px">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-600 to-transparent"></div>
          <div className="absolute -left-4 top-0 w-8 h-px bg-gradient-to-r from-transparent to-neutral-600"></div>
          <div className="absolute -right-4 top-0 w-8 h-px bg-gradient-to-l from-transparent to-neutral-600"></div>
        </div>

        {/* Bottom border line with extensions */}
        <div className="absolute bottom-0 left-0 right-0 h-px">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-600 to-transparent"></div>
          <div className="absolute -left-4 bottom-0 w-8 h-px bg-gradient-to-r from-transparent to-neutral-600"></div>
          <div className="absolute -right-4 bottom-0 w-8 h-px bg-gradient-to-l from-transparent to-neutral-600"></div>
        </div>

        {/* Left border line with extensions */}
        <div className="absolute top-0 bottom-0 left-0 w-px">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-600 to-transparent"></div>
          <div className="absolute left-0 -top-4 w-px h-8 bg-gradient-to-b from-transparent to-neutral-600"></div>
          <div className="absolute left-0 -bottom-4 w-px h-8 bg-gradient-to-t from-transparent to-neutral-600"></div>
        </div>

        {/* Right border line with extensions */}
        <div className="absolute top-0 bottom-0 right-0 w-px">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-600 to-transparent"></div>
          <div className="absolute right-0 -top-4 w-px h-8 bg-gradient-to-b from-transparent to-neutral-600"></div>
          <div className="absolute right-0 -bottom-4 w-px h-8 bg-gradient-to-t from-transparent to-neutral-600"></div>
        </div>

        {/* Corner connection points */}
        <div className="absolute top-0 left-0 w-px h-px bg-neutral-600"></div>
        <div className="absolute top-0 right-0 w-px h-px bg-neutral-600"></div>
        <div className="absolute bottom-0 left-0 w-px h-px bg-neutral-600"></div>
        <div className="absolute bottom-0 right-0 w-px h-px bg-neutral-600"></div>

        <div className="relative group animate-float">
          {/* Glow effect */}
          <div className="absolute -inset-2 bg-blue-200 rounded-2xl blur-xl animate-glow-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Main container */}
          <div className="relative table-tilt group-hover:table-tilt-hover transition-smooth rounded-xl overflow-hidden bg-card border border-border">
            {/* Header with gradient */}
            <div className="h-2 w-full gradient-primary" />

            {/* Table container */}
            <div
              ref={containerRef}
              className="w-full h-[320px] sm:h-[400px] relative overflow-x-auto"
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
                  resizable: true,
                  flex: 1,
                  minWidth: 80,
                }}
                suppressHorizontalScroll={false}
                headerHeight={28}
                rowHeight={24}
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
                  transition:
                    "mask-image 0.1s ease-out, -webkit-mask-image 0.1s ease-out",
                }}
              />
            </div>

            {/* Bottom info */}
            <div className="px-4 py-2 text-xs text-muted-foreground border-t border-primary/10">
              <span className="text-primary font-medium">{data.length}</span>{" "}
              job applications tracked
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
