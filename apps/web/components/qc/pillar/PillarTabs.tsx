import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { PillarInstance } from "@workspace/types/types";
import React from "react";

interface PillarTabsProps {
  pillars: PillarInstance[];
  selectedPillarId: number | string;
  onSelect: (pillar: any) => void;
}

export function PillarTabs({
  pillars,
  selectedPillarId,
  onSelect,
}: PillarTabsProps) {
  // Calculate total weight
  const totalWeight = pillars.reduce(
    (sum, p) => sum + (Number(p.pillar_value) || 0),
    0,
  );
  return (
    <Tabs value={String(selectedPillarId)} className="w-full">
      <div className="flex items-center justify-between w-full">
        <TabsList className="flex flex-wrap gap-2">
          {pillars.map((pillar) => (
            <TabsTrigger
              key={pillar.id}
              value={String(pillar.id)}
              onClick={() => onSelect(pillar)}
              className="capitalize"
            >
              {pillar.pillar_name} (w={pillar.pillar_value})
            </TabsTrigger>
          ))}
        </TabsList>
        <span className="ml-4 font-semibold text-sm text-white whitespace-nowrap">
          Total Weight: {totalWeight}
        </span>
      </div>
    </Tabs>
  );
}
