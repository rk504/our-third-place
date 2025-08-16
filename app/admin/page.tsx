import { createSupabaseServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Edit } from "lucide-react"
import Link from "next/link"

export default async function AdminPage() {
  const supabase = await createSupabaseServerClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  // Check if user is admin or host
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (!profile || !["admin", "host"].includes(profile.role)) {
    redirect("/dashboard")
  }

  const { data: events } = await supabase
    .from("events")
    .select(`
      *,
      profiles!events_host_id_fkey(full_name),
      event_registrations(count)
    `)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-amber-50 to-orange-100 p-4">
      <div className="container mx-auto max-w-6xl py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#1b1f2c]">Admin Dashboard</h1>
          <Button asChild>
            <Link href="/admin/events/new">Create Event</Link>
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>All Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Title</th>
                    <th className="text-left p-2">Date</th>
                    <th className="text-left p-2">Location</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Attendees</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events?.map((event) => (
                    <tr key={event.id} className="border-b">
                      <td className="p-2">{event.title}</td>
                      <td className="p-2">
                        {new Date(event.starts_at).toLocaleDateString()}
                      </td>
                      <td className="p-2">{event.location}</td>
                      <td className="p-2">
                        <Badge className={
                          event.status === "published" ? "bg-green-100 text-green-800" :
                          event.status === "draft" ? "bg-gray-100 text-gray-800" :
                          "bg-red-100 text-red-800"
                        }>
                          {event.status}
                        </Badge>
                      </td>
                      <td className="p-2">
                        {event.event_registrations?.[0]?.count || 0}/{event.max_attendees}
                      </td>
                      <td className="p-2">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/admin/events/${event.id}`}><Edit /></Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}