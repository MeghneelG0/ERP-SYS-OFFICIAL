import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from "@workspace/ui/components/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";

export type PillarKpi = {
  kpi_no: number;
  metric: string;
  dataProvidedBy: string;
  target: string;
  actual: string | number;
  percentAchieved: string | number;
  value?: string | number;
  status?: string;
  kpiId?: number;
};

export interface PillarTableProps {
  pillar: string;
  kpis: PillarKpi[];
  onReviewKpi?: (kpiId: number) => void;
  showStatusColumn?: boolean;
}

export const PillarKpiTable: React.FC<PillarTableProps> = ({
  pillar,
  kpis,
  onReviewKpi,
  showStatusColumn = true,
}) => {
  const getStatusBadge = (status?: string) => {
    if (!status) return null;
    const normalized = status.toLowerCase();
    if (normalized === "approved") {
      return (
        <Badge
          className="bg-green-100 text-green-800 border-green-200 px-2 py-0.5 text-xs font-medium"
          variant="outline"
        >
          Approved
        </Badge>
      );
    }
    if (normalized === "pending review" || normalized === "pending") {
      return (
        <Badge
          className="bg-yellow-100 text-yellow-800 border-yellow-200 px-2 py-0.5 text-xs font-medium"
          variant="outline"
        >
          Pending Review
        </Badge>
      );
    }
    if (normalized === "needs revision" || normalized === "redo") {
      return (
        <Badge
          className="bg-red-100 text-red-800 border-red-200 px-2 py-0.5 text-xs font-medium"
          variant="outline"
        >
          Needs Revision
        </Badge>
      );
    }
    if (normalized === "to be submitted") {
      return (
        <Badge
          className="bg-gray-200 text-gray-700 border-gray-300 px-2 py-0.5 text-xs font-medium"
          variant="outline"
        >
          To Be Submitted
        </Badge>
      );
    }
    return (
      <Badge className="px-2 py-0.5 text-xs font-medium" variant="secondary">
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };
  return (
    <Card className="shadow-md px-2 border rounded-lg">
      <CardHeader className="bg-muted/50 rounded-t-lg">
        <CardTitle className="text-lg font-bold tracking-tight">
          {pillar}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="leading-tight h-8">
                <TableHead className="bg-muted/50 text-xs font-semibold uppercase px-2 py-1 whitespace-nowrap text-center">
                  KPI No
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-semibold uppercase px-2 py-1 whitespace-nowrap text-left">
                  Metric
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-semibold uppercase px-2 py-1 whitespace-nowrap text-center">
                  Data Provided By
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-semibold uppercase px-2 py-1 whitespace-nowrap text-center">
                  Target
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-semibold uppercase px-2 py-1 whitespace-nowrap text-center">
                  Actual
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-semibold uppercase px-2 py-1 whitespace-nowrap text-center">
                  % Target Achieved
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-semibold uppercase px-2 py-1 whitespace-nowrap text-center">
                  Value
                </TableHead>
                {showStatusColumn && (
                  <TableHead className="bg-muted/50 text-xs font-semibold uppercase px-2 py-1 whitespace-nowrap text-center">
                    Status
                  </TableHead>
                )}
                <TableHead className="bg-muted/50 text-xs font-semibold uppercase px-2 py-1 whitespace-nowrap text-center">
                  Review
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kpis.map((row, idx) => (
                <TableRow
                  key={row.kpi_no}
                  className={idx % 2 === 1 ? "bg-muted/20" : ""}
                >
                  <TableCell className="font-medium text-center px-2 py-1 whitespace-nowrap">
                    {row.kpi_no}
                  </TableCell>
                  <TableCell className="font-medium text-left px-2 py-1 whitespace-nowrap">
                    {row.metric}
                  </TableCell>
                  <TableCell className="text-center px-2 py-1 whitespace-nowrap">
                    {row.dataProvidedBy}
                  </TableCell>
                  <TableCell className="text-center px-2 py-1 whitespace-nowrap">
                    {row.target}
                  </TableCell>
                  <TableCell className="text-center px-2 py-1 whitespace-nowrap">
                    {row.actual}
                  </TableCell>
                  <TableCell className="text-center px-2 py-1 whitespace-nowrap">
                    {row.percentAchieved}
                  </TableCell>
                  <TableCell className="text-center px-2 py-1 whitespace-nowrap">
                    {row.value ?? "-"}
                  </TableCell>
                  {showStatusColumn && (
                    <TableCell className="text-center px-2 py-1 whitespace-nowrap">
                      {getStatusBadge(row.status)}
                    </TableCell>
                  )}
                  <TableCell className="text-center px-2 py-1 whitespace-nowrap">
                    {onReviewKpi && row.kpiId && (
                      <button
                        className="px-2 py-0.5 rounded bg-muted-foreground/10 hover:bg-muted-foreground/20 text-xs font-medium border border-muted-foreground/20"
                        onClick={() => onReviewKpi(row.kpiId!)}
                      >
                        Review
                      </button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
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
        </Table>
      </div>
    </CardContent>
  </Card>
);
