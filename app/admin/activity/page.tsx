"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Download, Filter, LogIn, FileEdit, Eye, Search, User, MapPin, Monitor } from "lucide-react"

export default function ActivityPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [userFilter, setUserFilter] = useState("all")
  const [actionFilter, setActionFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  // Mock activity data
  const activities = [
    {
      id: 1,
      user: "John Doe",
      department: "Production",
      action: "login",
      timestamp: "2025-04-05T14:30:00Z",
      details: "Logged in from Chrome on Windows",
      ip: "192.168.1.1",
      location: "New York, USA",
    },
    {
      id: 2,
      user: "Jane Smith",
      department: "Quality",
      action: "edit",
      timestamp: "2025-04-05T13:45:00Z",
      details: "Edited 'Quality Control Metrics - March 2025'",
      ip: "192.168.1.2",
      location: "Chicago, USA",
    },
    {
      id: 3,
      user: "Robert Johnson",
      department: "Store",
      action: "view",
      timestamp: "2025-04-05T12:15:00Z",
      details: "Viewed 'Inventory Status Report - March 2025'",
      ip: "192.168.1.3",
      location: "Los Angeles, USA",
    },
    {
      id: 4,
      user: "Emily Davis",
      department: "Purchase",
      action: "login",
      timestamp: "2025-04-05T11:20:00Z",
      details: "Logged in from Safari on macOS",
      ip: "192.168.1.4",
      location: "Boston, USA",
    },
    {
      id: 5,
      user: "Michael Wilson",
      department: "Machine Maintenance",
      action: "edit",
      timestamp: "2025-04-05T10:05:00Z",
      details: "Edited 'Machine Maintenance Log - March 2025'",
      ip: "192.168.1.5",
      location: "Seattle, USA",
    },
    {
      id: 6,
      user: "Sarah Brown",
      department: "Tool Maintenance",
      action: "login",
      timestamp: "2025-04-05T09:30:00Z",
      details: "Logged in from Firefox on Windows",
      ip: "192.168.1.6",
      location: "Denver, USA",
    },
    {
      id: 7,
      user: "David Miller",
      department: "Safety",
      action: "edit",
      timestamp: "2025-04-05T08:45:00Z",
      details: "Edited 'Safety Compliance Report - March 2025'",
      ip: "192.168.1.7",
      location: "Miami, USA",
    },
    {
      id: 8,
      user: "Jennifer Taylor",
      department: "Admin",
      action: "view",
      timestamp: "2025-04-05T08:15:00Z",
      details: "Viewed 'Administrative Summary - March 2025'",
      ip: "192.168.1.8",
      location: "San Francisco, USA",
    },
    {
      id: 9,
      user: "John Doe",
      department: "Production",
      action: "edit",
      timestamp: "2025-04-04T16:30:00Z",
      details: "Edited 'Monthly Production Report - March 2025'",
      ip: "192.168.1.1",
      location: "New York, USA",
    },
    {
      id: 10,
      user: "Jane Smith",
      department: "Quality",
      action: "login",
      timestamp: "2025-04-04T15:20:00Z",
      details: "Logged in from Chrome on Windows",
      ip: "192.168.1.2",
      location: "Chicago, USA",
    },
    {
      id: 11,
      user: "Admin User",
      department: "Admin",
      action: "approve",
      timestamp: "2025-04-04T14:10:00Z",
      details: "Approved 'Monthly Production Report - March 2025'",
      ip: "192.168.1.9",
      location: "Austin, USA",
    },
    {
      id: 12,
      user: "Admin User",
      department: "Admin",
      action: "reject",
      timestamp: "2025-04-04T13:45:00Z",
      details: "Rejected 'Machine Maintenance Log - March 2025'",
      ip: "192.168.1.9",
      location: "Austin, USA",
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case "login":
        return <LogIn className="h-4 w-4 text-blue-500" />
      case "edit":
        return <FileEdit className="h-4 w-4 text-amber-500" />
      case "view":
        return <Eye className="h-4 w-4 text-green-500" />
      case "approve":
        return <Badge className="bg-green-500">Approved</Badge>
      case "reject":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return null
    }
  }

  // Filter activities based on search query and filters
  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.department.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesUser = userFilter === "all" || activity.user === userFilter
    const matchesAction = actionFilter === "all" || activity.action === actionFilter

    let matchesDate = true
    if (dateFilter === "today") {
      const today = new Date().toISOString().split("T")[0]
      matchesDate = activity.timestamp.startsWith(today)
    } else if (dateFilter === "yesterday") {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayStr = yesterday.toISOString().split("T")[0]
      matchesDate = activity.timestamp.startsWith(yesterdayStr)
    } else if (dateFilter === "week") {
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      matchesDate = new Date(activity.timestamp) >= oneWeekAgo
    }

    return matchesSearch && matchesUser && matchesAction && matchesDate
  })

  // Get unique users for filter
  const uniqueUsers = Array.from(new Set(activities.map((activity) => activity.user)))

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Activity Tracking</h1>
          <p className="text-muted-foreground">Monitor user activity, logins, and report edits across the system</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Export Logs
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>Comprehensive log of user actions, logins, and system events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search activities..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={userFilter} onValueChange={setUserFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="User" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    {uniqueUsers.map((user) => (
                      <SelectItem key={user} value={user}>
                        {user}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="login">Login</SelectItem>
                  <SelectItem value="edit">Edit</SelectItem>
                  <SelectItem value="view">View</SelectItem>
                  <SelectItem value="approve">Approve</SelectItem>
                  <SelectItem value="reject">Reject</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="week">Past Week</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Location</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActivities.length > 0 ? (
                  filteredActivities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{new Date(activity.timestamp).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{new Date(activity.timestamp).toLocaleTimeString()}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{activity.user}</div>
                            <div className="text-xs text-muted-foreground">{activity.department}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getActionIcon(activity.action)}
                          <span className="capitalize">{activity.action}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{activity.details}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Monitor className="h-4 w-4 text-muted-foreground" />
                          <span>{activity.ip}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{activity.location}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No activities found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

