"use client";

import { useState } from "react";
import { SubmissionStatsCard } from "@/components/qc/analytics/SubmissionStatsCard";
import { DepartmentList } from "@/components/qc/analytics/DepartmentList";
import { DepartmentDetails } from "@/components/qc/analytics/DepartmentDetails";
import { QualityTrends } from "@/components/qc/analytics/QualityTrends";
import { ReviewWorkloadTable } from "@/components/qc/analytics/ReviewWorkloadTable";

const QAC_ANALYTICS_DATA = {
  submissionStats: {
    totalSubmissions: 156,
    pendingReview: 23,
    approvedThisMonth: 89,
    rejectedThisMonth: 12,
    averageReviewTime: "2.3 days",
  },
  departmentPerformance: [
    {
      id: "Dept. of CCE",
      name: "Dept. of CCE",
      submissionRate: 92.5,
      totalSubmissions: 24,
      approved: 22,
      rejected: 1,
      pending: 1,
      averageScore: 4.6,
      onTimeRate: 95.8,
      lastSubmission: "2024-01-15",
      recentActivity: [
        { kpi: "Student Satisfaction", status: "approved", date: "2024-01-15", score: 4.8 },
        { kpi: "Course Outcomes", status: "approved", date: "2024-01-14", score: 4.5 },
        { kpi: "Staff Performance", status: "pending", date: "2024-01-13", score: null },
      ],
      qualityMetrics: { dataAccuracy: 96.2, completeness: 98.5, timeliness: 94.1 },
    },
    {
      id: "Dept. of IT",
      name: "Dept. of IT",
      submissionRate: 94.1,
      totalSubmissions: 30,
      approved: 28,
      rejected: 2,
      pending: 0,
      averageScore: 4.7,
      onTimeRate: 97.2,
      lastSubmission: "2024-01-10",
      recentActivity: [
        { kpi: "System Uptime", status: "approved", date: "2024-01-10", score: 99.9 },
        { kpi: "Incident Response", status: "approved", date: "2024-01-09", score: 4.6 },
        { kpi: "User Satisfaction", status: "pending", date: "2024-01-08", score: null },
      ],
      qualityMetrics: { dataAccuracy: 95.5, completeness: 97.8, timeliness: 93.2 },
    },
    {
      id: "Dept. of HR",
      name: "Dept. of HR",
      submissionRate: 90.3,
      totalSubmissions: 20,
      approved: 18,
      rejected: 1,
      pending: 1,
      averageScore: 4.5,
      onTimeRate: 92.5,
      lastSubmission: "2024-01-12",
      recentActivity: [
        { kpi: "Employee Satisfaction", status: "approved", date: "2024-01-12", score: 4.7 },
        { kpi: "Attrition Rate", status: "approved", date: "2024-01-11", score: 4.3 },
        { kpi: "Training Effectiveness", status: "pending", date: "2024-01-10", score: null },
      ],
      qualityMetrics: { dataAccuracy: 94.1, completeness: 96.2, timeliness: 92.3 },
    },
    {
      id: "Dept. of Fin",
      name: "Dept. of Fin",
      submissionRate: 88.7,
      totalSubmissions: 22,
      approved: 19,
      rejected: 2,
      pending: 1,
      averageScore: 4.4,
      onTimeRate: 90.1,
      lastSubmission: "2024-01-11",
      recentActivity: [
        { kpi: "Budget Variance", status: "approved", date: "2024-01-11", score: 4.6 },
        { kpi: "Expense Management", status: "approved", date: "2024-01-10", score: 4.2 },
        { kpi: "Revenue Growth", status: "pending", date: "2024-01-09", score: null },
      ],
      qualityMetrics: { dataAccuracy: 93.7, completeness: 95.8, timeliness: 91.4 },
    },
  ],
  reviewMetrics: {
    averageReviewTime: 2.3,
    reviewBacklog: 23,
    reviewerWorkload: [
      { reviewer: "Dr. Arjun Singh", pending: 1, completed: 45 },
      { reviewer: "Dr. Arpit Singh", pending: 6, completed: 38 },
      { reviewer: "Dr. Somya Goyal", pending: 9, completed: 42 },
    ],
  },
  qualityTrends: {
    monthlyApprovalRate: [
      { month: "Sep", rate: 82 },
      { month: "Oct", rate: 85 },
      { month: "Nov", rate: 88 },
      { month: "Dec", rate: 91 },
      { month: "Jan", rate: 89 },
    ],
    qualityScores: [
      { month: "Sep", score: 4.1 },
      { month: "Oct", score: 4.2 },
      { month: "Nov", score: 4.3 },
      { month: "Dec", score: 4.5 },
      { month: "Jan", score: 4.4 },
    ],
  },
};

export default function QACDashboard() {
  const [selectedDepartment, setSelectedDepartment] = useState(QAC_ANALYTICS_DATA.departmentPerformance[0]);
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">QC Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Monitor department submissions and quality metrics across the organization
          </p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SubmissionStatsCard stats={QAC_ANALYTICS_DATA.submissionStats} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col h-full">
          <DepartmentList
            departments={QAC_ANALYTICS_DATA.departmentPerformance}
            selectedId={selectedDepartment?.id ?? ""}
            onSelect={setSelectedDepartment}
          />
        </div>
        <div className="flex flex-col h-full">
          <DepartmentDetails department={selectedDepartment} />
        </div>
      </div>
      <QualityTrends trends={QAC_ANALYTICS_DATA.qualityTrends} />
      <ReviewWorkloadTable reviewMetrics={QAC_ANALYTICS_DATA.reviewMetrics} />
    </div>
  );
}
