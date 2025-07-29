"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Edit2, Trash2, Plus } from "lucide-react";

import { PillarInstance } from "@workspace/types/types";
import { DeleteConfirmationModal } from "@/components/common/DeleteConfirmation";

interface PillarCardProps {
  pillar: PillarInstance;
  isSelected: boolean;
  onSelect: (pillar: PillarInstance) => void;
  onEdit: (pillar: PillarInstance) => void;
  onDelete: (pillarId: number) => void;
  onCreateKpi: (pillar: PillarInstance) => void;
  kpiCount?: number;
  isDeleting?: boolean;
}

export function PillarCard({
  pillar,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  onCreateKpi,
  kpiCount = 0,
  isDeleting = false,
}: PillarCardProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  return (
    <>
      <Card
        className={`cursor-pointer transition-all duration-200 hover:shadow-lg h-full flex flex-col ${
          isSelected
            ? "ring-2 ring-primary bg-primary/5 border-primary"
            : "hover:border-primary/50"
        }`}
        onClick={() => onSelect(pillar)}
      >
        <CardHeader className="pb-2 flex-shrink-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold">
                {pillar.name}
              </CardTitle>
            </div>
            <div className="flex flex-col items-end gap-1">
              {pillar.counts?.assignedkpi > 0 && (
                <Badge variant="secondary" className="text-xs">
                  KPIs: {pillar.counts.assignedkpi}
                </Badge>
              )}
              {pillar.pillar_value !== undefined && (
                <Badge variant="outline" className="text-xs">
                  Weight: {(pillar.pillar_value * 100).toFixed(0)}%
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0 flex-1 flex flex-col">
          <div className="flex-1">
            {pillar.description && (
              <div className="text-sm text-muted-foreground mb-3">
                <p
                  className="overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    lineHeight: "1.4em",
                    maxHeight: "2.8em",
                  }}
                >
                  {pillar.description}
                </p>
              </div>
            )}
          </div>

          {/* Fixed bottom section */}
          <div className="mt-auto space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">KPI Count:</span>
              <span className="font-medium">{kpiCount}</span>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onCreateKpi(pillar);
                }}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add KPI
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(pillar);
                }}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-destructive hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDeleteModalOpen(true);
                }}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-destructive"></div>
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => onDelete(pillar.id)}
        itemName={pillar.name}
        itemType="Pillar"
        isLoading={isDeleting}
      />
    </>
  );
}
