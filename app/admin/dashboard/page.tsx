import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Users, CalendarDays, BarChart3, Activity, Bell } from "lucide-react"
import Link from "next/link"

export default function AdminDashboardPage() {
  // Mock data for admin dashboard - simplified
  const departmentStats = [
    { name: "Production", completion: 85, reports: 12 },
    { name: "Quality", completion: 92, reports: 8 },
    { name: "Store", completion: 78, reports: 10 },
    { name: "Purchase", completion: 88, reports: 9 },
  ]

  const upcomingDeadlines = [
    { id: 1, title: "Monthly Reports", date: "2025-04-15", departments: "All" },
    { id: 2, title: "Quarterly Budget", date: "2025-04-30", departments: "Admin, Purchase" },
  ]

  return (
    <div className="flex flex-col space-y-6 p-8">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome to the administrative dashboard. Monitor system activity and manage departments.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68</div>
            <p className="text-xs text-muted-foreground">Total reports across all departments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">41</div>
            <p className="text-xs text-muted-foreground">Users active in the last 24 hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Deadlines in the next 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Completion</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">Average report completion rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
            <CardDescription>Access key admin features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center" asChild>
                <Link href="/admin/activity">
                  <Activity className="h-8 w-8 mb-2" />
                  <span>User Activity</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center" asChild>
                <Link href="/admin/deadlines">
                  <CalendarDays className="h-8 w-8 mb-2" />
                  <span>Deadlines</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center" asChild>
                <Link href="/admin/notifications">
                  <Bell className="h-8 w-8 mb-2" />
                  <span>Notifications</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center" asChild>
                <Link href="/admin/users">
                  <Users className="h-8 w-8 mb-2" />
                  <span>Users</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>Monitor report completion and activity across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentStats.map((dept) => (
                <div key={dept.name} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{dept.name}</p>
                    <p className="text-sm text-muted-foreground">{dept.reports} reports</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm font-medium">
                      <span
                        className={
                          dept.completion >= 90
                            ? "text-green-500"
                            : dept.completion >= 70
                              ? "text-amber-500"
                              : "text-red-500"
                        }
                      >
                        {dept.completion}%
                      </span>
                      <span className="text-muted-foreground">completion</span>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/admin/departments/${dept.name.toLowerCase().replace(" ", "_")}`}>View</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Upcoming Deadlines</CardTitle>
              <CardDescription>Manage and track report deadlines across departments</CardDescription>
            </div>
            <Button asChild>
              <Link href="/admin/deadlines">Add Deadline</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingDeadlines.map((deadline) => (
              <div key={deadline.id} className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{deadline.title}</p>
                  <p className="text-sm text-muted-foreground">{deadline.departments}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <span className="text-sm">{new Date(deadline.date).toLocaleDateString()}</span>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <Link href="/admin/deadlines">Edit</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

