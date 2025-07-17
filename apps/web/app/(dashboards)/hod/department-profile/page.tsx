'use client';

import React, { useState } from "react";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@workspace/ui/components/table";

export default function DepartmentProfilePage() {
  const FacultyName = "FOSTA"; // This should be replaced with the actual department name variable
  const schoolName = "School of CSE"; // This should be replaced with the actual school name variable

  const [data, setData] = useState({
    ugPrograms: 0,
    pgPrograms: 0,
    totalCourses: 0,
    evenSemCreditsJanJun: 0,
    evenSemCreditsJulDec: 0,
    studentsInternship: 0,
    studentsProject: 0,
    fullTimeTeachers: 0,
  });

  const [yearData, setYearData] = useState([
    { year: 1, intake: 0, admitted: 0 },
    { year: 2, intake: 0, admitted: 0 },
    { year: 3, intake: 0, admitted: 0 },
    { year: 4, intake: 0, admitted: 0 },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: Number(e.target.value) });
  };

  const handleYearChange = (idx: number, field: "intake" | "admitted", value: number) => {
    setYearData((prev) => prev.map((row, i) => i === idx ? { ...row, [field]: value } : row));
  };

  const totalAdmitted = yearData.reduce((sum, row) => sum + row.admitted, 0);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Save logic here (API integration later)
    alert("Saved!");
  };

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Department Profile</h1>
      <h2 className="text-xl font-semibold mb-2">{FacultyName}</h2>
      <h3 className="text-lg font-medium mb-4 text-muted-foreground">
        {schoolName}
      </h3>
      <form
        onSubmit={handleSave}
        className="rounded-lg shadow p-6 max-w-2xl w-full"
      >
        <h4 className="text-lg font-semibold mb-4">Department Name</h4>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Field</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Number of UG Programs Offered</TableCell>
              <TableCell>
                <Input
                  name="ugPrograms"
                  type="number"
                  value={data.ugPrograms}
                  onChange={handleChange}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Number of PG Programs Offered</TableCell>
              <TableCell>
                <Input
                  name="pgPrograms"
                  type="number"
                  value={data.pgPrograms}
                  onChange={handleChange}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Total Number of Courses (including even and odd Sem.)
              </TableCell>
              <TableCell>
                <Input
                  name="totalCourses"
                  type="number"
                  value={data.totalCourses}
                  onChange={handleChange}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Total Theory course credits in all programs during Even Sem
                (Jan-Jun 2025)
              </TableCell>
              <TableCell>
                <Input
                  name="evenSemCreditsJanJun"
                  type="number"
                  value={data.evenSemCreditsJanJun}
                  onChange={handleChange}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Total Theory course credits in all programs during Even Sem
                (July-Dec 2025)
              </TableCell>
              <TableCell>
                <Input
                  name="evenSemCreditsJulDec"
                  type="number"
                  value={data.evenSemCreditsJulDec}
                  onChange={handleChange}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Total number of students eligible for Internship (if applicable)
              </TableCell>
              <TableCell>
                <Input
                  name="studentsInternship"
                  type="number"
                  value={data.studentsInternship}
                  onChange={handleChange}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Total number of students eligible for Project (if applicable)
              </TableCell>
              <TableCell>
                <Input
                  name="studentsProject"
                  type="number"
                  value={data.studentsProject}
                  onChange={handleChange}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button type="submit" className="mt-4">
          Save
        </Button>
      </form>

      {/* Year wise students strength table */}
      <div className="rounded-lg shadow p-6 max-w-2xl w-full mt-8">
        <h4 className="text-lg font-semibold mb-4">
          Year wise students strength (all programs)
        </h4>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Year</TableHead>
              <TableHead>Intake</TableHead>
              <TableHead>Admitted</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {yearData.map((row, idx) => (
              <TableRow key={row.year}>
                <TableCell>{row.year}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={row.intake}
                    onChange={(e) =>
                      handleYearChange(idx, "intake", Number(e.target.value))
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={row.admitted}
                    onChange={(e) =>
                      handleYearChange(idx, "admitted", Number(e.target.value))
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <tfoot>
            <TableRow>
              <TableCell className="font-semibold">Total</TableCell>
              <TableCell></TableCell>
              <TableCell className="font-semibold">{totalAdmitted}</TableCell>
            </TableRow>
          </tfoot>
        </Table>
        <Button onClick={() => alert("Saved!")} className="mt-4">
          Save
        </Button>
      </div>

      {/* Number of full time teachers table */}
      <div className="rounded-lg shadow p-6 max-w-2xl w-full mt-8">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Number of full time-teachers during the year:</TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={data.fullTimeTeachers ?? 0}
                  onChange={e => setData({ ...data, fullTimeTeachers: Number(e.target.value) })}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button onClick={() => alert("Saved!")} className="mt-4">Save</Button>
      </div>
    </main>
  );
}
