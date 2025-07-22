import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import React from "react";

interface PillarTabsProps {
  pillars: any[];
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
    (sum, p) => sum + (Number(p.weight) || 0),
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
              {pillar.name} (w={pillar.weight})
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
