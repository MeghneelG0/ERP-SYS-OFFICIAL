import { Button } from "@workspace/ui/components/button";
import { PillarKpiTable } from "@/components/qac/performance-sheet-table";
import React, { useEffect, useState } from "react";

interface PillarKpiSectionProps {
  pillar: any;
  onViewEdit: (id: number) => void;
  onDelete: (id: number) => void;
  router: any;
}

export function PillarKpiSection({ pillar, onViewEdit, onDelete, router }: PillarKpiSectionProps) {
  const [kpis, setKpis] = useState<any[]>([]);

  useEffect(() => {
    if (!pillar) return setKpis([]);
    // Use pillar.kpis if available, otherwise fallback to dummy data
    if (pillar.kpis) {
      setKpis(pillar.kpis);
    } else {
      setKpis([
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
      ]);
    }
  }, [pillar]);

  if (!pillar) return null;
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold tracking-tight">
          {pillar.name} KPIs
        </h3>
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => {
              const params = new URLSearchParams({
                pillarId: pillar.id,
                pillarName: pillar.name,
                pillarNumber: pillar.number,
                pillarWeight: pillar.weight,
              }).toString();
              router.push(`/qc/builder/create?${params}`);
            }}
          >
            + Create KPI Template
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onViewEdit(pillar.id)}
          >
            Edit Pillar
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(pillar.id)}
          >
            Delete Pillar
          </Button>
        </div>
      </div>
      <div className=''>
        <PillarKpiTable
            pillar={pillar.name}
            kpis={kpis}
            onReviewKpi={(kpiId) => {
              router.push(`/qac/builder/form/${kpiId}`);
            }}
            showStatusColumn={false}
        />
      </div>
    </div>
  );
}
