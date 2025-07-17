import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@workspace/ui/components/table";
import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";

interface AssignPillarTableProps {
  assignedPillars: any[];
  unassignedPillars: any[];
  onAssign: (pillar: any) => void;
  onUnassign: (pillar: any) => void;
  onView: (pillarId: string) => void;
}

export function AssignPillarTable({ assignedPillars, unassignedPillars, onAssign, onUnassign, onView }: AssignPillarTableProps) {
  return (
    <Card className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Pillar Name</TableHead>
            <TableHead className="text-center">Weight (A)</TableHead>
            <TableHead className="text-center">Action</TableHead>
            <TableHead className="text-right">View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Assigned Pillars */}
          {assignedPillars.map((pillar) => (
            <TableRow key={pillar.id}>
              <TableCell className="text-left">{pillar.pillar_name}</TableCell>
              <TableCell className="text-center">{pillar.weightA ?? pillar.weight ?? '-'}</TableCell>
              <TableCell className="text-center">
                <Button size="sm" variant="destructive" className="text-xs px-2 py-1" onClick={() => onUnassign(pillar)}>
                  Unassign
                </Button>
              </TableCell>
              <TableCell className="text-right">
                <Button size="sm" className="text-xs px-2 py-1" onClick={() => onView(pillar.id)}>
                  View Pillar
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {/* Unassigned Pillars */}
          {unassignedPillars.map((pillar) => (
            <TableRow key={pillar.id}>
              <TableCell className="text-left">{pillar.pillar_name}</TableCell>
              <TableCell className="text-center">{pillar.weightA ?? pillar.weight ?? '-'}</TableCell>
              <TableCell className="text-center">
                <Button size="sm" className="text-xs px-2 py-1" onClick={() => onAssign(pillar)}>
                  Assign
                </Button>
              </TableCell>
              <TableCell className="text-right">
                <Button size="sm" className="text-xs px-2 py-1" onClick={() => onView(pillar.id)}>
                  View Pillar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
