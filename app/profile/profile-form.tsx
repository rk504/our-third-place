"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface Profile {
  id: string
  full_name?: string
  city?: string
  bio?: string
  linkedin_url?: string
}

export default function ProfileForm({ profile }: { profile: Profile | null }) {
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    city: profile?.city || "",
    bio: profile?.bio || "",
    linkedin_url: profile?.linkedin_url || "",
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createSupabaseBrowserClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          email: user.email,
          ...formData,
        })

      if (error) throw error

      toast.success("Profile updated!")
      router.push("/dashboard")
    } catch (error) {
      console.error("Profile update error:", error)
      toast.error("Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <Input
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">City</label>
            <Input
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              placeholder="Your city"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Bio</label>
            <Textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Tell us about yourself"
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
            <Input
              value={formData.linkedin_url}
              onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
              placeholder="https://linkedin.com/in/yourprofile"
              type="url"
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Saving..." : "Save Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}