import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ClockIcon, CheckCircleIcon, CalendarIcon, FileTextIcon } from "lucide-react"
import Link from "next/link"

interface DashboardPageProps {
  params: {
    department: string
  }
}

export default function DashboardPage({ params }: DashboardPageProps) {
  const { department } = params
  const departmentFormatted = department.charAt(0).toUpperCase() + department.slice(1).replace("_", " ")

  // Mock data - in a real app, this would come from a database or API
  const pendingReports = 2
  const completedReports = 5
  const upcomingDeadline = "2025-04-15"

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{departmentFormatted} Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome to your dashboard. Here&apos;s an overview of your reports and upcoming deadlines.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReports}</div>
            <p className="text-xs text-muted-foreground">Reports awaiting completion</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Reports</CardTitle>
            <CheckCircleIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedReports}</div>
            <p className="text-xs text-muted-foreground">Reports finalized this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Deadline</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Date(upcomingDeadline).toLocaleDateString()}</div>
            <p className="text-xs text-muted-foreground">Monthly report due date</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Templates</CardTitle>
            <FileTextIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Available report templates</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-lg border p-4">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Monthly Production Report</p>
                <p className="text-sm text-muted-foreground">Last edited 2 hours ago</p>
              </div>
              <Button size="sm" variant="outline" asChild>
                <Link href={`/dashboard/${department}/reports/edit?id=123`}>Continue</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 rounded-lg border p-4">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Equipment Status Report</p>
                <p className="text-sm text-muted-foreground">Completed on April 1, 2025</p>
              </div>
              <Button size="sm" variant="outline" asChild>
                <Link href={`/dashboard/${department}/reports/view?id=456`}>View</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Deadlines</CardTitle>
          <CardDescription>Stay on track with your report deadlines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <CalendarIcon className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Monthly Report</p>
                <p className="text-sm text-muted-foreground">Due on April 15, 2025</p>
              </div>
              <Button size="sm" variant="outline" asChild>
                <Link href={`/dashboard/${department}/reports/edit?id=789`}>Start</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <CalendarIcon className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Quarterly Summary</p>
                <p className="text-sm text-muted-foreground">Due on April 30, 2025</p>
              </div>
              <Button size="sm" variant="outline" asChild>
                <Link href={`/dashboard/${department}/reports/edit?id=101`}>Start</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

