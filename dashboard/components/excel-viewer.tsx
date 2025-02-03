"use client"

import { useEffect, useRef, useState } from "react"
import * as XLSX from "xlsx"
import { Button } from "@/components/ui/button"
import { Save, Plus } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ExcelViewerProps {
  file: ArrayBuffer | null
  isNewSheet: boolean
  onSave: (data: any[][]) => void
}

declare global {
  interface Window {
    jspreadsheet: any
    jexcel: any
  }
}

export default function ExcelViewer({ file, isNewSheet, onSave }: ExcelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const jspreadsheetRef = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const loadJSpreadsheet = async () => {
      if (typeof window.jspreadsheet === "undefined") {
        try {
          const jspreadsheetScript = document.createElement("script")
          jspreadsheetScript.src = "https://bossanova.uk/jspreadsheet/v4/jexcel.js"
          jspreadsheetScript.async = true
          document.body.appendChild(jspreadsheetScript)

          const jsuiteScript = document.createElement("script")
          jsuiteScript.src = "https://jsuites.net/v4/jsuites.js"
          jsuiteScript.async = true
          document.body.appendChild(jsuiteScript)

          const jspreadsheetStyles = document.createElement("link")
          jspreadsheetStyles.rel = "stylesheet"
          jspreadsheetStyles.href = "https://bossanova.uk/jspreadsheet/v4/jexcel.css"
          document.head.appendChild(jspreadsheetStyles)

          const jsuiteStyles = document.createElement("link")
          jsuiteStyles.rel = "stylesheet"
          jsuiteStyles.href = "https://jsuites.net/v4/jsuites.css"
          document.head.appendChild(jsuiteStyles)

          await new Promise((resolve) => {
            jspreadsheetScript.onload = () => {
              jsuiteScript.onload = resolve
            }
          })
        } catch (error) {
          console.error("Error loading jspreadsheet:", error)
          toast({
            title: "Error",
            description: "Failed to load spreadsheet component. Please try again.",
            variant: "destructive",
          })
        }
      }
      setIsLoading(false)
    }

    loadJSpreadsheet()
  }, [toast])

  useEffect(() => {
    const initializeSpreadsheet = () => {
      if (containerRef.current && !isLoading && window.jspreadsheet) {
        let data: any[][]
        let columns: any[]

        if (file) {
          const workbook = XLSX.read(file, { type: "array" })
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          data = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
          columns = data[0].map(() => ({ type: "text", width: 120 }))
        } else {
          // Initialize with 5 columns and 5 rows
          columns = Array(5).fill({ type: "text", width: 120 })
          data = Array(5).fill(Array(5).fill(""))
        }

        if (jspreadsheetRef.current) {
          jspreadsheetRef.current.destroy()
        }

        jspreadsheetRef.current = window.jspreadsheet(containerRef.current, {
          data: data,
          columns: columns,
          minDimensions: [5, 5],
          columnSorting: false,
          defaultColWidth: 120,
          tableOverflow: true,
          tableWidth: "100%",
          tableHeight: "400px",
        })
      }
    }

    if (!isLoading) {
      initializeSpreadsheet()
    }

    return () => {
      if (jspreadsheetRef.current) {
        jspreadsheetRef.current.destroy()
      }
    }
  }, [file, isLoading])

  const handleAddColumn = () => {
    if (jspreadsheetRef.current) {
      const totalCols = jspreadsheetRef.current.headers.length
      jspreadsheetRef.current.insertColumn(1, totalCols)
    }
  }

  const handleAddRow = () => {
    if (jspreadsheetRef.current) {
      const totalRows = jspreadsheetRef.current.rows.length
      jspreadsheetRef.current.insertRow(1, totalRows)
    }
  }

  const handleSave = () => {
    if (jspreadsheetRef.current) {
      const data = jspreadsheetRef.current.getData()
      onSave(data)
      toast({
        title: "Success",
        description: "Sheet saved successfully.",
        duration: 3000,
      })
    }
  }

  if (isLoading) {
    return <div>Loading spreadsheet...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <div className="space-x-2">
          <Button onClick={handleAddColumn} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Column
          </Button>
          <Button onClick={handleAddRow} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Row
          </Button>
        </div>
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save Sheet
        </Button>
      </div>
      <div ref={containerRef} className="w-full h-[300px] md:h-[400px] overflow-auto border rounded-md" />
    </div>
  )
}

