"use client"

import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import ExcelViewer from "@/components/excel-viewer"

export default function DepartmentPage() {
  const [isNewSheet, setIsNewSheet] = useState(false)

  const createNewSheet = () => {
    setIsNewSheet(true)
  }

  return (
    <Layout>
      <div className="p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Department Data Submission</h1>
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Create New Sheet</CardTitle>
          </CardHeader>
          <CardContent>
            {!isNewSheet ? (
              <Button onClick={createNewSheet} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create New Sheet
              </Button>
            ) : (
              <ExcelViewer file={null} isNewSheet={true} onSave={() => {}} />
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

