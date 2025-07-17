import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@workspace/ui/components/card";
import { TrendingUp } from "lucide-react";

export function QualityTrends({ trends }: { trends: any }) {
  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-500" />
          Quality & Approval Trends
        </CardTitle>
        <CardDescription>
          Monthly trends in approval rates and quality scores
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Monthly Approval Rate</h4>
            <div className="space-y-3">
              {trends.monthlyApprovalRate.map((month: any, index: number) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{month.month} 2024</span>
                    <span className="text-sm font-bold text-green-600">{month.rate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${month.rate}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Average Quality Score</h4>
            <div className="space-y-3">
              {trends.qualityScores.map((month: any, index: number) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{month.month} 2024</span>
                    <span className="text-sm font-bold text-blue-600">{month.score}/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(month.score / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
