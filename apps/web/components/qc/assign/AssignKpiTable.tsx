import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@workspace/ui/components/table";
import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import React from "react";

interface AssignKpiTableProps {
  assignedKpis: any[];
  unassignedKpis: any[];
  onAssign: (kpi: any) => void;
  onUnassign: (kpi: any) => void;
}

export function AssignKpiTable({
  assignedKpis,
  unassignedKpis,
  onAssign,
  onUnassign,
}: AssignKpiTableProps) {
  // Make value editable and track state
  const [assigned, setAssigned] = React.useState(assignedKpis);
  const [unassigned, setUnassigned] = React.useState(unassignedKpis);

  React.useEffect(() => {
    setAssigned(assignedKpis);
  }, [assignedKpis]);
  React.useEffect(() => {
    setUnassigned(unassignedKpis);
  }, [unassignedKpis]);

  const handleValueChange = (
    type: "assigned" | "unassigned",
    idx: number,
    newValue: string,
  ) => {
    if (type === "assigned") {
      setAssigned((prev) =>
        prev.map((kpi, i) => (i === idx ? { ...kpi, value: newValue } : kpi)),
      );
    } else {
      setUnassigned((prev) =>
        prev.map((kpi, i) => (i === idx ? { ...kpi, value: newValue } : kpi)),
      );
    }
  };

  const totalAssignedValue = assigned.reduce(
    (sum, kpi) => sum + Number(kpi.value ?? 0),
    0,
  );
  const totalUnassignedValue = unassigned.reduce(
    (sum, kpi) => sum + Number(kpi.value ?? 0),
    0,
  );

  return (
    <Card className="p-4">
      <div className="flex justify-end gap-2 mb-2">
        <Button
          size="sm"
          variant={unassigned.length > 0 ? "default" : "outline"}
          className={
            unassigned.length > 0 ? "" : "opacity-50 cursor-not-allowed"
          }
          disabled={unassigned.length === 0}
          onClick={() => {
            unassigned.forEach(onAssign);
          }}
        >
          Assign All
        </Button>
        <Button
          size="sm"
          variant={assigned.length > 0 ? "destructive" : "outline"}
          className={assigned.length > 0 ? "" : "opacity-50 cursor-not-allowed"}
          disabled={assigned.length === 0}
          onClick={() => {
            assigned.forEach(onUnassign);
          }}
        >
          Unassign All
        </Button>
      </div>
      <Table className="min-w-full table-fixed border-separate border-spacing-0">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center align-middle w-24">
              KPI Number
            </TableHead>
            <TableHead className="text-left align-middle w-56">
              Metric
            </TableHead>
            <TableHead className="text-center align-middle w-40">
              Data Provided By
            </TableHead>
            <TableHead className="text-center align-middle w-32">
              Target
            </TableHead>
            <TableHead className="text-center align-middle w-32">
              Value
            </TableHead>
            <TableHead className="text-center align-middle w-32">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assigned.map((kpi, idx) => (
            <TableRow key={kpi.id}>
              <TableCell className="text-center align-middle">
                {kpi.kpiNo ?? kpi.kpi_no ?? kpi.title ?? "-"}
              </TableCell>
              <TableCell className="text-left align-middle">
                {kpi.metric ?? kpi.title ?? "-"}
              </TableCell>
              <TableCell className="text-center align-middle">
                {kpi.dataProvidedBy ?? "-"}
              </TableCell>
              <TableCell className="text-center align-middle">
                {kpi.target2025 ?? kpi.target ?? "-"}
              </TableCell>
              <TableCell className="text-center align-middle">
                <Input
                  className="w-24 text-center"
                  value={kpi.value ?? ""}
                  onChange={(e) =>
                    handleValueChange("assigned", idx, e.target.value)
                  }
                />
              </TableCell>
              <TableCell className="text-center align-middle">
                <Button
                  size="sm"
                  variant="destructive"
                  className="text-xs px-2 py-1"
                  onClick={() => onUnassign(kpi)}
                  disabled={false}
                >
                  Unassign
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {unassigned.map((kpi, idx) => (
            <TableRow key={kpi.id}>
              <TableCell className="text-center align-middle">
                {kpi.kpiNo ?? kpi.kpi_no ?? kpi.title ?? "-"}
              </TableCell>
              <TableCell className="text-left align-middle">
                {kpi.metric ?? kpi.title ?? "-"}
              </TableCell>
              <TableCell className="text-center align-middle">
                {kpi.dataProvidedBy ?? "-"}
              </TableCell>
              <TableCell className="text-center align-middle">
                {kpi.target2025 ?? kpi.target ?? "-"}
              </TableCell>
              <TableCell className="text-center align-middle">
                <Input
                  className="w-24 text-center"
                  value={kpi.value ?? ""}
                  onChange={(e) =>
                    handleValueChange("unassigned", idx, e.target.value)
                  }
                />
              </TableCell>
              <TableCell className="text-center align-middle">
                <Button
                  size="sm"
                  variant="default"
                  className="text-xs px-2 py-1"
                  onClick={() => onAssign(kpi)}
                  disabled={false}
                >
                  Assign
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <tfoot>
          {assigned.length > 0 && (
            <tr>
              <td colSpan={4} className="font-bold text-right">
                Total Value (Assigned)
              </td>
              <td className="font-bold text-center">{totalAssignedValue}</td>
              <td />
            </tr>
          )}
        </tfoot>
      </Table>
    </Card>
  );
}
