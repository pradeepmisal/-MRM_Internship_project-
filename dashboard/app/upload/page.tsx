"use client"

import { Layout } from "@/components/layout"
import ExcelUpload from "@/components/excel-upload"

export default function UploadPage() {
  return (
    <Layout>
      <div className="p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Upload Excel Sheet</h1>
        <ExcelUpload />
      </div>
    </Layout>
  )
}

