import { createSupabaseServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import ProfileForm from "./profile-form"

export default async function ProfilePage() {
  const supabase = await createSupabaseServerClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-amber-50 to-orange-100 p-4">
      <div className="container mx-auto max-w-2xl py-8">
        <h1 className="text-3xl font-bold text-[#1b1f2c] mb-8">Edit Profile</h1>
        <ProfileForm profile={profile} />
      </div>
    </div>
  )
}