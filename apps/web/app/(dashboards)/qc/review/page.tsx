"use client";

import { DialogFooter } from "@workspace/ui/components/dialog";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@workspace/ui/components/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import { Textarea } from "@workspace/ui/components/textarea";
import {
  Check,
  Eye,
  X,
  AlertCircle,
  ArrowLeft,
  Filter,
  Building,
  GraduationCap,
} from "lucide-react";
import { Badge } from "@workspace/ui/components/badge";
import { toast } from "sonner";
import Link from "next/link";
import KpiReviewTable from "@/components/qac/kpi-review-table";
import {
  PillarKpiTable,
  PerformanceSheetTable,
  dummyPerformanceData,
} from "@/components/qac/performance-sheet-table";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@workspace/ui/components/accordion";

type KpiData = {
  assigned_kpi_id: number;
  kpi_name: string;
  kpi_description: string;
  kpi_status: string;
  pillar: string;
  department: string;
  form_input: Record<string, string | number>[] | null;
  qac_remark?: string;
};

// Updated dummy data with pillar and department information
const ENHANCED_DUMMY_DATA = {
  assignedKpis: [
    {
      assigned_kpi_id: 1,
      kpi_name: "Student Pass Rate",
      kpi_description:
        "Track student pass rates across different courses and semesters",
      kpi_status: "pending",
      pillar: "Academic Excellence",
      department: "Computer Science Engineering",
      form_input: [
        {
          course_code: "CS101",
          semester: "Fall 2024",
          total_students: 45,
          passed_students: 38,
          pass_rate: 84.4,
          instructor_name: "Dr. Sandeep Chaurasia",
          comments:
            "Good performance overall, need to focus on advanced topics",
        },
        {
          course_code: "CS201",
          semester: "Fall 2024",
          total_students: 32,
          passed_students: 29,
          pass_rate: 90.6,
          instructor_name: "Prof. Pradeep Krishnan",
          comments: "Excellent results, students well prepared",
        },
      ],
      qac_remark: null,
    },
    {
      assigned_kpi_id: 2,
      kpi_name: "Faculty Performance Evaluation",
      kpi_description:
        "Comprehensive evaluation of faculty teaching effectiveness and research contributions",
      kpi_status: "approved",
      pillar: "Academic Excellence",
      department: "Computer and Communication Engineering",
      form_input: [
        {
          faculty_name: "Dr. Sunil Kumar",
          department: "Computer Science",
          student_rating: 4.2,
          peer_review_score: 4.5,
          research_active: "Yes",
          publications_count: 3,
          teaching_load: "12 hours/week",
        },
        {
          faculty_name: "Prof. Kalpana Sharma",
          department: "Mathematics",
          student_rating: 4.8,
          peer_review_score: 4.6,
          research_active: "Yes",
          publications_count: 5,
          teaching_load: "10 hours/week",
        },
      ],
      qac_remark:
        "Excellent faculty performance across all metrics. Recommend for promotion consideration.",
    },
    {
      assigned_kpi_id: 3,
      kpi_name: "Industry Partnership Projects",
      kpi_description:
        "Track collaborative projects and partnerships with industry organizations",
      kpi_status: "pending",
      pillar: "Industrial Collaborations",
      department: "IT",
      form_input: [
        {
          company_name: "Tech Corp Ltd",
          project_title: "AI-Based Customer Analytics",
          project_duration: "6 months",
          students_involved: 8,
          faculty_lead: "Dr. Patel",
          project_value: 250000,
          completion_status: "In Progress",
        },
        {
          company_name: "Innovation Systems",
          project_title: "IoT Smart Campus Solution",
          project_duration: "12 months",
          students_involved: 12,
          faculty_lead: "Prof. Kumar",
          project_value: 450000,
          completion_status: "Completed",
        },
      ],
      qac_remark: null,
    },
    {
      assigned_kpi_id: 4,
      kpi_name: "Research Publications & Citations",
      kpi_description:
        "Track faculty research output, publication quality, and citation impact",
      kpi_status: "redo",
      pillar: "Research",
      department: "Computer Science Engineering",
      form_input: [
        {
          faculty_name: "Dr. Amit Verma",
          publication_title:
            "Advanced Machine Learning Techniques in Educational Data Mining",
          journal_name: "IEEE Transactions on Learning Technologies",
          publication_date: "2024-01-15",
          impact_factor: 3.2,
          citation_count: 15,
          research_area: "Artificial Intelligence",
        },
        {
          faculty_name: "Prof. Rita Singh",
          publication_title: "Statistical Methods for Educational Assessment",
          journal_name: "Journal of Educational Measurement",
          publication_date: "2023-12-10",
          impact_factor: 2.8,
          citation_count: 8,
          research_area: "Educational Statistics",
        },
      ],
      qac_remark:
        "Data collection methodology needs improvement. Please provide more detailed research impact analysis.",
    },
    {
      assigned_kpi_id: 5,
      kpi_name: "Industry Internship Placements",
      kpi_description:
        "Monitor student internship placements in industry organizations",
      kpi_status: "approved",
      pillar: "Industrial Collaborations",
      department: "Computer and Communication Engineering",
      form_input: [
        {
          student_name: "Sidharth Nigam",
          student_id: "CS2021001",
          company_name: "Microsoft India",
          internship_duration: "3 months",
          stipend_amount: 25000,
          performance_rating: 4.5,
          offer_received: "Yes",
        },
        {
          student_name: "Meghneel Gogoi",
          student_id: "CS2021002",
          company_name: "Google India",
          internship_duration: "6 months",
          stipend_amount: 35000,
          performance_rating: 4.8,
          offer_received: "Yes",
        },
      ],
      qac_remark:
        "Excellent internship placement record with high-quality companies.",
    },
    {
      assigned_kpi_id: 6,
      kpi_name: "Research Grant Applications",
      kpi_description:
        "Track research grant applications and funding success rates",
      kpi_status: "pending",
      pillar: "Research",
      department: "IT",
      form_input: [
        {
          faculty_name: "Mr. Vasu Verma",
          grant_agency: "DST",
          project_title: "Blockchain for Secure Healthcare Data",
          amount_requested: 1500000,
          grant_status: "Under Review",
          application_date: "2024-01-10",
          co_investigators: 2,
        },
        {
          faculty_name: "Prof. Rakesh Kumar Goel",
          grant_agency: "SERB",
          project_title: "Machine Learning for Climate Prediction",
          amount_requested: 2000000,
          grant_status: "Approved",
          application_date: "2023-11-15",
          co_investigators: 3,
        },
      ],
      qac_remark: null,
    },
  ],
};

