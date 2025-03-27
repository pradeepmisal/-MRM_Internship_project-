"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { useToast } from "@/components/ui/use-toast"
import { Calendar, Clock, Plus, Edit, Trash2, Bell } from "lucide-react"

export default function DeadlinesPage() {
  const { toast } = useToast()
  const [isAddDeadlineOpen, setIsAddDeadlineOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")

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

  // New deadline form state
  const [newDeadline, setNewDeadline] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    departments: [] as string[],
    reminderDays: 3,
    reminderHours: 24,
  })

  // Mock deadlines data
  const [deadlines, setDeadlines] = useState([
    {
      id: 1,
      title: "Monthly Reports",
      description: "Submit monthly department reports",
      dueDate: "2025-04-15T17:00:00Z",
      departments: ["All"],
      status: "upcoming",
      reminderDays: 3,
      reminderHours: 24,
    },
    {
      id: 2,
      title: "Quarterly Budget",
      description: "Submit quarterly budget projections",
      dueDate: "2025-04-30T17:00:00Z",
      departments: ["Admin", "Purchase"],
      status: "upcoming",
      reminderDays: 5,
      reminderHours: 24,
    },
    {
      id: 3,
      title: "Safety Inspection",
      description: "Complete monthly safety inspection report",
      dueDate: "2025-05-05T17:00:00Z",
      departments: ["Safety"],
      status: "upcoming",
      reminderDays: 3,
      reminderHours: 24,
    },
    {
      id: 4,
      title: "Equipment Maintenance",
      description: "Submit equipment maintenance logs",
      dueDate: "2025-04-10T17:00:00Z",
      departments: ["Machine Maintenance", "Tool Maintenance"],
      status: "overdue",
      reminderDays: 3,
      reminderHours: 24,
    },
    {
      id: 5,
      title: "Inventory Report",
      description: "Complete monthly inventory report",
      dueDate: "2025-03-31T17:00:00Z",
      departments: ["Store"],
      status: "completed",
      reminderDays: 3,
      reminderHours: 24,
    },
  ])

  const handleAddDeadline = () => {
    // Validate form
    if (!newDeadline.title || !newDeadline.date || !newDeadline.time || newDeadline.departments.length === 0) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all required fields.",
      })
      return
    }

    // Create new deadline
    const newId = Math.max(...deadlines.map((deadline) => deadline.id)) + 1
    const dueDate = `${newDeadline.date}T${newDeadline.time}:00Z`

    setDeadlines([
      ...deadlines,
      {
        id: newId,
        title: newDeadline.title,
        description: newDeadline.description,
        dueDate,
        departments: newDeadline.departments,
        status: "upcoming",
        reminderDays: newDeadline.reminderDays,
        reminderHours: newDeadline.reminderHours,
      },
    ])

    // Reset form and close dialog
    setNewDeadline({
      title: "",
      description: "",
      date: "",
      time: "",
      departments: [],
      reminderDays: 3,
      reminderHours: 24,
    })
    setIsAddDeadlineOpen(false)

    toast({
      title: "Deadline added",
      description: `${newDeadline.title} has been added successfully.`,
    })
  }

  const handleDeleteDeadline = (id: number) => {
    const deadlineToDelete = deadlines.find((deadline) => deadline.id === id)
    setDeadlines(deadlines.filter((deadline) => deadline.id !== id))

    toast({
      title: "Deadline deleted",
      description: `${deadlineToDelete?.title} has been deleted successfully.`,
    })
  }

  const handleSendReminder = (id: number) => {
    const deadline = deadlines.find((d) => d.id === id)

    toast({
      title: "Reminder sent",
      description: `Reminder for "${deadline?.title}" has been sent to ${deadline?.departments.join(", ")}.`,
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-500">Upcoming</Badge>
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Filter deadlines based on status filter
  const filteredDeadlines = deadlines.filter((deadline) => {
    return statusFilter === "all" || deadline.status === statusFilter
  })

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Deadline Management</h1>
          <p className="text-muted-foreground">Set and manage report submission deadlines</p>
        </div>
        <Dialog open={isAddDeadlineOpen} onOpenChange={setIsAddDeadlineOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Deadline
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Deadline</DialogTitle>
              <DialogDescription>Create a new deadline for report submissions</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Deadline Title</Label>
                <Input
                  id="title"
                  placeholder="Enter deadline title"
                  value={newDeadline.title}
                  onChange={(e) => setNewDeadline({ ...newDeadline, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Enter description"
                  value={newDeadline.description}
                  onChange={(e) => setNewDeadline({ ...newDeadline, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Due Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newDeadline.date}
                    onChange={(e) => setNewDeadline({ ...newDeadline, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Due Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newDeadline.time}
                    onChange={(e) => setNewDeadline({ ...newDeadline, time: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Departments</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="all-departments"
                      checked={newDeadline.departments.includes("All")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setNewDeadline({ ...newDeadline, departments: ["All"] })
                        } else {
                          setNewDeadline({ ...newDeadline, departments: [] })
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
                        checked={newDeadline.departments.includes(dept)}
                        disabled={newDeadline.departments.includes("All")}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setNewDeadline({
                              ...newDeadline,
                              departments: [...newDeadline.departments, dept],
                            })
                          } else {
                            setNewDeadline({
                              ...newDeadline,
                              departments: newDeadline.departments.filter((d) => d !== dept),
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
              <div className="space-y-2">
                <Label>Reminder Settings</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="space-y-2">
                    <Label htmlFor="reminder-days">Days Before</Label>
                    <Input
                      id="reminder-days"
                      type="number"
                      min="1"
                      max="30"
                      value={newDeadline.reminderDays}
                      onChange={(e) =>
                        setNewDeadline({ ...newDeadline, reminderDays: Number.parseInt(e.target.value) })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reminder-hours">Hours Before</Label>
                    <Input
                      id="reminder-hours"
                      type="number"
                      min="1"
                      max="72"
                      value={newDeadline.reminderHours}
                      onChange={(e) =>
                        setNewDeadline({ ...newDeadline, reminderHours: Number.parseInt(e.target.value) })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDeadlineOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddDeadline}>Add Deadline</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Deadlines</CardTitle>
          <CardDescription>Manage report submission deadlines and reminders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-6">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Deadlines</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Departments</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reminders</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDeadlines.length > 0 ? (
                  filteredDeadlines.map((deadline) => (
                    <TableRow key={deadline.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{deadline.title}</div>
                          <div className="text-sm text-muted-foreground">{deadline.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{formatDate(deadline.dueDate)}</span>
                        </div>
                      </TableCell>
                      <TableCell>{deadline.departments.join(", ")}</TableCell>
                      <TableCell>{getStatusBadge(deadline.status)}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>
                              {deadline.reminderDays} days, {deadline.reminderHours} hours before
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleSendReminder(deadline.id)}>
                            <Bell className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteDeadline(deadline.id)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No deadlines found.
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

