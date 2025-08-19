const shimmer =
  "before:absolute before:inset-0 before:animate-[shimmer_2s_linear_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/80 before:to-transparent"

// Keyframe animation for shimmer effect - smoother continuous animation
const shimmerKeyframes = `
  @keyframes shimmer {
    0% {
      transform: translateX(-150%);
    }
    100% {
      transform: translateX(150%);
    }
  }
`

function AgGridRowSkeleton() {
  return (
    <div className="grid grid-cols-[60px_1fr_1fr_120px_100px_100px_100px_100px_2fr_100px] gap-0 items-center border-b border-gray-200/60 bg-white hover:bg-gray-50/50 transition-colors">
      {/* Row number column */}
      <div className="px-3 py-3 flex justify-center">
        <div className={`h-4 w-6 rounded bg-gray-200 ${shimmer} relative overflow-hidden`}></div>
      </div>

      {/* Company column */}
      <div className="px-3 py-3">
        <div className={`h-4 w-24 rounded bg-gray-200 ${shimmer} relative overflow-hidden`}></div>
      </div>

      {/* Position column */}
      <div className="px-3 py-3">
        <div className={`h-4 w-32 rounded bg-gray-200 ${shimmer} relative overflow-hidden`}></div>
      </div>

      {/* Applied Date column */}
      <div className="px-3 py-3">
        <div className={`h-4 w-20 rounded bg-gray-200 ${shimmer} relative overflow-hidden`}></div>
      </div>

      {/* Platform column */}
      <div className="px-3 py-3">
        <div className={`h-4 w-16 rounded bg-gray-200 ${shimmer} relative overflow-hidden`}></div>
      </div>

      {/* Status column */}
      <div className="px-3 py-3">
        <div className={`h-6 w-20 rounded-full bg-gray-200 ${shimmer} relative overflow-hidden`}></div>
      </div>

      {/* Location column */}
      <div className="px-3 py-3">
        <div className={`h-4 w-24 rounded bg-gray-200 ${shimmer} relative overflow-hidden`}></div>
      </div>

      {/* Salary column */}
      <div className="px-3 py-3">
        <div className={`h-4 w-16 rounded bg-gray-200 ${shimmer} relative overflow-hidden`}></div>
      </div>

      {/* Notes column - wider */}
      <div className="px-3 py-3">
        <div className={`h-4 w-48 rounded bg-gray-200 ${shimmer} relative overflow-hidden`}></div>
      </div>

      {/* Link column */}
      <div className="px-3 py-3">
        <div className={`h-4 w-12 rounded bg-gray-200 ${shimmer} relative overflow-hidden`}></div>
      </div>
    </div>
  )
}

function AgGridHeaderSkeleton() {
  return (
    <div className="grid grid-cols-[60px_1fr_1fr_120px_100px_100px_100px_100px_2fr_100px] gap-0 items-center bg-white border-b border-gray-200 sticky top-0 z-10">
      {/* Header columns matching the data columns exactly */}
      <div className="px-3 py-4 text-center">
        <div className="text-xs font-medium text-gray-400">#</div>
      </div>
      <div className="px-3 py-4">
        <div className="text-xs font-medium text-gray-400">Company</div>
      </div>
      <div className="px-3 py-4">
        <div className="text-xs font-medium text-gray-400">Position</div>
      </div>
      <div className="px-3 py-4">
        <div className="text-xs font-medium text-gray-400">Applied Date</div>
      </div>
      <div className="px-3 py-4">
        <div className="text-xs font-medium text-gray-400">Platform</div>
      </div>
      <div className="px-3 py-4">
        <div className="text-xs font-medium text-gray-400">Status</div>
      </div>
      <div className="px-3 py-4">
        <div className="text-xs font-medium text-gray-400">Location</div>
      </div>
      <div className="px-3 py-4">
        <div className="text-xs font-medium text-gray-400">Salary</div>
      </div>
      <div className="px-3 py-4">
        <div className="text-xs font-medium text-gray-400">Notes</div>
      </div>
      <div className="px-3 py-4">
        <div className="text-xs font-medium text-gray-400">Link</div>
      </div>
    </div>
  )
}