const PILLARS = [
  { value: "Academic Excellence", label: "Academic Excellence" },
  { value: "Industrial Collaborations", label: "Industrial Collaborations" },
  { value: "Research", label: "Research" },
];

const DEPARTMENTS = [
  {
    value: "Computer and Communication Engineering",
    label: "Computer and Communication Engineering",
  },
  {
    value: "Computer Science Engineering",
    label: "Computer Science Engineering",
  },
  { value: "IT", label: "IT" },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "approved":
      return (
        <Badge
          variant="outline"
          className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-900"
        >
          <Check className="w-3 h-3 mr-1" />
          Approved
        </Badge>
      );
    case "redo":
      return (
        <Badge
          variant="outline"
          className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-900"
        >
          <X className="w-3 h-3 mr-1" />
          Needs Revision
        </Badge>
      );
    default:
      return (
        <Badge
          variant="outline"
          className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200 dark:hover:bg-yellow-900"
        >
          <AlertCircle className="w-3 h-3 mr-1" />
          Pending Review
        </Badge>
      );
  }
};

export default function QACSubmissionReview() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [selectedKpi, setSelectedKpi] = useState<KpiData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [qacRemark, setQacRemark] = useState("");
  const [localData, setLocalData] = useState<any>(ENHANCED_DUMMY_DATA);
  const [rowComments, setRowComments] = useState<
    Record<number, Record<number, { status: string; comment: string }>>
  >({});

  // Filter KPIs based on selected department
  const filteredKpis = localData.assignedKpis.filter((kpi: KpiData) => {
    const departmentMatch =
      selectedDepartment === "all" || kpi.department === selectedDepartment;
    return departmentMatch;
  });

  // Get counts for each filter combination
  const getFilterCounts = () => {
    const counts = {
      total: localData.assignedKpis.length,
      byDepartment: {} as Record<string, number>,
    };

    localData.assignedKpis.forEach((kpi: KpiData) => {
      counts.byDepartment[kpi.department] =
        (counts.byDepartment[kpi.department] || 0) + 1;
    });

    return counts;
  };

  const filterCounts = getFilterCounts();

  const handleOverallReviewSubmit = (action: "approved" | "redo") => {
    if (!selectedKpi || !qacRemark.trim()) {
      toast.error("Please provide feedback before submitting your review");
      return;
    }

    // Update the KPI status in the local data
    const updatedKpis = localData.assignedKpis.map((kpi: KpiData) => {
      if (kpi.assigned_kpi_id === selectedKpi.assigned_kpi_id) {
        return {
          ...kpi,
          kpi_status: action,
          qac_remark: qacRemark,
        };
      }
      return kpi;
    });

    const updatedData = { ...localData, assignedKpis: updatedKpis };
    setLocalData(updatedData);

    toast.success(
      `KPI ${action === "approved" ? "approved" : "marked for revision"} successfully`,
      {
        description: `${selectedKpi.kpi_name} has been ${action === "approved" ? "approved" : "sent back for revision"}.`,
      },
    );

    setQacRemark("");
    setDialogOpen(false);
    setSelectedKpi(null);
  };

  const handleRowReview = (
    kpiId: number,
    rowIndex: number,
    status: "approved" | "rejected",
    comment: string,
  ) => {
    setRowComments((prev) => ({
      ...prev,
      [kpiId]: {
        ...prev[kpiId],
        [rowIndex]: { status, comment },
      },
    }));
  };

  const handleOpenDialog = (kpi: KpiData) => {
    setSelectedKpi(kpi);
    setQacRemark(kpi.qac_remark || "");
    setDialogOpen(true);
  };

  const clearFilters = () => {
    setSelectedDepartment("all");
  };

  // Group KPIs by pillar
  const kpisByPillar: Record<
    string,
    import("@/components/qac/performance-sheet-table").PillarKpi[]
  > = filteredKpis.reduce(
    (
      acc: Record<
        string,
        import("@/components/qac/performance-sheet-table").PillarKpi[]
      >,
      kpi: KpiData,
    ) => {
      if (!acc[kpi.pillar]) acc[kpi.pillar] = [];
      (acc[kpi.pillar] ??= []).push({
        kpi_no: kpi.assigned_kpi_id,
        metric: kpi.kpi_name,
        dataProvidedBy: "HoD",
        target: "25%", // dummy value
        actual: "20%", // dummy value
        percentAchieved: "80%", // dummy value
        status: kpi.kpi_status,
        kpiId: kpi.assigned_kpi_id,
      });
      return acc;
    },
    {},
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/qac">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold">KPI Submission Review</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Review and evaluate department KPI submissions
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredKpis.length} of {localData.assignedKpis.length}{" "}
            KPIs
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {
              filteredKpis.filter(
                (kpi: KpiData) => kpi.kpi_status === "pending",
              ).length
            }{" "}
            pending review
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <Card className="mb-4 p-2 shadow-none border border-muted-foreground/20">
        <CardContent className="py-2 px-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {/* Department Filter ONLY */}
            <div className="space-y-1">
              <label className="text-xs font-medium flex items-center gap-2">
                <Building className="h-3 w-3" />
                Department
              </label>
              <Select
                value={selectedDepartment}
                onValueChange={setSelectedDepartment}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-xs">
                    All Departments ({filterCounts.total})
                  </SelectItem>
                  {DEPARTMENTS.map((dept) => (
                    <SelectItem
                      key={dept.value}
                      value={dept.value}
                      className="text-xs"
                    >
                      {dept.label} ({filterCounts.byDepartment[dept.value] || 0}
                      )
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Clear Filters */}
            <div className="flex items-end justify-end">
              <Button
                variant="outline"
                onClick={clearFilters}
                disabled={selectedDepartment === "all"}
                className="h-8 text-xs rounded-full border-muted-foreground/40 hover:bg-muted/30 transition-colors flex items-center gap-1 px-3"
              >
                <X className="h-3 w-3 mr-1 text-muted-foreground" />
                Clear Filters
              </Button>
            </div>
          </div>
          {/* Active Filters Display */}
          {selectedDepartment !== "all" && (
            <div className="mt-2 pt-2 border-t">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-500 dark:text-gray-400">
                  Active filters:
                </span>
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 text-xs"
                >
                  <Building className="h-3 w-3" />
                  {selectedDepartment}
                  <button
                    onClick={() => setSelectedDepartment("all")}
                    className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Only render the rest if department is selected */}
      {selectedDepartment !== "all" ? (
        <>
          {/* Performance Sheet Table (new) */}
          <div className="mb-8">
            <PerformanceSheetTable data={dummyPerformanceData} />
          </div>
          {/* KPI Cards */}
          <Card className="shadow-md border rounded-lg mb-8 p-4">
            <Accordion type="multiple" defaultValue={Object.keys(kpisByPillar)}>
              {Object.entries(kpisByPillar).map(
                ([pillar, kpis]: [
                  string,
                  import("@/components/qac/performance-sheet-table").PillarKpi[],
                ]) => (
                  <AccordionItem key={pillar} value={pillar}>
                    <AccordionTrigger>{pillar}</AccordionTrigger>
                    <AccordionContent>
                      <PillarKpiTable
                        pillar={pillar}
                        kpis={Array.isArray(kpis) ? kpis : []}
                        onReviewKpi={(kpiId) => {
                          const kpi = filteredKpis.find(
                            (k: KpiData) => k.assigned_kpi_id === kpiId,
                          );
                          if (kpi) handleOpenDialog(kpi);
                        }}
                      />
                    </AccordionContent>
                  </AccordionItem>
                ),
              )}
            </Accordion>
          </Card>

          {/* KPI Review Dialog */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-hidden [&>button]:hidden">
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>{selectedKpi?.kpi_name}</span>
                  {selectedKpi && getStatusBadge(selectedKpi.kpi_status)}
                </DialogTitle>
                <DialogDescription>
                  {selectedKpi?.kpi_description}
                </DialogDescription>
                {selectedKpi && (
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      <GraduationCap className="h-3 w-3 mr-1" />
                      {selectedKpi.pillar}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <Building className="h-3 w-3 mr-1" />
                      {selectedKpi.department}
                    </Badge>
                  </div>
                )}
              </DialogHeader>

              <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
                <Tabs defaultValue="data" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="data">Review Data</TabsTrigger>
                    <TabsTrigger value="overall">Overall Review</TabsTrigger>
                  </TabsList>

                  <TabsContent value="data" className="space-y-4">
                    <div className="mt-4">
                      {selectedKpi &&
                      selectedKpi.form_input &&
                      selectedKpi.form_input.length > 0 ? (
                        <KpiReviewTable
                          kpiName={selectedKpi.kpi_name}
                          kpiDescription={selectedKpi.kpi_description}
                          formData={selectedKpi.form_input}
                          onRowReview={(rowIndex, status, comment) =>
                            handleRowReview(
                              selectedKpi.assigned_kpi_id,
                              rowIndex,
                              status,
                              comment,
                            )
                          }
                          existingComments={
                            rowComments[selectedKpi.assigned_kpi_id] || {}
                          }
                        />
                      ) : (
                        <div className="text-center py-8">
                          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500 dark:text-gray-400">
                            No data has been submitted for this KPI yet.
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="overall">
                    <div className="mt-4 space-y-6">
                      <div>
                        <h3 className="font-medium text-lg mb-3">
                          Overall KPI Review Comments
                        </h3>
                        <Textarea
                          placeholder="Enter your overall feedback about this KPI submission. Include summary observations, recommendations, and any areas that need improvement..."
                          value={qacRemark}
                          onChange={(e) => setQacRemark(e.target.value)}
                          rows={6}
                          className="w-full"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          Provide constructive feedback to help improve future
                          submissions
                        </p>
                      </div>

                      {selectedKpi?.kpi_status === "pending" && (
                        <div className="pt-4 border-t">
                          <h3 className="font-medium text-lg mb-4">
                            Overall Review Decision
                          </h3>
                          <div className="flex gap-4">
                            <Button
                              onClick={() =>
                                handleOverallReviewSubmit("approved")
                              }
                              className="flex-1 bg-green-600 hover:bg-green-700"
                              disabled={!qacRemark.trim()}
                            >
                              <Check className="w-4 h-4 mr-2" />
                              Approve KPI
                            </Button>
                            <Button
                              onClick={() => handleOverallReviewSubmit("redo")}
                              variant="destructive"
                              className="flex-1"
                              disabled={!qacRemark.trim()}
                            >
                              <X className="w-4 h-4 mr-2" />
                              Request Revision
                            </Button>
                          </div>
                          {!qacRemark.trim() && (
                            <p className="text-xs text-red-500 mt-2 text-center">
                              Please provide feedback before making a decision
                            </p>
                          )}
                        </div>
                      )}

                      {selectedKpi?.kpi_status !== "pending" && (
                        <div className="pt-4 border-t">
                          <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Review Completed</AlertTitle>
                            <AlertDescription>
                              This KPI has already been reviewed and marked as{" "}
                              <strong>{selectedKpi?.kpi_status}</strong>.
                            </AlertDescription>
                          </Alert>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground font-semibold">
            Please select a department to view KPI submissions and performance
            data.
          </p>
        </div>
      )}
    </div>
  );
}
