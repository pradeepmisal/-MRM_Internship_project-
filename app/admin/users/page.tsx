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
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { Search, Edit, Trash2, UserPlus, CheckCircle, XCircle, Filter } from "lucide-react"

export default function UsersPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
    password: "",
  })

  // Mock user data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@company.com",
      department: "Production",
      role: "Manager",
      status: "active",
      lastActive: "2025-04-05T14:30:00Z",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@company.com",
      department: "Quality",
      role: "Supervisor",
      status: "active",
      lastActive: "2025-04-05T10:15:00Z",
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert.johnson@company.com",
      department: "Store",
      role: "Staff",
      status: "active",
      lastActive: "2025-04-04T16:45:00Z",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@company.com",
      department: "Purchase",
      role: "Manager",
      status: "inactive",
      lastActive: "2025-03-28T09:20:00Z",
    },
    {
      id: 5,
      name: "Michael Wilson",
      email: "michael.wilson@company.com",
      department: "Machine Maintenance",
      role: "Technician",
      status: "active",
      lastActive: "2025-04-05T08:10:00Z",
    },
    {
      id: 6,
      name: "Sarah Brown",
      email: "sarah.brown@company.com",
      department: "Tool Maintenance",
      role: "Supervisor",
      status: "active",
      lastActive: "2025-04-04T11:30:00Z",
    },
    {
      id: 7,
      name: "David Miller",
      email: "david.miller@company.com",
      department: "Safety",
      role: "Officer",
      status: "active",
      lastActive: "2025-04-03T15:45:00Z",
    },
    {
      id: 8,
      name: "Jennifer Taylor",
      email: "jennifer.taylor@company.com",
      department: "Admin",
      role: "Administrator",
      status: "active",
      lastActive: "2025-04-05T13:20:00Z",
    },
  ])

  const handleAddUser = () => {
    // Validate form
    if (!newUser.name || !newUser.email || !newUser.department || !newUser.role || !newUser.password) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all fields.",
      })
      return
    }

    // Add new user
    const newId = Math.max(...users.map((user) => user.id)) + 1
    setUsers([
      ...users,
      {
        id: newId,
        name: newUser.name,
        email: newUser.email,
        department: newUser.department,
        role: newUser.role,
        status: "active",
        lastActive: new Date().toISOString(),
      },
    ])

    // Reset form and close dialog
    setNewUser({
      name: "",
      email: "",
      department: "",
      role: "",
      password: "",
    })
    setIsAddUserOpen(false)

    toast({
      title: "User added",
      description: `${newUser.name} has been added successfully.`,
    })
  }

  const handleDeleteUser = (id: number) => {
    const userToDelete = users.find((user) => user.id === id)
    setUsers(users.filter((user) => user.id !== id))

    toast({
      title: "User deleted",
      description: `${userToDelete?.name} has been deleted successfully.`,
    })
  }

  const handleToggleStatus = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user,
      ),
    )

    const user = users.find((user) => user.id === id)
    const newStatus = user?.status === "active" ? "inactive" : "active"

    toast({
      title: "Status updated",
      description: `${user?.name}'s status has been set to ${newStatus}.`,
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  // Filter users based on search query and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDepartment = departmentFilter === "all" || user.department === departmentFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesDepartment && matchesStatus
  })

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">Manage users and their access to the system</p>
        </div>
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" /> Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Create a new user account with department access</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter full name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={newUser.department}
                    onValueChange={(value) => setNewUser({ ...newUser, department: value })}
                  >
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Production">Production</SelectItem>
                      <SelectItem value="Quality">Quality</SelectItem>
                      <SelectItem value="Store">Store</SelectItem>
                      <SelectItem value="Purchase">Purchase</SelectItem>
                      <SelectItem value="Machine Maintenance">Machine Maintenance</SelectItem>
                      <SelectItem value="Tool Maintenance">Tool Maintenance</SelectItem>
                      <SelectItem value="Safety">Safety</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Supervisor">Supervisor</SelectItem>
                      <SelectItem value="Staff">Staff</SelectItem>
                      <SelectItem value="Technician">Technician</SelectItem>
                      <SelectItem value="Officer">Officer</SelectItem>
                      <SelectItem value="Administrator">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Initial Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter initial password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddUser}>Add User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>Manage user accounts and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Production">Production</SelectItem>
                    <SelectItem value="Quality">Quality</SelectItem>
                    <SelectItem value="Store">Store</SelectItem>
                    <SelectItem value="Purchase">Purchase</SelectItem>
                    <SelectItem value="Machine Maintenance">Machine Maintenance</SelectItem>
                    <SelectItem value="Tool Maintenance">Tool Maintenance</SelectItem>
                    <SelectItem value="Safety">Safety</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === "active" ? "default" : "secondary"}>
                          {user.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(user.lastActive)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleToggleStatus(user.id)}>
                            {user.status === "active" ? (
                              <XCircle className="h-4 w-4 text-red-500" />
                            ) : (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteUser(user.id)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No users found.
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

