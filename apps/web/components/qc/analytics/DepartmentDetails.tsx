import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@workspace/ui/components/card";
import { Progress } from "@workspace/ui/components/progress";
import { Badge } from "@workspace/ui/components/badge";

export function DepartmentDetails({ department }: { department: any }) {
  if (!department) return null;
  return (
    <Card className="bg-card text-card-foreground h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="relative w-6 h-6">
            <svg className="w-6 h-6 transform -rotate-90" viewBox="0 0 36 36">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" strokeWidth="2" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray={`${department.submissionRate}, 100`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold">{department.submissionRate}%</span>
            </div>
          </div>
          {department.name} Details
        </CardTitle>
        <CardDescription>
          Comprehensive department metrics and quality indicators
          <Badge variant="outline" className="ml-2">Score: {department.averageScore}/5</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Quality Metrics */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Quality Metrics</h4>
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Data Accuracy</span>
                  <span className="text-sm font-bold">{department.qualityMetrics.dataAccuracy}%</span>
                </div>
                <Progress value={department.qualityMetrics.dataAccuracy} />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Completeness</span>
                  <span className="text-sm font-bold">{department.qualityMetrics.completeness}%</span>
                </div>
                <Progress value={department.qualityMetrics.completeness} />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Timeliness</span>
                  <span className="text-sm font-bold">{department.qualityMetrics.timeliness}%</span>
                </div>
                <Progress value={department.qualityMetrics.timeliness} />
              </div>
            </div>
          </div>
          {/* Recent Activity */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Recent Submissions</h4>
            <div className="space-y-2">
              {department.recentActivity.map((activity: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                  <div>
                    <div className="text-sm font-medium">{activity.kpi}</div>
                    <div className="text-xs text-muted-foreground">{activity.date}</div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={activity.status === "approved" ? "default" : activity.status === "rejected" ? "destructive" : "secondary"}
                      className={activity.status === "approved" ? "bg-green-500" : ""}
                    >
                      {activity.status}
                    </Badge>
                    {activity.score && (
                      <div className="text-xs text-muted-foreground mt-1">Score: {activity.score}/5</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">{department.approved}</div>
              <div className="text-xs text-muted-foreground">Approved</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600">{department.pending}</div>
              <div className="text-xs text-muted-foreground">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-red-600">{department.rejected}</div>
              <div className="text-xs text-muted-foreground">Rejected</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
