"use client";
import FormBuilder from "@/components/formbuilder/form-builder";
import { notFound } from "next/navigation";
import React from "react";
import { useGetKpiById, useUpdateKpi } from "@/queries/qc/kpi";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

interface EditFormPageProps {
  params: Promise<{ kpiId: string }>;
}

function EditFormClient({ kpiId }: { kpiId: string }) {
  const searchParams = useSearchParams();
  const pillarId = searchParams.get("pillarId") || "";

  const { data: kpi, isLoading, error } = useGetKpiById(pillarId, kpiId);

  if (!pillarId) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Edit KPI</h1>
        <div className="text-center py-8">
          <p className="text-red-600">Pillar ID is required to edit KPI.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading KPI...</span>
      </div>
    );
  }

  if (error || !kpi) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Edit KPI</h1>
        <div className="text-center py-8">
          <p className="text-red-600">Error loading KPI. Please try again.</p>
        </div>
      </div>
    );
  }

  // Transform KPI data to FormBuilder format
  const initialForm = {
    kpi_number: kpi.kpi_number,
    kpi_metric_name: kpi.kpi_metric_name,
    data_provided_by: kpi.data_provided_by,
    kpi_value: kpi.kpi_value,
    elements: kpi.kpi_data?.elements || [],
  };

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Edit KPI</h1>
      <p className="bg-secondary mb-8 p-4 rounded-lg">
        Make changes to your KPI and save when you're done.
      </p>
      <FormBuilder
        pillarId={pillarId}
        initialForm={initialForm}
        existingKpis={[]} // For edit mode, we don't need to validate against existing KPIs
      />
    </main>
  );
}

export default async function EditFormPage({ params }: EditFormPageProps) {
  const { kpiId } = await params;
  return <EditFormClient kpiId={kpiId} />;
}
