"use client";

import React from "react";
import { Input } from "@workspace/ui/components/input";

interface GeneralInfoSectionProps {
  data: {
    ugPrograms: number;
    pgPrograms: number;
    totalCourses: number;
    creditsEven: number;
    creditsOdd: number;
    studentsInternship: number;
    studentsProject: number;
  };
  isLoading: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function GeneralInfoSection({
  data,
  isLoading,
  handleChange,
}: GeneralInfoSectionProps) {
  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold mb-4 border-b pb-3">
        General Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <div>
          <label className="text-sm font-medium">UG Programs Offered</label>
          <Input
            name="ugPrograms"
            type="number"
            value={data.ugPrograms}
            onChange={handleChange}
            className="mt-1"
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="text-sm font-medium">PG Programs Offered</label>
          <Input
            name="pgPrograms"
            type="number"
            value={data.pgPrograms}
            onChange={handleChange}
            className="mt-1"
            disabled={isLoading}
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
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="text-sm font-medium">
            Total Credits (Even Sem)
          </label>
          <Input
            name="creditsEven"
            type="number"
            value={data.creditsEven}
            onChange={handleChange}
            className="mt-1"
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Total Credits (Odd Sem)</label>
          <Input
            name="creditsOdd"
            type="number"
            value={data.creditsOdd}
            onChange={handleChange}
            className="mt-1"
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
