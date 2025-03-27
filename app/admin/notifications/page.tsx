"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import {
  Bell,
  Calendar,
  Clock,
  Send,
  AlertTriangle,
  CheckCircle,
  Users,
  Settings,
  Mail,
  MessageSquare,
} from "lucide-react"

export default function NotificationsPage() {
  const { toast } = useToast()
  const [isCreateNotificationOpen, setIsCreateNotificationOpen] = useState(false)

  // Mock departments
  const departments = [
    "Production",
    "Quality",
    "Store",
    "Purchase",
    "Machine Maintenance",
    "Tool Maintenance",
    "Safety",
    "Admin",
  ]

  // New notification form state
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    type: "announcement",
    departments: [] as string[],
    priority: "normal",
  })

  // Mock sent notifications
  const [sentNotifications, setSentNotifications] = useState([
    {
      id: 1,
      title: "Monthly Reports Due Soon",
      message:
        "This is a reminder that monthly reports are due in 3 days. Please ensure all sections are completed and submitted before the deadline.",
      type: "deadline",
      sentTo: ["All"],
      sentAt: "2025-04-05T10:00:00Z",
      priority: "high",
      status: "sent",
    },
    {
      id: 2,
      title: "System Maintenance",
      message:
        "The system will be down for maintenance on April 10, 2025 from 22:00 to 23:00 UTC. Please save your work before this time.",
      type: "system",
      sentTo: ["All"],
      sentAt: "2025-04-05T09:30:00Z",
      priority: "normal",
      status: "sent",
    },
    {
      id: 3,
      title: "Quality Report Feedback",
      message: "Please review the feedback on your latest quality report and make the necessary adjustments.",
      type: "feedback",
      sentTo: ["Quality"],
      sentAt: "2025-04-04T15:45:00Z",
      priority: "normal",
      status: "sent",
    },
    {
      id: 4,
      title: "Overdue Report Alert",
      message: "Your Equipment Maintenance report is now overdue. Please submit it as soon as possible.",
      type: "overdue",
      sentTo: ["Machine Maintenance", "Tool Maintenance"],
      sentAt: "2025-04-04T14:20:00Z",
      priority: "high",
      status: "sent",
    },
    {
      id: 5,
      title: "New Template Available",
      message:
        "A new report template for safety inspections is now available. Please use this template for your next report.",
      type: "announcement",
      sentTo: ["Safety"],
      sentAt: "2025-04-03T11:10:00Z",
      priority: "normal",
      status: "sent",
    },
  ])

  // Mock automated notifications
  const automatedNotifications = [
    {
      id: 1,
      title: "Deadline Reminder",
      description: "Sent 3 days before report deadlines",
      status: "active",
      lastRun: "2025-04-05T08:00:00Z",
      recipients: "All departments with pending deadlines",
    },
    {
      id: 2,
      title: "24-Hour Reminder",
      description: "Sent 24 hours before report deadlines",
      status: "active",
      lastRun: "2025-04-05T08:00:00Z",
      recipients: "All departments with pending deadlines",
    },
    {
      id: 3,
      title: "Overdue Report Alert",
      description: "Sent when reports are past their deadline",
      status: "active",
      lastRun: "2025-04-04T08:00:00Z",
      recipients: "Departments with overdue reports and their managers",
    },
    {
      id: 4,
      title: "Report Approval Notification",
      description: "Sent when a report is approved or rejected",
      status: "active",
      lastRun: "2025-04-04T15:30:00Z",
      recipients: "Report submitters",
    },
    {
      id: 5,
      title: "Weekly Activity Summary",
      description: "Weekly summary of department activities",
      status: "inactive",
      lastRun: "2025-03-31T08:00:00Z",
      recipients: "Department managers and admin",
    },
  ]

  const handleCreateNotification = () => {
    // Validate form
    if (!newNotification.title || !newNotification.message || newNotification.departments.length === 0) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all required fields.",
      })
      return
    }

    // Create new notification
    const newId = Math.max(...sentNotifications.map((notification) => notification.id)) + 1

    setSentNotifications([
      {
        id: newId,
        title: newNotification.title,
        message: newNotification.message,
        type: newNotification.type,
        sentTo: newNotification.departments,
        sentAt: new Date().toISOString(),
        priority: newNotification.priority,
        status: "sent",
      },
      ...sentNotifications,
    ])

    // Reset form and close dialog
    setNewNotification({
      title: "",
      message: "",
      type: "announcement",
      departments: [],
      priority: "normal",
    })
    setIsCreateNotificationOpen(false)

    toast({
      title: "Notification sent",
      description: `Your notification has been sent to ${newNotification.departments.join(", ")}.`,
    })
  }

  const handleToggleAutomatedNotification = (id: number) => {
    const updatedNotifications = automatedNotifications.map((notification) =>
      notification.id === id
        ? { ...notification, status: notification.status === "active" ? "inactive" : "active" }
        : notification,
    )

    // In a real app, this would update the state
    // For this demo, we'll just show a toast
    const notification = automatedNotifications.find((n) => n.id === id)
    const newStatus = notification?.status === "active" ? "inactive" : "active"

    toast({
      title: "Notification status updated",
      description: `"${notification?.title}" is now ${newStatus}.`,
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  const getNotificationTypeIcon = (type: string) => {
    switch (type) {
      case "deadline":
        return <Calendar className="h-4 w-4 text-amber-500" />
      case "system":
        return <Settings className="h-4 w-4 text-blue-500" />
      case "feedback":
        return <MessageSquare className="h-4 w-4 text-purple-500" />
      case "overdue":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "announcement":
        return <Bell className="h-4 w-4 text-green-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "normal":
        return <Badge variant="secondary">Normal</Badge>
      case "low":
        return <Badge variant="outline">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notification Management</h1>
          <p className="text-muted-foreground">Manage system notifications and automated alerts</p>
        </div>
        <Dialog open={isCreateNotificationOpen} onOpenChange={setIsCreateNotificationOpen}>
          <DialogTrigger asChild>
            <Button>
              <Send className="mr-2 h-4 w-4" /> Send Notification
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Send Notification</DialogTitle>
              <DialogDescription>Create and send a notification to selected departments</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Notification Title</Label>
                <Input
                  id="title"
                  placeholder="Enter notification title"
                  value={newNotification.title}
                  onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Enter notification message"
                  className="min-h-[100px]"
                  value={newNotification.message}
                  onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Notification Type</Label>
                  <Select
                    value={newNotification.type}
                    onValueChange={(value) => setNewNotification({ ...newNotification, type: value })}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="announcement">Announcement</SelectItem>
                      <SelectItem value="deadline">Deadline</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newNotification.priority}
                    onValueChange={(value) => setNewNotification({ ...newNotification, priority: value })}
                  >
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Departments</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="all-departments"
                      checked={newNotification.departments.includes("All")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setNewNotification({ ...newNotification, departments: ["All"] })
                        } else {
                          setNewNotification({ ...newNotification, departments: [] })
                        }
                      }}
                    />
                    <label
                      htmlFor="all-departments"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      All Departments
                    </label>
                  </div>
                  {departments.map((dept) => (
                    <div key={dept} className="flex items-center space-x-2">
                      <Checkbox
                        id={`dept-${dept}`}
                        checked={newNotification.departments.includes(dept)}
                        disabled={newNotification.departments.includes("All")}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setNewNotification({
                              ...newNotification,
                              departments: [...newNotification.departments, dept],
                            })
                          } else {
                            setNewNotification({
                              ...newNotification,
                              departments: newNotification.departments.filter((d) => d !== dept),
                            })
                          }
                        }}
                      />
                      <label
                        htmlFor={`dept-${dept}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {dept}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateNotificationOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateNotification}>Send Notification</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="sent" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sent">Sent Notifications</TabsTrigger>
          <TabsTrigger value="automated">Automated Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="sent" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Sent Notifications</CardTitle>
              <CardDescription>History of notifications sent to departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Notification</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Sent To</TableHead>
                      <TableHead>Sent At</TableHead>
                      <TableHead>Priority</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sentNotifications.length > 0 ? (
                      sentNotifications.map((notification) => (
                        <TableRow key={notification.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{notification.title}</div>
                              <div className="text-sm text-muted-foreground line-clamp-1">{notification.message}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getNotificationTypeIcon(notification.type)}
                              <span className="capitalize">{notification.type}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{notification.sentTo.join(", ")}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{formatDate(notification.sentAt)}</span>
                            </div>
                          </TableCell>
                          <TableCell>{getPriorityBadge(notification.priority)}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          No notifications sent.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automated" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Automated Notifications</CardTitle>
              <CardDescription>Configure system-generated notifications and reminders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Notification</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Recipients</TableHead>
                      <TableHead>Last Run</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {automatedNotifications.map((notification) => (
                      <TableRow key={notification.id}>
                        <TableCell>
                          <div className="font-medium">{notification.title}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{notification.description}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{notification.recipients}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{formatDate(notification.lastRun)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={notification.status === "active" ? "default" : "secondary"}
                            className={notification.status === "active" ? "bg-green-500" : ""}
                          >
                            {notification.status === "active" ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleAutomatedNotification(notification.id)}
                          >
                            {notification.status === "active" ? "Disable" : "Enable"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Automated notifications are sent based on system events and configured schedules. The system
                automatically sends reminders for upcoming deadlines and alerts for overdue reports.
              </p>
            </CardFooter>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Notification Workflow</CardTitle>
              <CardDescription>How automated notifications are processed and delivered</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Deadline Setup</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Admins configure report deadlines for departments. Each deadline includes the due date, affected
                      departments, and notification settings.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                    <Bell className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Reminder Triggers</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      The system automatically sends notifications at configured intervals:
                    </p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                      <li>First reminder: 3 days before the deadline</li>
                      <li>Second reminder: 24 hours before the deadline</li>
                      <li>Escalation: Alerts to managers if reports are overdue</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Delivery Channels</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Notifications are delivered through multiple channels:
                    </p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                      <li>Email (primary channel)</li>
                      <li>In-app notifications (always enabled)</li>
                      <li>SMS notifications (optional, for high-priority alerts)</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Tracking & Confirmation</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      The system tracks notification delivery and read status. Users can mark notifications as read, and
                      the system logs all notification activity for audit purposes.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

