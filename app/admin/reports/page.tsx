"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { Search, Filter, FileText, CheckCircle, XCircle, Eye, Download, Calendar } from "lucide-react"

export default function ReportsPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  // Mock reports data
  const [reports, setReports] = useState([
    {
      id: 1,
      title: "Monthly Production Report - March 2025",
      department: "Production",
      submittedBy: "John Doe",
      submittedDate: "2025-03-28T15:30:00Z",
      status: "approved",
      approvedBy: "Admin User",
      approvedDate: "2025-03-30T10:15:00Z",
    },
    {
      id: 2,
      title: "Quality Control Metrics - March 2025",
      department: "Quality",
      submittedBy: "Jane Smith",
      submittedDate: "2025-03-29T11:45:00Z",
      status: "pending",
      approvedBy: null,
      approvedDate: null,
    },
    {
      id: 3,
      title: "Inventory Status Report - March 2025",
      department: "Store",
      submittedBy: "Robert Johnson",
      submittedDate: "2025-03-27T09:20:00Z",
      status: "approved",
      approvedBy: "Admin User",
      approvedDate: "2025-03-28T14:10:00Z",
    },
    {
      id: 4,
      title: "Purchase Orders Summary - March 2025",
      department: "Purchase",
      submittedBy: "Emily Davis",
      submittedDate: "2025-03-30T16:50:00Z",
      status: "pending",
      approvedBy: null,
      approvedDate: null,
    },
    {
      id: 5,
      title: "Machine Maintenance Log - March 2025",
      department: "Machine Maintenance",
      submittedBy: "Michael Wilson",
      submittedDate: "2025-03-29T13:25:00Z",
      status: "rejected",
      approvedBy: "Admin User",
      approvedDate: "2025-03-31T09:45:00Z",
    },
    {
      id: 6,
      title: "Tool Inventory and Maintenance - March 2025",
      department: "Tool Maintenance",
      submittedBy: "Sarah Brown",
      submittedDate: "2025-03-28T10:30:00Z",
      status: "approved",
      approvedBy: "Admin User",
      approvedDate: "2025-03-29T11:20:00Z",
    },
    {
      id: 7,
      title: "Safety Compliance Report - March 2025",
      department: "Safety",
      submittedBy: "David Miller",
      submittedDate: "2025-03-30T14:15:00Z",
      status: "pending",
      approvedBy: null,
      approvedDate: null,
    },
    {
      id: 8,
      title: "Administrative Summary - March 2025",
      department: "Admin",
      submittedBy: "Jennifer Taylor",
      submittedDate: "2025-03-31T11:10:00Z",
      status: "approved",
      approvedBy: "Admin User",
      approvedDate: "2025-03-31T15:45:00Z",
    },
  ])

  const handleApproveReport = (id: number) => {
    setReports(
      reports.map((report) =>
        report.id === id
          ? {
              ...report,
              status: "approved",
              approvedBy: "Admin User",
              approvedDate: new Date().toISOString(),
            }
          : report,
      ),
    )

    const report = reports.find((report) => report.id === id)

    toast({
      title: "Report approved",
      description: `${report?.title} has been approved.`,
    })
  }

  const handleRejectReport = (id: number) => {
    setReports(
      reports.map((report) =>
        report.id === id
          ? {
              ...report,
              status: "rejected",
              approvedBy: "Admin User",
              approvedDate: new Date().toISOString(),
            }
          : report,
      ),
    )

    const report = reports.find((report) => report.id === id)

    toast({
      title: "Report rejected",
      description: `${report?.title} has been rejected.`,
    })
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Filter reports based on search query and filters
  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.submittedBy.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDepartment = departmentFilter === "all" || report.department === departmentFilter
    const matchesStatus = statusFilter === "all" || report.status === statusFilter

    let matchesDate = true
    if (dateFilter === "today") {
      const today = new Date().toISOString().split("T")[0]
      matchesDate = report.submittedDate.startsWith(today)
    } else if (dateFilter === "week") {
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      matchesDate = new Date(report.submittedDate) >= oneWeekAgo
    } else if (dateFilter === "month") {
      const oneMonthAgo = new Date()
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
      matchesDate = new Date(report.submittedDate) >= oneMonthAgo
    }

    return matchesSearch && matchesDepartment && matchesStatus && matchesDate
  })

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Report Management</h1>
          <p className="text-muted-foreground">Review, approve, and manage department reports</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submitted Reports</CardTitle>
          <CardDescription>View and manage reports submitted by departments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">Past Week</SelectItem>
                  <SelectItem value="month">Past Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Title</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Submitted By</TableHead>
                  <TableHead>Submitted Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.length > 0 ? (
                  filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{report.title}</span>
                        </div>
                      </TableCell>
                      <TableCell>{report.department}</TableCell>
                      <TableCell>{report.submittedBy}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{formatDate(report.submittedDate)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(report.status)}
                        {report.status !== "pending" && (
                          <div className="text-xs text-muted-foreground mt-1">
                            By: {report.approvedBy} on {formatDate(report.approvedDate)}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                          {report.status === "pending" && (
                            <>
                              <Button variant="ghost" size="icon" onClick={() => handleApproveReport(report.id)}>
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleRejectReport(report.id)}>
                                <XCircle className="h-4 w-4 text-red-500" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No reports found.
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

