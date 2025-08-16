import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function MemberRecommendationsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50">
      {/* Header Skeleton */}
      <div className="bg-gradient-to-r from-[#1b1f2c] to-[#646d59] text-white sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-32 bg-white/20" />
            <Skeleton className="h-8 w-48 bg-white/20" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>

        {/* Search and Filters Skeleton */}
        <Card className="bg-white/90 backdrop-blur-sm border-2 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <Skeleton className="flex-1 h-10" />
              <Skeleton className="w-full md:w-48 h-10" />
              <Skeleton className="w-full md:w-48 h-10" />
            </div>
          </CardContent>
        </Card>

        {/* Results Summary Skeleton */}
        <div className="mb-6">
          <Skeleton className="h-4 w-48" />
        </div>

        {/* Member Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="bg-white/90 backdrop-blur-sm border-2 shadow-lg">
              <CardContent className="p-6">
                {/* Header with Avatar and Match */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                  <div className="text-center">
                    <Skeleton className="h-6 w-8 mb-1" />
                    <Skeleton className="h-3 w-8" />
                  </div>
                </div>

                {/* Company and Location */}
                <div className="space-y-2 mb-4">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-4 w-20" />
                </div>

                {/* Industry and Connection Status */}
                <div className="flex items-center justify-between mb-4">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                </div>

                {/* Interests */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-14" />
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Skeleton className="flex-1 h-8" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
