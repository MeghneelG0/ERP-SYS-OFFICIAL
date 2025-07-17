"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Label } from "@workspace/ui/components/label";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { AssignPillarTable } from "@/components/qc/assign/AssignPillarTable";
import { AssignKpiTable } from "@/components/qc/assign/AssignKpiTable";

// TODO: Implement these hooks and APIs
// import { useFetchDepartments } from "@/hooks/departments";
// import { useFetchPillarTemplates } from "@/hooks/pillarTemplates";
// import { useAssignPillarToDepartment, useFetchDepartmentPillars } from "@/hooks/departmentPillars";
// import { useFetchDepartmentKpis } from "@/hooks/departmentKpis";

export default function AssignKpiToDepartmentPage() {
  // TODO: Replace with GET /api/departments
  const [departments] = useState<any[]>([
    { id: "dept-1", name: "Computer Science and Engineering" },
    { id: "dept-2", name: "Mechanical Engineering" },
  ]);
  // TODO: Replace with GET /api/pillar-templates
  const [allPillars] = useState<any[]>([
    { id: "pillar-1", pillar_name: "Academic Excellence" },
    { id: "pillar-2", pillar_name: "Research & Innovation" },
    { id: "pillar-3", pillar_name: "Industry Connect" },
  ]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<
    string | null
  >(null);
  const [assignedPillars, setAssignedPillars] = useState<any[]>([]); // TODO: Replace with GET /api/department-pillars?dept_id=...
  const [unassignedPillars, setUnassignedPillars] = useState<any[]>([]); // TODO: Filter allPillars - assignedPillars
  const [selectedPillarId, setSelectedPillarId] = useState<string | null>(null);
  const [assignedKpis, setAssignedKpis] = useState<any[]>([]); // TODO: Replace with GET /api/department-kpis?dept_pillar_id=...
  const [unassignedKpis, setUnassignedKpis] = useState<any[]>([]); // TODO: Filter all KPI templates - assignedKpis
  const kpiSectionRef = useRef<HTMLDivElement>(null);

  // Simulate fetchingdepartment_pillar when department changes
  const handleDepartmentChange = (deptId: string) => {
    setSelectedDepartmentId(deptId);
    setSelectedPillarId(null);
    // TODO: Fetch assigneddepartment_pillar for department (GET /api/department-pillars?dept_id=...)
    // Dummy: Assign first twodepartment_pillar to department
    setAssignedPillars(allPillars.slice(0, 2));
    setUnassignedPillars(allPillars.slice(2));
    setAssignedKpis([]);
    setUnassignedKpis([]);
  };

  // Simulate fetching KPIs when pillar changes
  const handlePillarSelect = (pillarId: string) => {
    setSelectedPillarId(pillarId);
    // TODO: Fetch assigned KPIs for department pillar (GET /api/department-kpis?dept_pillar_id=...)
    // Dummy: Assign one KPI to pillar
    setAssignedKpis([
      {
        id: "kpi-1",
        title: "KPI 1",
        description: "Awards received by the students",
        elements: [1, 2, 3],
        value: 10,
      },
    ]);
    setUnassignedKpis([
      {
        id: "kpi-2",
        title: "KPI 2",
        description: "Research papers published",
        elements: [1, 2],
        value: 5,
      },
      {
        id: "kpi-3",
        title: "KPI 3",
        description: "Industry projects",
        elements: [1],
        value: 2,
      },
    ]);
    // Scroll to KPIs section
    setTimeout(() => {
      kpiSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Simulate assigning a pillar to a department
  const handleAssignPillar = (pillar: any) => {
    setAssignedPillars((prev) => [...prev, pillar]);
    setUnassignedPillars((prev) => prev.filter((p) => p.id !== pillar.id));
    toast.success("Pillar assigned to department (dummy)");
    // TODO: POST /api/department-pillars
  };

  // Simulate assigning a KPI to a pillar
  const handleAssignKpi = (kpi: any) => {
    setAssignedKpis((prev) => [...prev, kpi]);
    setUnassignedKpis((prev) => prev.filter((k) => k.id !== kpi.id));
    toast.success("KPI assigned to pillar (dummy)");
    // TODO: POST /api/department-kpis
  };

  // Simulate unassigning a KPI from a pillar
  const handleUnassignKpi = (kpi: any) => {
    setUnassignedKpis((prev) => [...prev, kpi]);
    setAssignedKpis((prev) => prev.filter((k) => k.id !== kpi.id));
    toast.success("KPI unassigned from pillar (dummy)");
    // TODO: DELETE /api/department-kpis/:id
  };

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Assign Pillar and Kpi to Department</h1>
      {/* Department Dropdown */}
      <div className="mb-8 flex gap-4 items-center">
        <Label htmlFor="department-select" className="font-medium mr-2">
          Department:
        </Label>
        <Select
          value={selectedDepartmentId ?? ""}
          onValueChange={handleDepartmentChange}
        >
          <SelectTrigger className="min-w-[250px]">
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept.id} value={dept.id}>
                {dept.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Assign Pillar Section */}
      {selectedDepartmentId && (
        <>
          <h2 className="text-xl font-semibold mb-2">Assign Pillar</h2>
          <div className="mb-8">
            <AssignPillarTable
              assignedPillars={assignedPillars}
              unassignedPillars={unassignedPillars}
              onAssign={handleAssignPillar}
              onUnassign={(pillar) => {
                setUnassignedPillars((prev) => [...prev, pillar]);
                setAssignedPillars((prev) => prev.filter((p) => p.id !== pillar.id));
                toast.success("Pillar unassigned from department (dummy)");
                // TODO: DELETE /api/department-pillars/:id
              }}
              onView={handlePillarSelect}
            />
          </div>
        </>
      )}

      {/* KPIs for Selected Pillar */}
      {selectedDepartmentId && (
        <>
          {/* KPIs for Selected Pillar */}
          {selectedPillarId && (
            <div ref={kpiSectionRef}>
              <h2 className="text-xl font-semibold mb-2">
                {allPillars.find((p) => p.id === selectedPillarId)?.pillar_name || "KPIs for Pillar"}
              </h2>
              <div className="mb-6">
                <AssignKpiTable
                  assignedKpis={assignedKpis}
                  unassignedKpis={unassignedKpis}
                  onAssign={handleAssignKpi}
                  onUnassign={handleUnassignKpi}
                />
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
}
