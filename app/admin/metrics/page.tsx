"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Download, Calendar, BarChart3, PieChartIcon, LineChartIcon } from "lucide-react"

export default function MetricsPage() {
  const [timeRange, setTimeRange] = useState("month")

  // Mock data for department performance
  const departmentPerformance = [
    { name: "Production", onTime: 18, late: 4, incomplete: 2 },
    { name: "Quality", onTime: 15, late: 2, incomplete: 1 },
    { name: "Store", onTime: 12, late: 5, incomplete: 3 },
    { name: "Purchase", onTime: 14, late: 3, incomplete: 2 },
    { name: "Machine Maintenance", onTime: 16, late: 4, incomplete: 2 },
    { name: "Tool Maintenance", onTime: 13, late: 2, incomplete: 1 },
    { name: "Safety", onTime: 17, late: 1, incomplete: 0 },
    { name: "Admin", onTime: 9, late: 1, incomplete: 0 },
  ]

  // Mock data for report submission trends
  const submissionTrends = [
    { month: "Jan", onTime: 85, late: 12, incomplete: 3 },
    { month: "Feb", onTime: 82, late: 15, incomplete: 3 },
    { month: "Mar", onTime: 88, late: 10, incomplete: 2 },
    { month: "Apr", onTime: 90, late: 8, incomplete: 2 },
    { month: "May", onTime: 92, late: 7, incomplete: 1 },
    { month: "Jun", onTime: 89, late: 9, incomplete: 2 },
  ]

  // Mock data for report types
  const reportTypes = [
    { name: "Monthly", value: 65 },
    { name: "Quarterly", value: 20 },
    { name: "Annual", value: 10 },
    { name: "Special", value: 5 },
  ]

  // Colors for pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  // Mock data for user activity
  const userActivity = [
    { day: "Mon", logins: 42, edits: 28, views: 65 },
    { day: "Tue", logins: 38, edits: 32, views: 59 },
    { day: "Wed", logins: 45, edits: 35, views: 70 },
    { day: "Thu", logins: 40, edits: 30, views: 62 },
    { day: "Fri", logins: 35, edits: 25, views: 55 },
    { day: "Sat", logins: 15, edits: 10, views: 20 },
    { day: "Sun", logins: 12, edits: 8, views: 18 },
  ]

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Performance Metrics</h1>
          <p className="text-muted-foreground">Analyze department performance and system usage metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Past Week</SelectItem>
              <SelectItem value="month">Past Month</SelectItem>
              <SelectItem value="quarter">Past Quarter</SelectItem>
              <SelectItem value="year">Past Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="department" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="department" className="flex items-center">
            <BarChart3 className="mr-2 h-4 w-4" /> Department Performance
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center">
            <LineChartIcon className="mr-2 h-4 w-4" /> Submission Trends
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center">
            <PieChartIcon className="mr-2 h-4 w-4" /> Report Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="department" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
              <CardDescription>Report submission performance by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="onTime" name="On Time" fill="#4ade80" />
                    <Bar dataKey="late" name="Late" fill="#facc15" />
                    <Bar dataKey="incomplete" name="Incomplete" fill="#f87171" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-500">85%</div>
                      <p className="text-sm text-muted-foreground">Average On-Time Rate</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-amber-500">12%</div>
                      <p className="text-sm text-muted-foreground">Average Late Rate</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-500">3%</div>
                      <p className="text-sm text-muted-foreground">Average Incomplete Rate</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Submission Trends</CardTitle>
              <CardDescription>Monthly trends in report submission status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={submissionTrends} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="onTime" name="On Time" stroke="#4ade80" strokeWidth={2} />
                    <Line type="monotone" dataKey="late" name="Late" stroke="#facc15" strokeWidth={2} />
                    <Line type="monotone" dataKey="incomplete" name="Incomplete" stroke="#f87171" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6">
                <p className="text-sm text-muted-foreground">
                  The graph shows a positive trend in on-time report submissions over the past 6 months, with a
                  corresponding decrease in late and incomplete submissions. This indicates improving compliance with
                  reporting deadlines across departments.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>Daily user activity in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userActivity} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="logins" name="Logins" fill="#3b82f6" />
                    <Bar dataKey="edits" name="Report Edits" fill="#8b5cf6" />
                    <Bar dataKey="views" name="Report Views" fill="#06b6d4" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Report Types</CardTitle>
                <CardDescription>Distribution of report types in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={reportTypes}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {reportTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Report Completion Time</CardTitle>
                <CardDescription>Average time to complete reports by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={[
                        { name: "Production", days: 3.2 },
                        { name: "Quality", days: 2.8 },
                        { name: "Store", days: 4.1 },
                        { name: "Purchase", days: 3.5 },
                        { name: "Machine Maintenance", days: 3.9 },
                        { name: "Tool Maintenance", days: 3.6 },
                        { name: "Safety", days: 2.5 },
                        { name: "Admin", days: 2.2 },
                      ]}
                      margin={{ top: 20, right: 30, left: 100, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" label={{ value: "Days", position: "insideBottom", offset: -5 }} />
                      <YAxis type="category" dataKey="name" />
                      <Tooltip formatter={(value) => [`${value} days`, "Avg. Completion Time"]} />
                      <Bar dataKey="days" name="Average Days to Complete" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Report Quality Metrics</CardTitle>
              <CardDescription>Quality assessment of submitted reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "Production", completeness: 85, accuracy: 78, timeliness: 82 },
                      { name: "Quality", completeness: 92, accuracy: 90, timeliness: 88 },
                      { name: "Store", completeness: 78, accuracy: 75, timeliness: 70 },
                      { name: "Purchase", completeness: 88, accuracy: 82, timeliness: 85 },
                      { name: "Machine Maintenance", completeness: 80, accuracy: 85, timeliness: 75 },
                      { name: "Tool Maintenance", completeness: 82, accuracy: 80, timeliness: 78 },
                      { name: "Safety", completeness: 95, accuracy: 92, timeliness: 90 },
                      { name: "Admin", completeness: 90, accuracy: 88, timeliness: 92 },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completeness" name="Completeness" fill="#60a5fa" />
                    <Bar dataKey="accuracy" name="Accuracy" fill="#34d399" />
                    <Bar dataKey="timeliness" name="Timeliness" fill="#a78bfa" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

