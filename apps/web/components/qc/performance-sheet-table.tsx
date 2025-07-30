import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "@workspace/ui/components/table";
import { Input } from "@workspace/ui/components/input";

export type PillarKpi = {
  kpi_no: number;
  metric: string;
  dataProvidedBy: string;
  target: string;
  actual: string | number;
  percentAchieved: string | number;
  value?: string | number;
  status?: string;
  kpiId?: string;
};

export interface PillarTableProps {
  pillar: string;
  kpis: PillarKpi[];
  onReviewKpi?: (kpiId: string) => void;
  showStatusColumn?: boolean;
}

export const dummyKpiData: PillarKpi[] = [
  {
    kpi_no: 1,
    metric: "Student Awards",
    dataProvidedBy: "HoD",
    target: "25%",
    actual: "20%",
    percentAchieved: "80%",
    value: "80",
    status: "pending review",
    kpiId: "1",
  },
  {
    kpi_no: 2,
    metric: "Research Papers",
    dataProvidedBy: "HoD",
    target: "10",
    actual: "8",
    percentAchieved: "80%",
    value: "80",
    status: "approved",
    kpiId: "2",
  },
  {
    kpi_no: 3,
    metric: "Industry Projects",
    dataProvidedBy: "HoD",
    target: "5",
    actual: "2",
    percentAchieved: "40%",
    value: "40",
    status: "needs revision",
    kpiId: "3",
  },
];

export const PillarKpiTable: React.FC<
  Omit<Partial<PillarTableProps>, "pillar">
