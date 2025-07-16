"use client";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@workspace/ui/components/alert-dialog";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { useFetchForms, useDeleteKpi } from "@/hooks/forms";
import { useState } from "react";
import { Badge } from "@workspace/ui/components/badge";
import {
  useFetchPillars,
  useCreatePillar,
  useFetchDepartments,
  useAssignKpiToPillar,
  useFetchAssignedKpis,
} from "@/hooks/dept";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import type { FormConfig } from "@/lib/types";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@workspace/ui/components/table";
import { KpiCard } from "@/components/qoc/kpi-card";
import { PillarCard } from "@/components/qoc/pillar-card";
import { PillarKpiTable } from "@/components/qoc/performance-sheet-table";

// TODO: Implement these hooks and APIs
// import { useFetchPillarTemplates, useCreatePillarTemplate } from "@/hooks/pillarTemplates";
// import { useFetchKpiTemplates, useCreateKpiTemplate } from "@/hooks/kpiTemplates";

export default function KpiBuilderPage() {
  const router = useRouter();
  // Dummy data for pillar templates
  const [pillarTemplates, setPillarTemplates] = useState<any[]>([
    { id: 1, name: "Academic Excellence", number: 1, weight: 0.3 },
    { id: 2, name: "Research Progression", number: 2, weight: 0.2 },
  ]);
  const [creatingPillar, setCreatingPillar] = useState(false);
  const [pillarName, setPillarName] = useState("");
  const [pillarNumber, setPillarNumber] = useState("");
  const [pillarWeight, setPillarWeight] = useState("");
  const [selectedPillarTemplate, setSelectedPillarTemplate] = useState<
    any | null
  >(null);
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
    if (!pillarName || !pillarNumber || !pillarWeight) return;
    setPillarTemplates((prev) => [
      ...prev,
      {
        id: Math.max(0, ...prev.map((p: any) => p.id)) + 1,
        name: pillarName,
        number: Number(pillarNumber),
        weight: Number(pillarWeight),
      },
    ]);
    setPillarName("");
    setPillarNumber("");
    setPillarWeight("");
    setCreatingPillar(false);
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
        {creatingPillar && (
          <Card className="mb-4 max-w-xl">
            <CardHeader>
              <CardTitle className="text-lg">
                Create New Pillar Template
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddPillar} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={pillarName}
                    onChange={(e) => setPillarName(e.target.value)}
                    className="w-full border rounded px-2 py-1 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Pillar Number
                  </label>
                  <input
                    type="number"
                    value={pillarNumber}
                    onChange={(e) => setPillarNumber(e.target.value)}
                    className="w-full border rounded px-2 py-1 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Weight
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={pillarWeight}
                    onChange={(e) => setPillarWeight(e.target.value)}
                    className="w-full border rounded px-2 py-1 text-sm"
                    required
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCreatingPillar(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="w-fit">
                    Add Pillar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
        {/* Pillar Template Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pillarTemplates.length === 0 ? (
            <p>No pillar templates found. Create one to get started.</p>
          ) : (
            pillarTemplates.map((pillar) => (
              <PillarCard
                key={pillar.id}
                pillarName={pillar.name}
                description={`Number: ${pillar.number}, Weight: ${pillar.weight}`}
                selected={selectedPillarTemplate?.id === pillar.id}
                onView={() => setSelectedPillarTemplate(pillar)}
              />
            ))
          )}
        </div>
        {/* Show KPIs for selected pillar below cards */}
        {selectedPillarTemplate && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold tracking-tight">
                {selectedPillarTemplate.name} KPIs
              </h3>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    alert(`View/Edit Pillar ${selectedPillarTemplate.id}`)
                  }
                >
                  View/Edit Pillar
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() =>
                    alert(`Delete Pillar ${selectedPillarTemplate.id}`)
                  }
                >
                  Delete Pillar
                </Button>
              </div>
            </div>
            <PillarKpiTable
              pillar={selectedPillarTemplate.name}
              kpis={[
                {
                  kpi_no: 1,
                  metric: "Student Awards",
                  dataProvidedBy: "HoD",
                  target: "25%",
                  actual: "20%",
                  percentAchieved: "80%",
                  status: "pending review",
                  kpiId: 1,
                },
                {
                  kpi_no: 2,
                  metric: "Research Papers",
                  dataProvidedBy: "HoD",
                  target: "10",
                  actual: "8",
                  percentAchieved: "80%",
                  status: "approved",
                  kpiId: 2,
                },
                {
                  kpi_no: 3,
                  metric: "Industry Projects",
                  dataProvidedBy: "HoD",
                  target: "5",
                  actual: "2",
                  percentAchieved: "40%",
                  status: "needs revision",
                  kpiId: 3,
                },
              ]}
              onReviewKpi={(kpiId) => {
                alert(`View/Edit KPI ${kpiId}`);
              }}
              showStatusColumn={false}
            />
          </div>
        )}
      </div>

      {/* KPI Templates for Selected Pillar */}
      {selectedPillarTemplate && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-xl font-semibold">
              KPI Templates for "{selectedPillarTemplate.pillar_name}"
            </h2>
            {/* Route to the KPI template creation page using FormBuilder */}
            <Button
              onClick={() =>
                router.push(
                  `/qoc/builder/create?kpiPillarTemplateId=${selectedPillarTemplate.id}`,
                )
              }
            >
              + Create KPI Template
            </Button>
          </div>
          {/* List of KPI templates (replace with real data) */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {kpiTemplates.filter(
              (k) => k.pillarId === selectedPillarTemplate.id,
            ).length === 0 ? (
              <p>
                No KPI templates found for this pillar. Create one to get
                started.
              </p>
            ) : (
              kpiTemplates
                .filter((k) => k.pillarId === selectedPillarTemplate.id)
                .map((kpi) => (
                  <KpiCard
                    key={kpi.id}
                    kpiName={kpi.kpi_name}
                    description={kpi.kpi_description}
                    onView={() => router.push(`/qoc/builder/form/${kpi.id}`)}
                    onEdit={() => router.push(`/qoc/builder/form/${kpi.id}?mode=edit`)}
                    onDelete={() => {
                      /* TODO: Delete KPI template API */
                    }}
                  />
                ))
            )}
          </div>
        </div>
      )}
    </main>
  );
}
