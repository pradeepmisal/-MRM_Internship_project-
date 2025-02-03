"use client"

import { useState } from "react"
import * as XLSX from "xlsx"
import { Upload, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import ExcelViewer from "./excel-viewer"

export default function ExcelUpload() {
  const [isDragging, setIsDragging] = useState(false)
  const [excelFile, setExcelFile] = useState<ArrayBuffer | null>(null)
  const { toast } = useToast()

  const handleFileUpload = async (file: File) => {
    try {
      const arrayBuffer = await file.arrayBuffer()
      setExcelFile(arrayBuffer)
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

  const saveSheet = async (data: any[][]) => {
    try {
      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.aoa_to_sheet(data)
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1")
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" })
      console.log("Sheet data ready for upload:", excelBuffer)
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
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">Upload Excel Sheet</CardTitle>
        <p className="text-sm md:text-base text-muted-foreground">Upload your department data using an Excel file</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {!excelFile ? (
          <div
            className={`border-2 border-dashed rounded-lg p-6 md:p-12 text-center ${
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
            <div className="mx-auto w-10 h-10 md:w-12 md:h-12 bg-muted rounded-full flex items-center justify-center mb-4">
              <Upload className="h-5 w-5 md:h-6 md:w-6 text-muted-foreground" />
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-1">Click to upload Excel file</h3>
            <p className="text-xs md:text-sm text-muted-foreground">or drag and drop</p>
            <p className="text-xs text-muted-foreground mt-1">XLSX, XLS up to 10MB</p>
          </div>
        ) : (
          <div className="space-y-4">
            <ExcelViewer file={excelFile} isNewSheet={false} onSave={saveSheet} />
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
  )
}

