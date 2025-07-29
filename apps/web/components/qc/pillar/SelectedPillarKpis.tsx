import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Separator } from "@workspace/ui/components/separator";
import { PillarKpiTable } from "@/components/qc/performance-sheet-table";
import { ArrowLeft, Plus, Edit2, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { PillarInstance } from "@workspace/types/types";

interface SelectedPillarKpisProps {
  pillar: PillarInstance;
  onBack: () => void;
  onEditPillar: (pillar: PillarInstance) => void;
  onDeletePillar: (pillarId: string) => void;
  onCreateKpi: (pillar: PillarInstance) => void;
  router: any;
}

export function SelectedPillarKpis({
  pillar,
  onBack,
  onEditPillar,
  onDeletePillar,
  onCreateKpi,
  router,
}: SelectedPillarKpisProps) {
  const [kpis, setKpis] = useState<any[]>([]);

  useEffect(() => {
    if (!pillar) return setKpis([]);
    // For now, use dummy data since KPIs are not part of PillarInstance
    // TODO: Fetch KPIs for this pillar when API is available
    setKpis([
      {
        kpi_no: 1,
        metric: "Student Awards",
        dataProvidedBy: "HoD",
        target: "25%",
        actual: "20%",
        percentAchieved: "80%",
        value: "80",
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
        value: "80",
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
        value: "40",
        status: "needs revision",
        kpiId: 3,
      },
    ]);
  }, [pillar]);

  if (!pillar) return null;

  const totalValue = kpis.reduce(
    (sum, kpi) => sum + (Number(kpi.value) || 0),
    0,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Pillars
        </Button>
      </div>

      {/* Pillar Info Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl font-bold">
                {pillar.name}
              </CardTitle>
              <CardDescription className="mt-2">
                Pillar #{pillar.id} • {kpis.length} KPIs
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-sm">
                KPIs: {pillar.counts.assignedkpi}
              </Badge>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEditPillar(pillar)}
                >
                  <Edit2 className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-destructive hover:text-destructive"
                  onClick={() => onDeletePillar(pillar.id)}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* KPIs Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">
                {pillar.name} KPIs
              </CardTitle>
              <CardDescription>
                Manage and review key performance indicators for this pillar
              </CardDescription>
            </div>
            <Button
              onClick={() => onCreateKpi(pillar)}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add KPI
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {kpis.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Plus className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No KPIs yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first KPI for this pillar to get started
              </p>
              <Button onClick={() => onCreateKpi(pillar)}>
                <Plus className="w-4 h-4 mr-2" />
                Create First KPI
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <PillarKpiTable
                onReviewKpi={(kpiId) => {
                  router.push(`/qc/builder/form/${kpiId}`);
                }}
                showStatusColumn={false}
              />

              <Separator />

              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Total Value:</span>
                <span className="font-bold text-lg">{totalValue}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
