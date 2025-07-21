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

interface AssignPillarTableProps {
  assignedPillars: any[];
  unassignedPillars: any[];
  onAssign: (pillar: any) => void;
  onUnassign: (pillar: any) => void;
  onView: (pillarId: string) => void;
}

export function AssignPillarTable({
  assignedPillars,
  unassignedPillars,
  onAssign,
  onUnassign,
  onView,
}: AssignPillarTableProps) {
  // State for editable weights
  const [assigned, setAssigned] = React.useState(assignedPillars);
  const [unassigned, setUnassigned] = React.useState(unassignedPillars);

  React.useEffect(() => {
    setAssigned(assignedPillars);
  }, [assignedPillars]);
  React.useEffect(() => {
    setUnassigned(unassignedPillars);
  }, [unassignedPillars]);

  const handleWeightChange = (
    type: "assigned" | "unassigned",
    idx: number,
    newValue: string,
  ) => {
    if (type === "assigned") {
      setAssigned((prev) =>
        prev.map((pillar, i) =>
          i === idx ? { ...pillar, weightA: newValue } : pillar,
        ),
      );
    } else {
      setUnassigned((prev) =>
        prev.map((pillar, i) =>
          i === idx ? { ...pillar, weightA: newValue } : pillar,
        ),
      );
    }
  };

  const totalAssignedWeight = assigned.reduce(
    (sum, pillar) => sum + Number(pillar.weightA ?? pillar.weight ?? 0),
    0,
  );

  return (
    <Card className="p-4">
      <div className="flex justify-end gap-2 mb-2">
        <Button
          size="sm"
          variant="default"
          onClick={() => {
            unassigned.forEach(onAssign);
          }}
        >
          Assign All
        </Button>
        <Button
          size="sm"
          variant="destructive"
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
            <TableHead className="text-left align-middle w-1/2">
              Pillar Name
            </TableHead>
            <TableHead className="text-center align-middle w-32">
              Weight (A)
            </TableHead>
            <TableHead className="text-center align-middle w-32">
              Action
            </TableHead>
            <TableHead className="text-center align-middle w-32">
              View
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Assigned Pillars */}
          {assigned.map((pillar, idx) => (
            <TableRow key={pillar.id}>
              <TableCell className="text-left align-middle">
                {pillar.pillar_name}
              </TableCell>
              <TableCell className="text-center align-middle">
                <Input
                  className="w-24 text-center"
                  value={pillar.weightA ?? pillar.weight ?? ""}
                  onChange={(e) =>
                    handleWeightChange("assigned", idx, e.target.value)
                  }
                />
              </TableCell>
              <TableCell className="text-center align-middle">
                <Button
                  size="sm"
                  className="text-xs px-2 py-1"
                  onClick={() => onUnassign(pillar)}
                >
                  Unassign
                </Button>
              </TableCell>
              <TableCell className="text-center align-middle">
                <Button
                  size="sm"
                  className="text-xs px-2 py-1"
                  onClick={() => onView(pillar.id)}
                >
                  View Pillar
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {/* Unassigned Pillars */}
          {unassigned.map((pillar, idx) => (
            <TableRow key={pillar.id}>
              <TableCell className="text-left align-middle">
                {pillar.pillar_name}
              </TableCell>
              <TableCell className="text-center align-middle">
                <Input
                  className="w-24 text-center"
                  value={pillar.weightA ?? pillar.weight ?? ""}
                  onChange={(e) =>
                    handleWeightChange("unassigned", idx, e.target.value)
                  }
                />
              </TableCell>
              <TableCell className="text-center align-middle">
                <Button
                  size="sm"
                  className="text-xs px-2 py-1"
                  onClick={() => onAssign(pillar)}
                >
                  Assign
                </Button>
              </TableCell>
              <TableCell className="text-center align-middle">
                <Button
                  size="sm"
                  className="text-xs px-2 py-1"
                  onClick={() => onView(pillar.id)}
                >
                  View Pillar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <tfoot>
          {assigned.length > 0 && (
            <tr>
              <td className="font-bold text-right" colSpan={2}>
                Total Weight (A)
              </td>
              <td className="font-bold text-center">{totalAssignedWeight}</td>
              <td />
            </tr>
          )}
        </tfoot>
      </Table>
    </Card>
  );
}
