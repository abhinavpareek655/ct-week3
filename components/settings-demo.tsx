"use client"

import * as React from "react"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"


export function SettingsDemo() {
  const [profile, setProfile] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "user",
    bio: ""
  });

  const [saving, setSaving] = React.useState(false)
  const { toast } = useToast()

  const saveProfile = () => {
    setSaving(true)
    localStorage.setItem("userProfile", JSON.stringify(profile))
    toast({ 
      title: "Profile saved",
      description: "Your profile information has been updated. Reload the page to see changes.",
      variant: "success",
     })
    setSaving(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize the appearance of the dashboard.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Theme</Label>
              <div className="text-sm text-muted-foreground">Select your preferred theme</div>
            </div>
            <ThemeToggle />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Compact Mode</Label>
              <div className="text-sm text-muted-foreground">Use a more compact layout</div>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Sidebar Collapsed</Label>
              <div className="text-sm text-muted-foreground">Keep sidebar collapsed by default</div>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Configure how you receive notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Email Notifications</Label>
              <div className="text-sm text-muted-foreground">Receive notifications via email</div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Push Notifications</Label>
              <div className="text-sm text-muted-foreground">Receive push notifications in browser</div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Marketing Emails</Label>
              <div className="text-sm text-muted-foreground">Receive emails about new features and updates</div>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your profile information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input 
            id="firstName" 
            placeholder="John" 
            value={profile.firstName}
            onChange={(e) => setProfile({...profile, firstName: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input 
            id="lastName" 
            placeholder="Doe" 
            value={profile.lastName}
            onChange={(e) => setProfile({...profile, lastName: e.target.value})}
          />
        </div>
          </div>
          <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          type="email" 
          placeholder="john@example.com"
          value={profile.email}
          onChange={(e) => setProfile({...profile, email: e.target.value})} 
        />
          </div>
          <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select value={profile.role} onValueChange={(value) => setProfile({...profile, role: value})}>
          <SelectTrigger>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Administrator</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
          </div>
          <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea 
          id="bio" 
          placeholder="Tell us a little bit about yourself" 
          className="resize-none"
          value={profile.bio}
          onChange={(e) => setProfile({...profile, bio: e.target.value})}
        />
          </div>
          <Button onClick={saveProfile} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
