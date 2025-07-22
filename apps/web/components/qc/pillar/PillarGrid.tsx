import { PillarCard } from "./PillarCard";
import { Button } from "@workspace/ui/components/button";
import { Plus, AlertTriangle } from "lucide-react";
import { Separator } from "@workspace/ui/components/separator";
import { Badge } from "@workspace/ui/components/badge";
import { PillarInstance } from "@workspace/types/types";
import { WeightValidation } from "@/components/common/WeightValidation";

interface PillarGridProps {
  pillars: PillarInstance[];
  selectedPillar: PillarInstance | null;
  onSelectPillar: (pillar: PillarInstance) => void;
  onEditPillar: (pillar: PillarInstance) => void;
  onDeletePillar: (pillarId: number) => void;
  onCreateKpi: (pillar: PillarInstance) => void;
  onCreatePillar: () => void;
  kpiCounts?: Record<number, number>;
  deletingPillarId?: number | null;
}

export function PillarGrid({
  pillars,
  selectedPillar,
  onSelectPillar,
  onEditPillar,
  onDeletePillar,
  onCreateKpi,
  onCreatePillar,
  kpiCounts = {},
  deletingPillarId = null,
}: PillarGridProps) {
  // Calculate total weight
  const totalWeight = pillars.reduce((sum, pillar) => {
    return sum + (pillar.pillar_value || 0);
  }, 0);

  // Check if total weight equals 1
  const isWeightValid = Math.abs(totalWeight - 1) < 0.001; // Allow for floating point precision

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Pillar Templates
          </h2>
          <p className="text-muted-foreground">
            Manage your KPI pillars and their associated metrics
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">
              Total Pillars:{" "}
              <span className="font-semibold">{pillars.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Total Weight:
              </span>
              <Badge
                variant={isWeightValid ? "default" : "destructive"}
                className="flex items-center gap-1"
              >
                {totalWeight.toFixed(2)}
                {!isWeightValid && <AlertTriangle className="w-3 h-3" />}
              </Badge>
            </div>
          </div>
          <Button onClick={onCreatePillar}>
            <Plus className="w-4 h-4 mr-2" />
            Create Pillar
          </Button>
        </div>
      </div>

      <Separator />

      {/* Weight validation component */}
      {/* Only show WeightValidation if not valid; otherwise, render nothing */}
      {pillars.length > 0 && !isWeightValid && (
        <WeightValidation
          currentWeight={totalWeight}
          showDetails={false}
          className="bg-muted/50 p-4 rounded-lg"
        />
      )}

      {pillars.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <Plus className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No pillars created yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first pillar template to get started with KPI management
          </p>
          <Button onClick={onCreatePillar}>
            <Plus className="w-4 h-4 mr-2" />
            Create First Pillar
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <PillarCard
              key={pillar.id}
              pillar={pillar}
              isSelected={selectedPillar?.id === pillar.id}
              onSelect={onSelectPillar}
              onEdit={onEditPillar}
              onDelete={onDeletePillar}
              onCreateKpi={onCreateKpi}
              kpiCount={kpiCounts[pillar.id] || 0}
              isDeleting={deletingPillarId === pillar.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
