"use client";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
// import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

// import { toast } from "sonner";
// import { useQueryClient } from "@tanstack/react-query";
// import type { FormConfig } from "@/lib/types";
import { KpiCard } from "@/components/qc/kpi-card";
import { PillarCard } from "@/components/qc/pillar-card";
import { PillarKpiTable } from "@/components/qc/performance-sheet-table";
import { PillarTemplateModal } from "@/components/qc/builder/PillarTemplateModal";
import { PillarTabs } from "@/components/qc/builder/PillarTabs";
import { PillarKpiSection } from "@/components/qc/builder/PillarKpiSection";

export default function KpiBuilderPage() {
  const router = useRouter();
  // Dummy data for pillar templates
  const [pillarTemplates, setPillarTemplates] = useState<any[]>([
    { id: 1, name: "Academic Excellence", number: 1, weight: 0.3 },
    { id: 2, name: "Research Progression", number: 2, weight: 0.2 },
  ]);
  const [creatingPillar, setCreatingPillar] = useState(false);
  const [pillarName, setPillarName] = useState("");
  const [pillarWeight, setPillarWeight] = useState("");
  const [selectedPillarTemplate, setSelectedPillarTemplate] = useState<
    any | null
  >(pillarTemplates[0] ?? null);
  const [editingPillar, setEditingPillar] = useState<any | null>(null);
  // TODO: Remove dummy data when API is implemented.
  const [kpiTemplates, setKpiTemplates] = useState<any[]>([
    {
      id: "kpi-1",
      kpi_name: "Student Awards",
      kpi_description: "Number of awards won by students",
      pillarId: "pillar-1",
    },
    {
      id: "kpi-2",
      kpi_name: "Research Papers",
      kpi_description: "Number of research papers published",
      pillarId: "pillar-2",
    },
  ]);

  // Handlers for view/edit/delete (dummy)
  const handleViewEdit = (id: number) =>
    alert(`View/Edit Pillar Template ${id}`);
  const handleDelete = (id: number) =>
    setPillarTemplates((prev) => prev.filter((p) => p.id !== id));

  // Handler for form submit (dummy)
  const handleAddPillar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pillarName || !pillarWeight) return;
    setPillarTemplates((prev) => [
      ...prev,
      {
        id: Math.max(0, ...prev.map((p: any) => p.id)) + 1,
        name: pillarName,
        number: Number(pillarWeight),
        weight: Number(pillarWeight),
      },
    ]);
    setPillarName("");
    setPillarWeight("");
    setCreatingPillar(false);
  };

  // Handler for edit (preload values)
  const handleEditPillar = (pillar: any) => {
    setPillarName(pillar.name);
    setPillarWeight(String(pillar.weight));
    setEditingPillar(pillar);
    setCreatingPillar(true);
  };

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">KPI Builder</h1>
      {/* Pillar Template List and Create */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-xl font-semibold">Pillar Templates</h2>
          <Button variant="outline" onClick={() => setCreatingPillar(true)}>
            + Create Pillar Template
          </Button>
        </div>
        <PillarTemplateModal
          open={creatingPillar}
          onOpenChange={(open) => {
            setCreatingPillar(open);
            if (!open) {
              setEditingPillar(null);
              setPillarName("");
              setPillarWeight("");
            }
          }}
          pillarName={pillarName}
          setPillarName={setPillarName}
          pillarWeight={pillarWeight}
          setPillarWeight={setPillarWeight}
          handleAddPillar={handleAddPillar}
        />
        {/* Pillar Template Cards */}
        <PillarTabs
          pillars={pillarTemplates}
          selectedPillarId={
            selectedPillarTemplate?.id ?? pillarTemplates[0]?.id
          }
          onSelect={setSelectedPillarTemplate}
        />
        {/* Show KPIs for selected pillar below cards */}
        <PillarKpiSection
          pillar={selectedPillarTemplate}
          onViewEdit={(id) => {
            const pillar = pillarTemplates.find((p) => p.id === id);
            if (pillar) handleEditPillar(pillar);
          }}
          onDelete={handleDelete}
          router={router}
        />
      </div>
    </main>
  );
}
