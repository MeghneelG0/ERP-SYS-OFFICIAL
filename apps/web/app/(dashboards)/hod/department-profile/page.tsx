"use client";

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
  TableFooter,
} from "@workspace/ui/components/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";

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

  const handleYearChange = (
    idx: number,
    field: "intake" | "admitted",
    value: number,
  ) => {
    setYearData((prev) =>
      prev.map((row, i) => (i === idx ? { ...row, [field]: value } : row)),
    );
  };

  const totalAdmitted = yearData.reduce((sum, row) => sum + row.admitted, 0);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Save logic here (API integration later)
    console.log("Saving Data:", { data, yearData });
    alert("Saved!");
  };

  return (
    <main className="container mx-auto py-8 px-4">
      <form onSubmit={handleSave}>
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{FacultyName}</CardTitle>
            <CardDescription className="text-lg">
              {schoolName} - Department Profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Section 1: General Information */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold mb-4 border-b pb-3">
                General Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <label className="text-sm font-medium">
                    UG Programs Offered
                  </label>
                  <Input
                    name="ugPrograms"
                    type="number"
                    value={data.ugPrograms}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">
                    PG Programs Offered
                  </label>
                  <Input
                    name="pgPrograms"
                    type="number"
                    value={data.pgPrograms}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">
                    Total Courses (All Semesters)
                  </label>
                  <Input
                    name="totalCourses"
                    type="number"
                    value={data.totalCourses}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">
                    Total Credits (Jan-Jun 2025)
                  </label>
                  <Input
                    name="evenSemCreditsJanJun"
                    type="number"
                    value={data.evenSemCreditsJanJun}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">
                    Total Credits (Jul-Dec 2025)
                  </label>
                  <Input
                    name="evenSemCreditsJulDec"
                    type="number"
                    value={data.evenSemCreditsJulDec}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">
                    Students Eligible for Internship
                  </label>
                  <Input
                    name="studentsInternship"
                    type="number"
                    value={data.studentsInternship}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">
                    Students Eligible for Project
                  </label>
                  <Input
                    name="studentsProject"
                    type="number"
                    value={data.studentsProject}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Student Strength */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold mb-4 border-b pb-3">
                Year-wise Student Strength
              </h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Year</TableHead>
                    <TableHead>Sanctioned Intake</TableHead>
                    <TableHead>Admitted Students</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {yearData.map((row, idx) => (
                    <TableRow key={row.year}>
                      <TableCell className="font-medium">{`Year ${row.year}`}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={row.intake}
                          onChange={(e) =>
                            handleYearChange(
                              idx,
                              "intake",
                              Number(e.target.value),
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={row.admitted}
                          onChange={(e) =>
                            handleYearChange(
                              idx,
                              "admitted",
                              Number(e.target.value),
                            )
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2} className="text-right font-bold">
                      Total Admitted
                    </TableCell>
                    <TableCell className="font-bold">{totalAdmitted}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>

            {/* Section 3: Faculty Information */}
            <div>
              <h3 className="text-xl font-semibold mb-4 border-b pb-3">
                Faculty Information
              </h3>
              <div>
                <label className="text-sm font-medium">
                  Full-Time Teachers During the Year
                </label>
                <Input
                  name="fullTimeTeachers"
                  type="number"
                  value={data.fullTimeTeachers}
                  onChange={handleChange}
                  className="mt-1 max-w-xs"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t mt-8 pt-6 flex justify-end">
            <Button type="submit" size="lg">
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </form>
    </main>
  );
}
