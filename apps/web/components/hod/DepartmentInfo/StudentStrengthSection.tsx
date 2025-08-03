"use client";

import React from "react";
import { Input } from "@workspace/ui/components/input";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { TotalCalculationType } from "@workspace/types/enums/enums";

interface YearData {
  year: number;
  intake: number;
  admitted: number;
}

interface StudentStrengthSectionProps {
  yearData: YearData[];
  totalType: TotalCalculationType;
  isLoading: boolean;
  handleYearChange: (
    idx: number,
    field: "intake" | "admitted",
    value: number,
  ) => void;
  setTotalType: (value: TotalCalculationType) => void;
}

export function StudentStrengthSection({
  yearData,
  totalType,
  isLoading,
  handleYearChange,
  setTotalType,
}: StudentStrengthSectionProps) {
  const totalValue = yearData.reduce(
    (sum, row) => sum + (totalType === "ADMITTED" ? row.admitted : row.intake),
    0,
  );

  return (
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
                    handleYearChange(idx, "intake", Number(e.target.value))
                  }
                  disabled={isLoading}
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={row.admitted}
                  onChange={(e) =>
                    handleYearChange(idx, "admitted", Number(e.target.value))
                  }
                  disabled={isLoading}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>
              <div className="flex items-center gap-x-4">
                <span className="font-medium">Usage for calculation:</span>
                <Select
                  value={totalType}
                  onValueChange={(value) =>
                    setTotalType(value as TotalCalculationType)
                  }
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-[190px]">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMITTED">Admitted Students</SelectItem>
                    <SelectItem value="SANCTIONED">
                      Sanctioned Intake
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TableCell>
            <TableCell className="text-right font-bold">
              <div className="flex items-center justify-end gap-x-2">
                <span>
                  {totalType === "ADMITTED"
                    ? "Total Admitted:"
                    : "Total Sanctioned:"}
                </span>
                <span>{totalValue}</span>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