> = ({ kpis = dummyKpiData, onReviewKpi, showStatusColumn = true }) => {
  const [data, setData] = React.useState(kpis);

  const handleValueChange = (rowIndex: number, newValue: string) => {
    setData((prev) =>
      prev.map((row, idx) =>
        idx === rowIndex ? { ...row, value: newValue } : row,
      ),
    );
  };

  // Helper to sum the value field in the current data (dynamic)
  const totalValue = data.reduce((sum, row) => sum + Number(row.value ?? 0), 0);

  return (
    <Card className="shadow-md px-2 border rounded-lg">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="bg-muted/50 text-xs font-semibold uppercase">
                KPI No
              </TableHead>
              <TableHead className="bg-muted/50 text-xs font-semibold uppercase">
                Metric
              </TableHead>
              <TableHead className="bg-muted/50 text-xs font-semibold uppercase">
                Data Provided By
              </TableHead>
              <TableHead className="bg-muted/50 text-xs font-semibold uppercase">
                Target
              </TableHead>
              <TableHead className="bg-muted/50 text-xs font-semibold uppercase">
                Actual
              </TableHead>
              <TableHead className="bg-muted/50 text-xs font-semibold uppercase">
                % Target Achieved
              </TableHead>
              <TableHead className="bg-muted/50 text-xs font-semibold uppercase">
                Value
              </TableHead>
              {showStatusColumn && (
                <TableHead className="bg-muted/50 text-xs font-semibold uppercase">
                  Status
                </TableHead>
              )}
              <TableHead className="bg-muted/50 text-xs font-semibold uppercase">
                Review
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow
                key={row.kpiId ?? row.kpi_no}
                className={rowIndex % 2 === 1 ? "bg-muted/20" : ""}
              >
                <TableCell className="text-center">{row.kpi_no}</TableCell>
                <TableCell>{row.metric}</TableCell>
                <TableCell className="text-center">
                  {row.dataProvidedBy}
                </TableCell>
                <TableCell className="text-center">{row.target}</TableCell>
                <TableCell className="text-center">{row.actual}</TableCell>
                <TableCell className="text-center">
                  {row.percentAchieved}
                </TableCell>
                <TableCell className="text-center">
                  <Input
                    className="w-24 text-center"
                    value={row.value ?? ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleValueChange(rowIndex, e.target.value)
                    }
                  />
                </TableCell>
                {showStatusColumn && (
                  <TableCell className="text-center">
                    {row.status
                      ? (() => {
                          const normalized = row.status?.toLowerCase();
                          if (normalized === "approved")
                            return (
                              <Badge
                                className="bg-green-100 text-green-800 border-green-200 px-2 py-0.5 text-xs font-medium"
                                variant="outline"
                              >
                                Approved
                              </Badge>
                            );
                          if (
                            normalized === "pending review" ||
                            normalized === "pending"
                          )
                            return (
                              <Badge
                                className="bg-yellow-100 text-yellow-800 border-yellow-200 px-2 py-0.5 text-xs font-medium"
                                variant="outline"
                              >
                                Pending Review
                              </Badge>
                            );
                          if (
                            normalized === "needs revision" ||
                            normalized === "redo"
                          )
                            return (
                              <Badge
                                className="bg-red-100 text-red-800 border-red-200 px-2 py-0.5 text-xs font-medium"
                                variant="outline"
                              >
                                Needs Revision
                              </Badge>
                            );
                          if (normalized === "to be submitted")
                            return (
                              <Badge
                                className="bg-gray-200 text-gray-700 border-gray-300 px-2 py-0.5 text-xs font-medium"
                                variant="outline"
                              >
                                To Be Submitted
                              </Badge>
                            );
                          return (
                            <Badge
                              className="px-2 py-0.5 text-xs font-medium"
                              variant="secondary"
                            >
                              {row.status.charAt(0).toUpperCase() +
                                row.status.slice(1)}
                            </Badge>
                          );
                        })()
                      : null}
                  </TableCell>
                )}
                <TableCell className="text-center">
                  {onReviewKpi && row.kpiId ? (
                    <button
                      className="px-2 py-0.5 rounded bg-muted-foreground/10 hover:bg-muted-foreground/20 text-xs font-medium border border-muted-foreground/20"
                      onClick={() => onReviewKpi(row.kpiId!)}
                    >
                      Review
                    </button>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              {/* Empty cells before Value column */}
              <TableCell colSpan={6} className="font-bold text-right">
                Total Value
              </TableCell>
              <TableCell className="font-bold text-center">
                {totalValue}
              </TableCell>
              {showStatusColumn && <TableCell />}
              <TableCell />
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
};

// Add back the original performance sheet table and dummy data exports
export type PerformanceParameter = {
  slNo: number;
  parameter: string;
  weight: number;
  targetAchieved: number | string;
  performance: number | string;
};

export const dummyPerformanceData: PerformanceParameter[] = [
  {
    slNo: 1,
    parameter: "Academic Excellence",
    weight: 0.3,
    targetAchieved: 0,
    performance: 0,
  },
  {
    slNo: 2,
    parameter: "Research Progression",
    weight: 0.2,
    targetAchieved: 0,
    performance: 0,
  },
  {
    slNo: 3,
    parameter: "Industry and Academic Collaboration",
    weight: 0.2,
    targetAchieved: 0,
    performance: 0,
  },
  {
    slNo: 4,
    parameter: "Faculty Excellence",
    weight: 0.05,
    targetAchieved: 0,
    performance: 0,
  },
  {
    slNo: 5,
    parameter: "Student Quality and Strength",
    weight: 0.15,
    targetAchieved: 0,
    performance: 0,
  },
  {
    slNo: 6,
    parameter: "Branding and Visibility",
    weight: 0.05,
    targetAchieved: "0",
    performance: "0",
  },
  {
    slNo: 7,
    parameter: "Governance",
    weight: 0.05,
    targetAchieved: 0,
    performance: 0,
  },
];

export const PerformanceSheetTable: React.FC<{
  data: PerformanceParameter[];
}> = ({ data }) => (
  <Card className="shadow-md px-2 border rounded-lg">
    <CardHeader className="bg-muted/50 rounded-t-lg">
      <CardTitle className="text-lg font-bold tracking-tight">
        Performance Sheet
      </CardTitle>
      <CardDescription className="text-sm text-muted-foreground">
        Departmental KPI performance summary for the current goal period
      </CardDescription>
    </CardHeader>
    <CardContent className="p-0">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="bg-muted/50 text-xs font-semibold uppercase">
                Sl. No.
              </TableHead>
              <TableHead className="bg-muted/50 text-xs font-semibold uppercase">
                Parameter (79 KPIs)
              </TableHead>
              <TableHead className="bg-muted/50 text-xs font-semibold uppercase">
                Weight (A)
              </TableHead>
              <TableHead className="bg-muted/50 text-xs font-semibold uppercase">
                % of Target Achieved (B)
              </TableHead>
              <TableHead className="bg-muted/50 text-xs font-semibold uppercase">
                Performance (A x B) = C
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow
                key={row.slNo}
                className={idx % 2 === 1 ? "bg-muted/20" : ""}
              >
                <TableCell className="font-medium text-center">
                  {row.slNo}
                </TableCell>
                <TableCell className="font-medium">{row.parameter}</TableCell>
                <TableCell className="text-center">{row.weight}</TableCell>
                <TableCell className="text-center">
                  {row.targetAchieved}
                </TableCell>
                <TableCell className="text-center">{row.performance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="font-bold text-left" colSpan={2}>
                Overall Performance = Average of all parameter’s performance in
                %
              </TableCell>
              <TableCell className="font-bold text-center">
                {/* Total of weight */}
                {data.reduce((sum, row) => sum + Number(row.weight), 0)}
              </TableCell>
              <TableCell className="font-bold text-center">
                {/* Total of % target achieved */}
                {data.reduce((sum, row) => sum + Number(row.targetAchieved), 0)}
              </TableCell>
              <TableCell className="font-bold text-center">
                {/* Total of performance */}
                {data.reduce((sum, row) => sum + Number(row.performance), 0)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </CardContent>
  </Card>
);
