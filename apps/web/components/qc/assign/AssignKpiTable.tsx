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
  return (
    <Card className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>KPI Number</TableHead>
            <TableHead>Metric</TableHead>
            <TableHead>Data Provided By</TableHead>
            <TableHead>Target</TableHead>
            <TableHead className="text-right">Value</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assignedKpis.map((kpi) => (
            <TableRow key={kpi.id}>
              <TableCell>
                {kpi.kpiNo ?? kpi.kpi_no ?? kpi.title ?? "-"}
              </TableCell>
              <TableCell>{kpi.metric ?? kpi.title ?? "-"}</TableCell>
              <TableCell>{kpi.dataProvidedBy ?? "-"}</TableCell>
              <TableCell>{kpi.target2025 ?? kpi.target ?? "-"}</TableCell>
              <TableCell className="text-right">{kpi.value ?? "-"}</TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  variant="destructive"
                  className="text-xs px-2 py-1"
                  onClick={() => onUnassign(kpi)}
                >
                  Unassign
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {unassignedKpis.map((kpi) => (
            <TableRow key={kpi.id}>
              <TableCell>
                {kpi.kpiNo ?? kpi.kpi_no ?? kpi.title ?? "-"}
              </TableCell>
              <TableCell>{kpi.metric ?? kpi.title ?? "-"}</TableCell>
              <TableCell>{kpi.dataProvidedBy ?? "-"}</TableCell>
              <TableCell>{kpi.target2025 ?? kpi.target ?? "-"}</TableCell>
              <TableCell className="text-right">{kpi.value ?? "-"}</TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  className="text-xs px-2 py-1"
                  onClick={() => onAssign(kpi)}
                >
                  Assign
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
