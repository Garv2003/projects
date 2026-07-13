import React from 'react'
import { Skeleton } from "~/components/ui/skeleton"

export default function GridLoader({ num }: { num: number }) {
  return (
    <div>
      <div className="grid h-full min-h-[58vh] w-[98vw] grid-cols-1 gap-5 p-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array(num).fill(0).map((_, index) => (
          <CardShadow key={index} />
        ))}
      </div>
    </div>
  )
}


const CardShadow = () => {
  return (
    <div className="mx-auto w-80 bg-white dark:bg-black">
      <div className="group relative h-full overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-xl transition duration-200 dark:border-gray-700 dark:bg-black">
        <div className="relative w-full overflow-hidden rounded-tl-lg rounded-tr-lg bg-gray-100 dark:bg-black">
          <Skeleton className="h-50 sm:h-40 w-full md:h-60 lg:h-80 xl:h-70" />
        </div>
        <div className="p-4">
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />

          <Skeleton className="h-3 w-full mb-2 mt-6" />
          <Skeleton className="h-3 w-full mb-2" />
          <Skeleton className="h-3 w-full mb-2" />

          <div className="mt-10 flex flex-row items-center justify-between">
            <Skeleton className="h-4 w-40 mb-2" />
            <Skeleton className="h-10 w-20 mb-2" />
          </div>
        </div>
      </div>
    </div>
  )
}


