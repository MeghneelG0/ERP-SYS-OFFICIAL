import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@workspace/ui/components/card";

interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
  className?: string;
}

export function LoadingSpinner({
  message = "Loading...",
  size = "md",
  fullScreen = false,
  className = "",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const content = (
    <div
      className={`flex flex-col items-center justify-center space-y-4 ${className}`}
    >
      <Loader2
        className={`text-primary animate-spin ${sizeClasses[size]}`}
        strokeWidth={1.5}
      />
      <div className="space-y-2 text-center">
        <p className="text-muted-foreground text-sm">{message}</p>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="bg-background/80 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs">
        <Card className="w-full max-w-sm">
          <CardContent className="p-6">{content}</CardContent>
        </Card>
      </div>
    );
  }

  return content;
}
