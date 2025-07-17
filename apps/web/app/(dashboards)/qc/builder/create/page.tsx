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

function CreateFormContent() {
  // Dummy data for pillar templates
  const pillarTemplates = [
    { id: 1, name: "Academic Excellence", number: 1, weight: 0.3 },
    { id: 2, name: "Research Progression", number: 2, weight: 0.2 },
  ];
  const searchParams = useSearchParams();
  const router = useRouter();
  // Read all pillar details from query
  const pillarId = searchParams.get("pillarId");
  // Find the selected pillar from dummy data
  const selectedPillar =
    pillarTemplates.find((p) => String(p.id) === String(pillarId)) ||
    pillarTemplates[0];
  if (!selectedPillar) return <div>No pillar found.</div>;

  // For dropdown change
  const handlePillarChange = (value: string) => {
    const newPillar = pillarTemplates.find((p) => String(p.id) === value);
    if (newPillar) {
      const params = new URLSearchParams({
        pillarId: String(newPillar.id),
        pillarName: newPillar.name,
        pillarWeight: String(newPillar.weight),
      }).toString();
      router.replace(`/qc/builder/create?${params}`);
    }
  };

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Create KPI Template</h1>
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <Label className="font-semibold">Select Pillar:</Label>
        <Select
          value={String(selectedPillar.id)}
          onValueChange={handlePillarChange}
        >
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Select a pillar" />
          </SelectTrigger>
          <SelectContent>
            {pillarTemplates.map((pillar) => (
              <SelectItem key={pillar.id} value={String(pillar.id)}>
                {pillar.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>
            <b>Pillar Name:</b> {selectedPillar.name}
          </span>
          <span>
            <b>Pillar Weight:</b> {selectedPillar.weight}
          </span>
        </div>
      </div>
      <p className="mb-8">
        Start building a KPI template for the selected pillar.
      </p>
      <FormBuilder /* pillarTemplateId={selectedPillar.id} */ />
      {/* TODO: On save, call the API to create the KPI template and link it to the pillar template */}
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
