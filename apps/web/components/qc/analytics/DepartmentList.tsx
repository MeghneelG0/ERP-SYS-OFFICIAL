import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@workspace/ui/components/card";
import { Building } from "lucide-react";
import { Button } from "@workspace/ui/components/button";

export function DepartmentList({
  departments,
  selectedId,
  onSelect,
}: {
  departments: any[];
  selectedId: string;
  onSelect: (dept: any) => void;
}) {
  return (
    <Card className="bg-card text-card-foreground h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5 text-blue-500" />
          Department Performance
        </CardTitle>
        <CardDescription>
          Click on a department to view detailed metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {departments.map((dept: any) => (
            <Button
              key={dept.id}
              variant={selectedId === dept.id ? "default" : "outline"}
              className="w-full justify-between h-auto p-4"
              onClick={() => onSelect(dept)}
            >
              <div className="flex items-center gap-3">
                <div className="text-left">
                  <div className="font-medium">{dept.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {dept.approved}/{dept.totalSubmissions} approved
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">
                  {dept.submissionRate}%
                </span>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
