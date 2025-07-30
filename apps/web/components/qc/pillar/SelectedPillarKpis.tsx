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
import React from "react";
import { PillarInstance, KpiTemplateInstance } from "@workspace/types/types";
import { useGetKpis } from "@/queries/qc/kpi";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorDisplay } from "@/components/common/ErrorDisplay";

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
  // Fetch real KPIs for this pillar
  const { data: kpis = [], isLoading, error } = useGetKpis(pillar.id);

  if (!pillar) return null;

  // Transform KPI data to match the table format
  const transformedKpis = kpis.map((kpi: KpiTemplateInstance) => ({
    kpi_no: kpi.kpi_number,
    metric: kpi.kpi_metric_name,
    dataProvidedBy: kpi.data_provided_by || "N/A",
    target: kpi.kpi_value?.toString() || "0",
    actual: kpi.percentage_target_achieved?.toString() || "0",
    percentAchieved: kpi.percentage_target_achieved?.toString() || "0",
    value: kpi.kpi_value?.toString() || "0", // This is now 0-1 scale
    status: "pending", // Default status since KpiTemplateInstance doesn't have kpi_status
    kpiId: kpi.id,
  }));

  const totalValue = transformedKpis.reduce(
    (sum, kpi) => sum + (Number(kpi.value) || 0),
    0,
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
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
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner message="Loading KPIs..." size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
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
        <div className="flex items-center justify-center py-12">
          <ErrorDisplay
            title="Error loading KPIs"
            message="Failed to load KPI data for this pillar"
            error={error}
            onRetry={() => window.location.reload()}
          />
        </div>
      </div>
    );
  }

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
                {pillar.pillar_name}
              </CardTitle>
              <CardDescription className="mt-2">
                Pillar #{pillar.id} • {transformedKpis.length} KPIs
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-sm">
                KPIs: {transformedKpis.length}
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
                {pillar.pillar_name} KPIs
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
          {transformedKpis.length === 0 ? (
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
                kpis={transformedKpis}
                onReviewKpi={(kpiId) => {
                  router.push(
                    `/qc/builder/form/${kpiId}?pillarId=${pillar.id}`,
                  );
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
