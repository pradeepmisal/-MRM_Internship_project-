"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Save } from "lucide-react"

export default function ReportEditPage({ params }: { params: { department: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const reportId = searchParams.get("id")
  const isNewReport = searchParams.get("new") === "true"
  const [isSaving, setIsSaving] = useState(false)

  // Simplified form state
  const [reportData, setReportData] = useState({
    title: "",
    type: "",
    period: "",
    status: "",
    content: "",
    summary: "",
  })

  // Mock data loading
  useEffect(() => {
    if (reportId && !isNewReport) {
      // Simulate API call to fetch report data
      setTimeout(() => {
        setReportData({
          title: "Monthly Production Report - March 2025",
          type: "monthly",
          period: "March 2025",
          status: "draft",
          content: "This report includes production statistics for March 2025. Our team achieved...",
          summary: "Production increased by 15% compared to February. No major issues occurred.",
        })
      }, 500)
    }
  }, [reportId, isNewReport])

  const handleInputChange = (field: string, value: string) => {
    setReportData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
      // Simulate API call to save report
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Report saved",
        description: "Your report has been saved successfully.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error saving report",
        description: "There was an error saving your report. Please try again.",
      })
      console.error("Error saving report:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleSubmit = async () => {
    try {
      setIsSaving(true)
      // Simulate API call to submit report
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Report submitted",
        description: "Your report has been submitted for approval.",
      })

      // Redirect to reports view page after successful submission
      router.push(`/dashboard/${params.department}/reports/view`)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error submitting report",
        description: "There was an error submitting your report. Please try again.",
      })
      console.error("Error submitting report:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{isNewReport ? "Create New Report" : "Edit Report"}</h1>
          <p className="text-muted-foreground">
            {isNewReport
              ? "Create a new report for your department"
              : "Edit the selected report and collaborate with team members"}
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Report Details</CardTitle>
            <CardDescription>Basic information about your report</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Report Title</Label>
                <Input
                  id="title"
                  value={reportData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter report title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Report Type</Label>
                <Select value={reportData.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="period">Report Period</Label>
                <Input
                  id="period"
                  value={reportData.period}
                  onChange={(e) => handleInputChange("period", e.target.value)}
                  placeholder="e.g., March 2025"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={reportData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="in_review">In Review</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Report Content</CardTitle>
            <CardDescription>Enter the main content of your report</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="summary">Executive Summary</Label>
              <Textarea
                id="summary"
                value={reportData.summary}
                onChange={(e) => handleInputChange("summary", e.target.value)}
                placeholder="Enter a brief summary of the report"
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Detailed Content</Label>
              <Textarea
                id="content"
                value={reportData.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
                placeholder="Enter detailed report content"
                className="min-h-[200px]"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <Button variant="outline" onClick={() => router.push(`/dashboard/${params.department}/reports/view`)}>
          Cancel
        </Button>
        <Button variant="outline" onClick={handleSave} disabled={isSaving}>
          <Save className="mr-2 h-4 w-4" /> Save Draft
        </Button>
        <Button onClick={handleSubmit} disabled={isSaving}>
          {isSaving ? "Processing..." : "Submit for Approval"}
        </Button>
      </div>
    </div>
  )
}

