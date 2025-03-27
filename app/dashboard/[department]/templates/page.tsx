import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, Plus } from "lucide-react"
import Link from "next/link"

interface TemplatePageProps {
  params: {
    department: string
  }
}

export default function TemplatesPage({ params }: TemplatePageProps) {
  const { department } = params
  const departmentFormatted = department.charAt(0).toUpperCase() + department.slice(1).replace("_", " ")

  // Mock template data
  const templates = [
    {
      id: "1",
      title: "Monthly Production Report",
      description: "Standard template for monthly production metrics and analysis",
      type: "Excel",
      lastUpdated: "2025-02-15",
    },
    {
      id: "2",
      title: "Quality Control Metrics",
      description: "Template for tracking quality control KPIs and improvements",
      type: "Excel",
      lastUpdated: "2025-03-01",
    },
    {
      id: "3",
      title: "Executive Summary Presentation",
      description: "PowerPoint template for executive summary presentations",
      type: "PowerPoint",
      lastUpdated: "2025-01-20",
    },
    {
      id: "4",
      title: "Quarterly Performance Review",
      description: "Comprehensive template for quarterly department performance reviews",
      type: "Excel",
      lastUpdated: "2025-03-10",
    },
  ]

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Report Templates</h1>
          <p className="text-muted-foreground">
            Access and manage templates for {departmentFormatted} department reports
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create New Template
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Templates</TabsTrigger>
          <TabsTrigger value="excel">Excel</TabsTrigger>
          <TabsTrigger value="powerpoint">PowerPoint</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-primary" />
                    {template.title}
                  </CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm">
                    <span className="font-medium">Type:</span>
                    <span className="ml-2">{template.type}</span>
                  </div>
                  <div className="flex items-center text-sm mt-2">
                    <span className="font-medium">Last Updated:</span>
                    <span className="ml-2">{new Date(template.lastUpdated).toLocaleDateString()}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                  <Button size="sm" asChild>
                    <Link href={`/dashboard/${department}/reports/edit?template=${template.id}&new=true`}>
                      Use Template
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="excel" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates
              .filter((template) => template.type === "Excel")
              .map((template) => (
                <Card key={template.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-primary" />
                      {template.title}
                    </CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm">
                      <span className="font-medium">Type:</span>
                      <span className="ml-2">{template.type}</span>
                    </div>
                    <div className="flex items-center text-sm mt-2">
                      <span className="font-medium">Last Updated:</span>
                      <span className="ml-2">{new Date(template.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                    <Button size="sm" asChild>
                      <Link href={`/dashboard/${department}/reports/edit?template=${template.id}&new=true`}>
                        Use Template
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="powerpoint" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates
              .filter((template) => template.type === "PowerPoint")
              .map((template) => (
                <Card key={template.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-primary" />
                      {template.title}
                    </CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm">
                      <span className="font-medium">Type:</span>
                      <span className="ml-2">{template.type}</span>
                    </div>
                    <div className="flex items-center text-sm mt-2">
                      <span className="font-medium">Last Updated:</span>
                      <span className="ml-2">{new Date(template.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                    <Button size="sm" asChild>
                      <Link href={`/dashboard/${department}/reports/edit?template=${template.id}&new=true`}>
                        Use Template
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="custom" className="mt-6">
          <div className="flex flex-col items-center justify-center p-12 border rounded-lg">
            <div className="flex flex-col items-center text-center max-w-md">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Custom Templates Yet</h3>
              <p className="text-muted-foreground mb-4">
                You haven't created any custom templates yet. Create your first custom template to see it here.
              </p>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Create Custom Template
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

