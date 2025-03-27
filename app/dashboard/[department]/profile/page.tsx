"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { Mail, Phone, Building, Shield, Clock, LogIn, MapPin } from "lucide-react"

interface ProfilePageProps {
  params: {
    department: string
  }
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { department } = params
  const { toast } = useToast()
  const departmentFormatted = department.charAt(0).toUpperCase() + department.slice(1).replace("_", " ")

  // Mock user data
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    department: departmentFormatted,
    role: "Department Manager",
    joinDate: "2020-05-15",
    lastActive: "2025-04-05T14:30:00Z",
  })

  // Mock login history
  const loginHistory = [
    { id: 1, date: "2025-04-05T14:30:00Z", ip: "192.168.1.1", device: "Chrome / Windows", location: "New York, USA" },
    { id: 2, date: "2025-04-04T09:15:00Z", ip: "192.168.1.1", device: "Chrome / Windows", location: "New York, USA" },
    { id: 3, date: "2025-04-03T16:45:00Z", ip: "192.168.1.1", device: "Safari / iOS", location: "New York, USA" },
    { id: 4, date: "2025-04-02T11:20:00Z", ip: "192.168.1.1", device: "Chrome / Windows", location: "New York, USA" },
    { id: 5, date: "2025-04-01T08:05:00Z", ip: "192.168.1.1", device: "Chrome / Windows", location: "New York, USA" },
  ]

  // Form state for profile editing
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()

    // Update user data (in a real app, this would be an API call)
    setUserData({
      ...userData,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    })

    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    })
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate password (in a real app, this would be more robust)
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "New password and confirmation password must match.",
      })
      return
    }

    if (formData.newPassword.length < 8) {
      toast({
        variant: "destructive",
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
      })
      return
    }

    // Reset password fields
    setFormData({
      ...formData,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })

    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-2 mb-6">
        <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">View and manage your profile information</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardContent className="pt-6 flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt={userData.name} />
              <AvatarFallback>
                {userData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold">{userData.name}</h2>
            <p className="text-sm text-muted-foreground mb-4">{userData.role}</p>

            <div className="w-full space-y-3 mt-4">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{userData.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{userData.phone}</span>
              </div>
              <div className="flex items-center">
                <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{userData.department} Department</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{userData.role}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">Joined {new Date(userData.joinDate).toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Tabs defaultValue="edit" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="edit">Edit Profile</TabsTrigger>
              <TabsTrigger value="password">Change Password</TabsTrigger>
              <TabsTrigger value="activity">Login History</TabsTrigger>
            </TabsList>

            <TabsContent value="edit" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Edit Profile Information</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input id="department" value={userData.department} disabled />
                      <p className="text-xs text-muted-foreground">
                        Department cannot be changed. Contact admin for department changes.
                      </p>
                    </div>
                    <Button type="submit">Save Changes</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="password" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your account password</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        value={formData.currentPassword}
                        onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={formData.newPassword}
                        onChange={(e) => handleInputChange("newPassword", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      />
                    </div>
                    <Button type="submit">Update Password</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Login History</CardTitle>
                  <CardDescription>Recent account login activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {loginHistory.map((login) => (
                      <div key={login.id} className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-4">
                          <LogIn className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{formatDate(login.date)}</p>
                            <p className="text-xs text-muted-foreground">{login.device}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3 mr-1" />
                              {login.location}
                            </div>
                            <p className="text-xs text-muted-foreground">IP: {login.ip}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

