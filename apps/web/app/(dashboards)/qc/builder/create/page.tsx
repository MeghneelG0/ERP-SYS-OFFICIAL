"use client";
import { useSearchParams } from "next/navigation";
import FormBuilder from "@/components/formbuilder/form-builder";
import React, { Suspense } from "react";
import { Label } from "@workspace/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { useRouter } from "next/navigation";
import { useGetPillars } from "@/queries/qc/pillar";
import { useGetKpis } from "@/queries/qc/kpi";
import { Loader2 } from "lucide-react";

function CreateFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get pillar ID from URL params
  const pillarId = searchParams.get("pillarId");

  // Fetch pillars and KPIs
  const { data: pillars, isLoading: isLoadingPillars } = useGetPillars();
  const { data: kpis, isLoading: isLoadingKpis } = useGetKpis(pillarId || "");

  // Find the selected pillar
  const selectedPillar =
    pillars?.find((p) => p.id === pillarId) || pillars?.[0];

  // Calculate existing KPI weights for weight validation
  const existingKpis =
    kpis?.map((kpi) => ({
      id: kpi.id,
      kpi_value: kpi.kpi_value || 0,
    })) || [];

  // Handle pillar change
  const handlePillarChange = (value: string) => {
    const newPillar = pillars?.find((p) => p.id === value);
    if (newPillar) {
      const params = new URLSearchParams({
        pillarId: newPillar.id,
        pillarName: newPillar.pillar_name,
        pillarWeight: String(newPillar.pillar_value || 0),
      }).toString();
      router.replace(`/qc/builder/create?${params}`);
    }
  };

  if (isLoadingPillars) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading pillars...</span>
      </div>
    );
  }

  if (!pillars || pillars.length === 0) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Create KPI Template</h1>
        <div className="text-center py-8">
          <p className="text-gray-600">
            No pillars available. Please create a pillar first.
          </p>
        </div>
      </div>
    );
  }

  if (!selectedPillar) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Create KPI Template</h1>
        <div className="text-center py-8">
          <p className="text-gray-600">
            No pillar selected. Please select a pillar.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Create KPI Template</h1>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <Label className="font-semibold">Select Pillar:</Label>
        <Select value={selectedPillar.id} onValueChange={handlePillarChange}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Select a pillar" />
          </SelectTrigger>
          <SelectContent>
            {pillars.map((pillar) => (
              <SelectItem key={pillar.id} value={pillar.id}>
                {pillar.pillar_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>
            <b>Pillar Name:</b> {selectedPillar.pillar_name}
          </span>
          <span>
            <b>Pillar Weight:</b>{" "}
            {((selectedPillar.pillar_value || 0) * 100).toFixed(1)}%
          </span>
        </div>
      </div>

      <p className="mb-8">
        Start building a KPI template for the selected pillar. The total weight
        of all KPIs in this pillar cannot exceed 100%.
      </p>

      {isLoadingKpis ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading existing KPIs...</span>
        </div>
      ) : (
        <FormBuilder pillarId={selectedPillar.id} existingKpis={existingKpis} />
      )}
    </main>
  );
}

export default function CreateFormPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateFormContent />
    </Suspense>
  );
}
