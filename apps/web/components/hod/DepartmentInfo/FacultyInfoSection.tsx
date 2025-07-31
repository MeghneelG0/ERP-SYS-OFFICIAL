"use client";

import React from "react";
import { Input } from "@workspace/ui/components/input";

interface FacultyInfoSectionProps {
  data: {
    fullTimeTeachers: number;
  };
  isLoading: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FacultyInfoSection({
  data,
  isLoading,
  handleChange,
}: FacultyInfoSectionProps) {
  return (
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
          disabled={isLoading}
        />
      </div>
    </div>
  );
}
