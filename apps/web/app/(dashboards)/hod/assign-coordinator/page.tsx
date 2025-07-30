"use client";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"; // Assuming path for table components
import { Badge } from "@workspace/ui/components/badge";
import { UserPlus } from "lucide-react";
import AssignDialog from "@/components/hod/assign-dialog";

export default function KPICoordinatorsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mock data for demonstration purposes
  const faculties = [
    { value: "faculty1", label: "John Doe" },
    { value: "faculty2", label: "Jane Smith" },
  ];

  const kpis = [
    { value: "kpi1", label: "KPI 1" },
    { value: "kpi2", label: "KPI 2" },
    { value: "kpi3", label: "KPI 3" },
  ];

  const coordinators = [
    {
      name: "Dr. Deepak Sinwar",
      category: "Research Publications",
      assigned: 12,
      status: "Active",
      avatar: "ER",
    },
    {
      name: "Dr. Sandeep Chaurasia",
      category: "Teaching Evaluation",
      assigned: 15,
      status: "Active",
      avatar: "JW",
    },
    {
      name: "Dr. Arjun Singh",
      category: "Community Service",
      assigned: 8,
      status: "Active",
      avatar: "AP",
    },
    {
      name: "Dr. Soumya Goel",
      category: "Grant Applications",
      assigned: 7,
      status: "Active",
      avatar: "RK",
    },
  ];

  const handleAssignSubmit = (data: {
    facultyId: string;
    role: string;
    kpis: string[];
  }) => {
    console.log("Assignment Data:", data);
    // Add your submission logic here
  };

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <CardTitle>KPI Coordinators</CardTitle>
            <CardDescription>
              Manage and assign KPI coordinators for your department.
            </CardDescription>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Assign Coordinator
          </Button>
        </CardHeader>
        <CardContent>
          <AssignDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            faculties={faculties}
            kpis={kpis}
            onSubmit={handleAssignSubmit}
          />
          {/* The refactored table starts here */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Coordinator</TableHead>
                <TableHead>KPI Category</TableHead>
                <TableHead>Assigned Faculty</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coordinators.map((coordinator, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>{coordinator.avatar}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{coordinator.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{coordinator.category}</TableCell>
                  <TableCell>{coordinator.assigned} faculty members</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700"
                    >
                      {coordinator.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/50 dark:hover:text-red-300"
                      >
                        Remove
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