export function JobGridSkeleton() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: shimmerKeyframes }} />
      <div className="flex flex-col">
        <div className="shadow-xl shadow-neutral-200 rounded-b-xl w-full h-[500px] bg-white border border-gray-200 overflow-hidden">
          {/* ag-Grid wrapper styling */}
          <div className="h-full flex flex-col bg-white rounded-b-xl">
            {/* Header */}
            <AgGridHeaderSkeleton />

            {/* Body with scrollable content */}
            <div className="flex-1 overflow-hidden bg-white">
              <div>
                <AgGridRowSkeleton />
                <AgGridRowSkeleton />
                <AgGridRowSkeleton />
                <AgGridRowSkeleton />
                <AgGridRowSkeleton />
                <AgGridRowSkeleton />
                <AgGridRowSkeleton />
                <AgGridRowSkeleton />
                <AgGridRowSkeleton />
                <AgGridRowSkeleton />
              </div>
            </div>

            {/* Footer/Pagination area */}
            <div className="border-t border-gray-200 bg-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`h-4 w-16 rounded bg-gray-200 ${shimmer} relative overflow-hidden`}></div>
                <div className={`h-4 w-8 rounded bg-gray-200 ${shimmer} relative overflow-hidden`}></div>
                <div className={`h-4 w-12 rounded bg-gray-200 ${shimmer} relative overflow-hidden`}></div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`h-8 w-8 rounded bg-gray-200 ${shimmer} relative overflow-hidden`}></div>
                <div className={`h-8 w-8 rounded bg-gray-200 ${shimmer} relative overflow-hidden`}></div>
                <div className={`h-8 w-8 rounded bg-gray-200 ${shimmer} relative overflow-hidden`}></div>
                <div className={`h-8 w-8 rounded bg-gray-200 ${shimmer} relative overflow-hidden`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// Keep the original table skeleton for backward compatibility
function JobTableRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none">
      <td className="whitespace-nowrap p-4">
        <div className={`h-5 w-5 rounded bg-gray-200 ${shimmer} relative overflow-hidden`}></div>
      </td>
      <td className="whitespace-nowrap p-4">
        <div className={`h-5 w-18 rounded bg-gray-200 ${shimmer} relative overflow-hidden`}></div>
      </td>
      <td className="whitespace-nowrap p-4">
        <div className={`h-5 w-32 rounded bg-gray-200 ${shimmer} relative overflow-hidden`}></div>
      </td>
      <td className="whitespace-nowrap p-4">
        <div className={`h-5 w-20 rounded bg-gray-200 ${shimmer} relative overflow-hidden`}></div>
      </td>
      <td className="whitespace-nowrap p-4">
        <div className={`h-5 w-20 rounded bg-gray-200 ${shimmer} relative overflow-hidden`}></div>
      </td>
      <td className="whitespace-nowrap p-4">
        <div className={`h-5 w-16 rounded bg-gray-200 ${shimmer} relative overflow-hidden`}></div>
      </td>
      <td className="whitespace-nowrap p-4">
        <div className={`h-5 w-28 rounded bg-gray-200 ${shimmer} relative overflow-hidden`}></div>
      </td>
      <td className="whitespace-nowrap p-4">
        <div className={`h-5 w-16 rounded bg-gray-200 ${shimmer} relative overflow-hidden`}></div>
      </td>
      <td className="whitespace-nowrap p-4">
        <div className={`h-5 w-48 rounded bg-gray-200 ${shimmer} relative overflow-hidden`}></div>
      </td>
      <td className="whitespace-nowrap p-4">
        <div className={`h-5 w-12 rounded bg-gray-200 ${shimmer} relative overflow-hidden`}></div>
      </td>
    </tr>
  )
}

export function JobTableSkeleton() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: shimmerKeyframes }} />
      <div className="shadow-xl shadow-neutral-200 rounded-b-xl w-full h-[500px]">
        <div className="inline-block min-w-full align-middle h-full">
          <div className="rounded-b-xl bg-gray-50 p-2 h-full overflow-hidden">
            <table className="min-w-full text-gray-900">
              <thead className="rounded-lg text-left text-sm font-normal bg-white">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium text-gray-400 w-[60px]">
                    #
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium text-gray-400">
                    Company
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium text-gray-400">
                    Position
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium text-gray-400">
                    Applied Date
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium text-gray-400">
                    Platform
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium text-gray-400">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium text-gray-400">
                    Location
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium text-gray-400">
                    Salary
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium text-gray-400">
                    Notes
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium text-gray-400">
                    Link
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <JobTableRowSkeleton />
                <JobTableRowSkeleton />
                <JobTableRowSkeleton />
                <JobTableRowSkeleton />
                <JobTableRowSkeleton />
                <JobTableRowSkeleton />
                <JobTableRowSkeleton />
                <JobTableRowSkeleton />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
