import { Card, CardHeader, CardTitle, CardContent } from "@workspace/ui/components/card";
import { Progress } from "@workspace/ui/components/progress";
import { FileText, Clock, CheckCircle, RefreshCw } from "lucide-react";

export function SubmissionStatsCard({ stats }: { stats: any }) {
  return (
    <>
      <Card className="bg-card text-card-foreground">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
          <FileText className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalSubmissions}</div>
          <p className="text-xs text-muted-foreground">+12 from last month</p>
          <Progress className="mt-2" value={78} />
        </CardContent>
      </Card>
      <Card className="bg-card text-card-foreground">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
          <Clock className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.pendingReview}</div>
          <p className="text-xs text-muted-foreground">-5 from last week</p>
          <Progress className="mt-2" value={35} />
        </CardContent>
      </Card>
      <Card className="bg-card text-card-foreground">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">89%</div>
          <p className="text-xs text-muted-foreground">+3% from last month</p>
          <Progress className="mt-2" value={89} />
        </CardContent>
      </Card>
      <Card className="bg-card text-card-foreground">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Avg Review Time</CardTitle>
          <RefreshCw className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.averageReviewTime}</div>
          <p className="text-xs text-muted-foreground">-0.5 days improvement</p>
          <Progress className="mt-2" value={65} />
        </CardContent>
      </Card>
    </>
  );
}

