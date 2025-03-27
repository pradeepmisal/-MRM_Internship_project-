"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, AlertTriangle } from "lucide-react"
import Link from "next/link"

interface Report {
  id: string
  title: string
  type: string
  period: string
  status: string
  createdAt: string
  updatedAt: string
  author: string
  department: string
  content: string
  summary: string
}

export default function ReportViewPage({ params }: { params: { department: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const reportId = searchParams.get("id")
  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)

  // Mock data loading
  useEffect(() => {
    setLoading(true)
    // Simulate API call to fetch report data
    setTimeout(() => {
      const mockReport: Report = {
        id: reportId || "123",
        title: "Monthly Production Report - March 2025",
        type: "monthly",
        period: "March 2025",
        status: "approved",
        createdAt: "2025-03-10T09:00:00Z",
        updatedAt: "2025-03-25T14:30:00Z",
        author: "John Doe",
        department: params.department,
        content:
          "This report includes production statistics for March 2025. Our team achieved significant milestones in productivity and quality control.",
        summary: "Production increased by 15% compared to February. No major issues occurred.",
      }
      setReport(mockReport)
      setLoading(false)
    }, 1000)
  }, [reportId, params.department])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="outline">Draft</Badge>
      case "in_review":
        return <Badge variant="secondary">In Review</Badge>
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-14rem)]">
        <p className="text-muted-foreground">Loading report...</p>
      </div>
    )
  }

  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-14rem)]">
        <AlertTriangle className="h-10 w-10 text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Report Not Found</h2>
        <p className="text-muted-foreground mb-4">The report you are looking for could not be found.</p>
        <Button asChild>
          <Link href={`/dashboard/${params.department}/reports/view`}>Back to Reports</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">View Report</h1>
          <p className="text-muted-foreground">Viewing details for the selected report</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/${params.department}/reports/edit?id=${report.id}`}>Edit Report</Link>
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{report.title}</CardTitle>
            {getStatusBadge(report.status)}
          </div>
          <CardDescription>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
              <span>Period: {report.period}</span>
              <span>Last updated: {new Date(report.updatedAt).toLocaleDateString()}</span>
              <span>Type: {report.type.charAt(0).toUpperCase() + report.type.slice(1)}</span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Executive Summary</h3>
              <p className="text-muted-foreground whitespace-pre-line">{report.summary}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Detailed Report</h3>
              <div className="prose max-w-none">
                <p className="whitespace-pre-line">{report.content}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t p-4">
          <div className="text-sm text-muted-foreground">
            Created by {report.author} on {new Date(report.createdAt).toLocaleDateString()}
          </div>
        </CardFooter>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/${params.department}/reports/edit?id=${report.id}`}>Edit</Link>
          </Button>
          <Button>Submit for Review</Button>
        </div>
      </div>
    </div>
  )
}

