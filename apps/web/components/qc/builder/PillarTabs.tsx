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
  return (
    <Tabs value={String(selectedPillarId)} className="w-full">
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
    </Tabs>
  );
}
