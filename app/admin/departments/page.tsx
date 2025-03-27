"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { Building, Users, FileText, BarChart3, Plus, Edit, Trash2, CheckCircle, XCircle } from "lucide-react"

export default function DepartmentsPage() {
  const { toast } = useToast()
  const [isAddDepartmentOpen, setIsAddDepartmentOpen] = useState(false)

  // New department form state
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    manager: "",
    description: "",
  })

  // Mock departments data
  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: "Production",
      manager: "John Doe",
      userCount: 12,
      reportCount: 24,
      completionRate: 85,
      status: "active",
      description: "Handles all production activities and manufacturing processes",
    },
    {
      id: 2,
      name: "Quality",
      manager: "Jane Smith",
      userCount: 8,
      reportCount: 18,
      completionRate: 92,
      status: "active",
      description: "Responsible for quality control and assurance",
    },
    {
      id: 3,
      name: "Store",
      manager: "Robert Johnson",
      userCount: 10,
      reportCount: 20,
      completionRate: 78,
      status: "active",
      description: "Manages inventory and storage of materials and products",
    },
    {
      id: 4,
      name: "Purchase",
      manager: "Emily Davis",
      userCount: 6,
      reportCount: 15,
      completionRate: 88,
      status: "active",
      description: "Handles procurement and vendor relationships",
    },
    {
      id: 5,
      name: "Machine Maintenance",
      manager: "Michael Wilson",
      userCount: 9,
      reportCount: 22,
      completionRate: 80,
      status: "active",
      description: "Responsible for maintaining and repairing production machinery",
    },
    {
      id: 6,
      name: "Tool Maintenance",
      manager: "Sarah Brown",
      userCount: 7,
      reportCount: 16,
      completionRate: 82,
      status: "active",
      description: "Manages tools and equipment maintenance",
    },
    {
      id: 7,
      name: "Safety",
      manager: "David Miller",
      userCount: 5,
      reportCount: 12,
      completionRate: 95,
      status: "active",
      description: "Ensures workplace safety and compliance with regulations",
    },
    {
      id: 8,
      name: "Admin",
      manager: "Jennifer Taylor",
      userCount: 4,
      reportCount: 10,
      completionRate: 90,
      status: "active",
      description: "Administrative functions and system management",
    },
  ])

  const handleAddDepartment = () => {
    // Validate form
    if (!newDepartment.name || !newDepartment.manager) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all required fields.",
      })
      return
    }

    // Create new department
    const newId = Math.max(...departments.map((dept) => dept.id)) + 1

    setDepartments([
      ...departments,
      {
        id: newId,
        name: newDepartment.name,
        manager: newDepartment.manager,
        userCount: 0,
        reportCount: 0,
        completionRate: 0,
        status: "active",
        description: newDepartment.description,
      },
    ])

    // Reset form and close dialog
    setNewDepartment({
      name: "",
      manager: "",
      description: "",
    })
    setIsAddDepartmentOpen(false)

    toast({
      title: "Department added",
      description: `${newDepartment.name} department has been added successfully.`,
    })
  }

  const handleToggleDepartmentStatus = (id: number) => {
    setDepartments(
      departments.map((dept) =>
        dept.id === id ? { ...dept, status: dept.status === "active" ? "inactive" : "active" } : dept,
      ),
    )

    const dept = departments.find((dept) => dept.id === id)
    const newStatus = dept?.status === "active" ? "inactive" : "active"

    toast({
      title: "Department status updated",
      description: `${dept?.name} department is now ${newStatus}.`,
    })
  }

  const getCompletionRateColor = (rate: number) => {
    if (rate >= 90) return "text-green-500"
    if (rate >= 70) return "text-amber-500"
    return "text-red-500"
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Department Management</h1>
          <p className="text-muted-foreground">Manage departments and monitor their performance</p>
        </div>
        <Dialog open={isAddDepartmentOpen} onOpenChange={setIsAddDepartmentOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Department
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Department</DialogTitle>
              <DialogDescription>Create a new department in the system</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Department Name</Label>
                <Input
                  id="name"
                  placeholder="Enter department name"
                  value={newDepartment.name}
                  onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="manager">Department Manager</Label>
                <Input
                  id="manager"
                  placeholder="Enter manager name"
                  value={newDepartment.manager}
                  onChange={(e) => setNewDepartment({ ...newDepartment, manager: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Enter department description"
                  value={newDepartment.description}
                  onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDepartmentOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddDepartment}>Add Department</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Departments</CardTitle>
          <CardDescription>Overview of all departments and their performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Department</TableHead>
                  <TableHead>Manager</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Reports</TableHead>
                  <TableHead>Completion Rate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departments.map((dept) => (
                  <TableRow key={dept.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{dept.name}</div>
                          <div className="text-xs text-muted-foreground">{dept.description}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{dept.manager}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{dept.userCount}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>{dept.reportCount}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        <span className={getCompletionRateColor(dept.completionRate)}>{dept.completionRate}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={dept.status === "active" ? "default" : "secondary"}>
                        {dept.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleToggleDepartmentStatus(dept.id)}>
                          {dept.status === "active" ? (
                            <XCircle className="h-4 w-4 text-red-500" />
                          ) : (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

