import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@workspace/ui/components/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Users } from "lucide-react";

export function ReviewWorkloadTable({ reviewMetrics }: { reviewMetrics: any }) {
  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-purple-500" />
          Review Team Workload
        </CardTitle>
        <CardDescription>
          Current workload distribution among reviewers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reviewer</TableHead>
              <TableHead>Pending Reviews</TableHead>
              <TableHead>Completed This Month</TableHead>
              <TableHead>Workload Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviewMetrics.reviewerWorkload.map(
              (reviewer: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {reviewer.reviewer}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{reviewer.pending}</Badge>
                  </TableCell>
                  <TableCell>{reviewer.completed}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        reviewer.pending > 8
                          ? "destructive"
                          : reviewer.pending > 5
                            ? "secondary"
                            : "default"
                      }
                      className={reviewer.pending <= 5 ? "bg-green-500" : ""}
                    >
                      {reviewer.pending > 8
                        ? "High"
                        : reviewer.pending > 5
                          ? "Medium"
                          : "Normal"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Queue
                    </Button>
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
