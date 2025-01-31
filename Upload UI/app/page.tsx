"use client"

import { useState } from "react"
import * as XLSX from "xlsx"
import { Bell, Upload, Plus, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import ExcelViewer from "./components/excel-viewer"

export default function ExcelUpload() {
  const [isDragging, setIsDragging] = useState(false)
  const [excelFile, setExcelFile] = useState<ArrayBuffer | null>(null)
  const [isNewSheet, setIsNewSheet] = useState(false)
  const { toast } = useToast()

  const handleFileUpload = async (file: File) => {
    try {
      const arrayBuffer = await file.arrayBuffer()
      setExcelFile(arrayBuffer)
      setIsNewSheet(false)
      toast({
        title: "Success!",
        description: "File uploaded successfully.",
        duration: 3000,
      })
    } catch (error) {
      console.error("Error reading file:", error)
      toast({
        title: "Error",
        description: "Failed to upload file. Please try again.",
        variant: "destructive",
      })
    }
  }

  const createNewSheet = () => {
    setExcelFile(null)
    setIsNewSheet(true)
    toast({
      title: "Success!",
      description: "New blank sheet created.",
      duration: 3000,
    })
  }

  const saveSheet = async (data: any[][]) => {
    try {
      // Create a new workbook and worksheet
      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.aoa_to_sheet(data)
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1")

      // Convert the workbook to an ArrayBuffer
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" })

      // Here you would typically send this data to your backend
      // For demonstration, we'll just log it
      console.log("Sheet data ready for upload:", excelBuffer)

      // In a real application, you would send this to your server
      // await uploadToDatabase(excelBuffer);

      toast({
        title: "Success!",
        description: "Sheet saved and ready for upload to database.",
        duration: 3000,
      })
    } catch (error) {
      console.error("Error saving sheet:", error)
      toast({
        title: "Error",
        description: "Failed to save sheet. Please try again.",
        variant: "destructive",
      })
    }
  }

  const resetFile = () => {
    setExcelFile(null)
    setIsNewSheet(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#40E0D0] to-[#87CEEB]">
      <header className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm">
        <div className="bg-gray-200 px-4 py-2 rounded">Company Logo</div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button size="icon" className="rounded-full bg-[#40E0D0]">
            <span className="sr-only">User profile</span>
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-4 mt-8">
        <Card className="max-w-[95vw] mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Department Data Upload</CardTitle>
            <p className="text-muted-foreground">
              Upload your department data using an Excel file or create a new spreadsheet
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {!excelFile && !isNewSheet ? (
              <>
                <div className="grid grid-cols-2 gap-2 bg-muted p-1 rounded-lg">
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2"
                    onClick={() => document.getElementById("file-upload")?.click()}
                  >
                    <Upload className="h-4 w-4" />
                    Upload Excel File
                  </Button>
                  <Button variant="ghost" className="flex items-center gap-2" onClick={createNewSheet}>
                    <Plus className="h-4 w-4" />
                    Create New Sheet
                  </Button>
                </div>
                <div
                  className={`border-2 border-dashed rounded-lg p-12 text-center ${
                    isDragging ? "border-primary bg-primary/10" : "border-muted"
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault()
                    setIsDragging(true)
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault()
                    setIsDragging(false)
                    const file = e.dataTransfer.files[0]
                    if (file && (file.name.endsWith(".xlsx") || file.name.endsWith(".xls"))) {
                      handleFileUpload(file)
                    } else {
                      toast({
                        title: "Invalid file",
                        description: "Please upload an Excel file (.xlsx or .xls)",
                        variant: "destructive",
                      })
                    }
                  }}
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  <input
                    id="file-upload"
                    type="file"
                    accept=".xlsx,.xls"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileUpload(file)
                    }}
                  />
                  <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">Click to upload Excel file</h3>
                  <p className="text-sm text-muted-foreground">or drag and drop</p>
                  <p className="text-xs text-muted-foreground mt-1">XLSX, XLS up to 10MB</p>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <ExcelViewer file={excelFile} isNewSheet={isNewSheet} onSave={saveSheet} />
                <div className="flex justify-between">
                  <Button onClick={resetFile} variant="outline" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Upload
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

