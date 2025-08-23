export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Loading Payment...</h2>
        <p className="text-gray-600">Preparing your checkout experience.</p>
      </div>
    </div>
  )
}
