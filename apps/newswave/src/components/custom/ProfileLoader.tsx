import React from 'react'
import { Skeleton } from "~/components/ui/skeleton"

export default function ProfileLoader() {
  return (
    <div className="flex w-full flex-col items-center justify-center p-8">
      <Skeleton className="h-24 w-24 rounded-full" />
      <Skeleton className="h-3 w-30" />
      <Skeleton className="h-3 w-40 mt-2" />
      <Skeleton className="h-3 w-60 mt-2" />
      <Skeleton className="h-3 w-60 mt-2" />
    </div>
  )
}
