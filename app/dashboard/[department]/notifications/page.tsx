"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bell, Calendar, CheckCircle, Clock, FileText, AlertTriangle, X } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

interface NotificationsPageProps {
  params: {
    department: string
  }
}

export default function NotificationsPage({ params }: NotificationsPageProps) {
  const { department } = params
  const { toast } = useToast()
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Monthly Report Due Soon",
      message: "Your monthly report is due in 3 days. Please complete it before the deadline.",
      type: "deadline",
      date: "2025-04-12T10:00:00Z",
      read: false,
    },
    {
      id: 2,
      title: "Report Approved",
      message: "Your February 2025 report has been approved by the admin.",
      type: "approval",
      date: "2025-03-28T14:30:00Z",
      read: true,
    },
    {
      id: 3,
      title: "New Comment on Report",
      message: "Jane Smith commented on your March 2025 report: 'Please update the production numbers in section 3.'",
      type: "comment",
      date: "2025-04-02T09:15:00Z",
      read: false,
    },
    {
      id: 4,
      title: "Reminder: Quality Metrics",
      message: "Don't forget to include the updated quality metrics in your monthly report.",
      type: "reminder",
      date: "2025-04-01T11:20:00Z",
      read: true,
    },
    {
      id: 5,
      title: "System Maintenance",
      message: "The system will be down for maintenance on April 10, 2025 from 22:00 to 23:00 UTC.",
      type: "system",
      date: "2025-04-05T16:45:00Z",
      read: false,
    },
  ])

  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    inApp: true,
    deadlineReminders: true,
    commentNotifications: true,
    approvalUpdates: true,
    systemAnnouncements: true,
  })

  const [reminderForm, setReminderForm] = useState({
    title: "",
    date: "",
    time: "",
  })

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
    toast({
      title: "Notification marked as read",
      description: "The notification has been marked as read.",
    })
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
    toast({
      title: "Notification deleted",
      description: "The notification has been deleted.",
    })
  }

  const handleSettingChange = (setting: string, value: boolean) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: value,
    })
    toast({
      title: "Settings updated",
      description: "Your notification settings have been updated.",
    })
  }

  const handleReminderSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!reminderForm.title || !reminderForm.date || !reminderForm.time) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all fields for your reminder.",
      })
      return
    }

    const newNotification = {
      id: notifications.length + 1,
      title: reminderForm.title,
      message: `Personal reminder: ${reminderForm.title}`,
      type: "reminder",
      date: `${reminderForm.date}T${reminderForm.time}:00Z`,
      read: false,
    }

    setNotifications([newNotification, ...notifications])
    setReminderForm({
      title: "",
      date: "",
      time: "",
    })

    toast({
      title: "Reminder created",
      description: "Your personal reminder has been created.",
    })
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "deadline":
        return <Calendar className="h-5 w-5 text-amber-500" />
      case "approval":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "comment":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "reminder":
        return <Clock className="h-5 w-5 text-purple-500" />
      case "system":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">Manage your notifications and reminders</p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          {unreadCount} unread
        </Badge>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="deadlines">Deadlines</TabsTrigger>
          <TabsTrigger value="reminders">Reminders</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6 space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <Card key={notification.id} className={notification.read ? "opacity-75" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      {getNotificationIcon(notification.type)}
                      <div>
                        <h3 className="font-medium">
                          {notification.title}
                          {!notification.read && (
                            <Badge variant="secondary" className="ml-2">
                              New
                            </Badge>
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">{formatDate(notification.date)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!notification.read && (
                        <Button variant="outline" size="sm" onClick={() => markAsRead(notification.id)}>
                          Mark as read
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => deleteNotification(notification.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center p-12 border rounded-lg">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No notifications</h3>
              <p className="text-muted-foreground text-center">You don't have any notifications at the moment.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="unread" className="mt-6 space-y-4">
          {notifications.filter((n) => !n.read).length > 0 ? (
            notifications
              .filter((n) => !n.read)
              .map((notification) => (
                <Card key={notification.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        {getNotificationIcon(notification.type)}
                        <div>
                          <h3 className="font-medium">
                            {notification.title}
                            <Badge variant="secondary" className="ml-2">
                              New
                            </Badge>
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-2">{formatDate(notification.date)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => markAsRead(notification.id)}>
                          Mark as read
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteNotification(notification.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
          ) : (
            <div className="flex flex-col items-center justify-center p-12 border rounded-lg">
              <CheckCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">All caught up!</h3>
              <p className="text-muted-foreground text-center">You've read all your notifications.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="deadlines" className="mt-6 space-y-4">
          {notifications.filter((n) => n.type === "deadline").length > 0 ? (
            notifications
              .filter((n) => n.type === "deadline")
              .map((notification) => (
                <Card key={notification.id} className={notification.read ? "opacity-75" : ""}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <Calendar className="h-5 w-5 text-amber-500" />
                        <div>
                          <h3 className="font-medium">
                            {notification.title}
                            {!notification.read && (
                              <Badge variant="secondary" className="ml-2">
                                New
                              </Badge>
                            )}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-2">{formatDate(notification.date)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <Button variant="outline" size="sm" onClick={() => markAsRead(notification.id)}>
                            Mark as read
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" onClick={() => deleteNotification(notification.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
          ) : (
            <div className="flex flex-col items-center justify-center p-12 border rounded-lg">
              <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No deadline notifications</h3>
              <p className="text-muted-foreground text-center">
                You don't have any deadline notifications at the moment.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="reminders" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Create Personal Reminder</CardTitle>
                <CardDescription>Set a reminder for yourself about important tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleReminderSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Reminder Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter reminder title"
                      value={reminderForm.title}
                      onChange={(e) => setReminderForm({ ...reminderForm, title: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={reminderForm.date}
                        onChange={(e) => setReminderForm({ ...reminderForm, date: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={reminderForm.time}
                        onChange={(e) => setReminderForm({ ...reminderForm, time: e.target.value })}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Create Reminder
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Reminders</CardTitle>
                <CardDescription>Personal reminders you've created</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {notifications.filter((n) => n.type === "reminder").length > 0 ? (
                  notifications
                    .filter((n) => n.type === "reminder")
                    .map((notification) => (
                      <div key={notification.id} className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5 text-purple-500" />
                          <div>
                            <p className="font-medium text-sm">{notification.title}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(notification.date)}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => deleteNotification(notification.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 border rounded-lg">
                    <Clock className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground text-center">You haven't created any reminders yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Customize how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notification Channels</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notificationSettings.email}
                    onCheckedChange={(checked) => handleSettingChange("email", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="inapp-notifications">In-App Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications within the application</p>
                  </div>
                  <Switch
                    id="inapp-notifications"
                    checked={notificationSettings.inApp}
                    onCheckedChange={(checked) => handleSettingChange("inApp", checked)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notification Types</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="deadline-reminders">Deadline Reminders</Label>
                    <p className="text-sm text-muted-foreground">Notifications about upcoming report deadlines</p>
                  </div>
                  <Switch
                    id="deadline-reminders"
                    checked={notificationSettings.deadlineReminders}
                    onCheckedChange={(checked) => handleSettingChange("deadlineReminders", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="comment-notifications">Comment Notifications</Label>
                    <p className="text-sm text-muted-foreground">Notifications when someone comments on your reports</p>
                  </div>
                  <Switch
                    id="comment-notifications"
                    checked={notificationSettings.commentNotifications}
                    onCheckedChange={(checked) => handleSettingChange("commentNotifications", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="approval-updates">Approval Updates</Label>
                    <p className="text-sm text-muted-foreground">Notifications about report approval status changes</p>
                  </div>
                  <Switch
                    id="approval-updates"
                    checked={notificationSettings.approvalUpdates}
                    onCheckedChange={(checked) => handleSettingChange("approvalUpdates", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="system-announcements">System Announcements</Label>
                    <p className="text-sm text-muted-foreground">Notifications about system maintenance and updates</p>
                  </div>
                  <Switch
                    id="system-announcements"
                    checked={notificationSettings.systemAnnouncements}
                    onCheckedChange={(checked) => handleSettingChange("systemAnnouncements", checked)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

