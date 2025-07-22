import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import Link from "next/link";

interface ErrorDisplayProps {
  title?: string;
  message?: string;
  error?: Error | string | null;
  showRetry?: boolean;
  showHome?: boolean;
  onRetry?: () => void;
  className?: string;
  fullScreen?: boolean;
}

export function ErrorDisplay({
  title = "Error Occurred",
  message = "Something unexpected happened",
  error,
  showRetry = true,
  showHome = true,
  onRetry,
  className = "",
  fullScreen = false,
}: ErrorDisplayProps) {
  const errorMessage =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : message;

  const content = (
    <Card className={`w-full max-w-md ${className}`}>
      <CardHeader className="text-center">
        <CardTitle className="mb-4 flex items-center justify-center">
          <AlertTriangle className="text-destructive mr-2 h-12 w-12" />
          {title}
        </CardTitle>
        <CardDescription>{message}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-muted-foreground text-sm break-words">
            {errorMessage}
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          {showRetry && (
            <Button variant="outline" className="w-full" onClick={onRetry}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          )}
          {showHome && (
            <Button variant="secondary" className="w-full" asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (fullScreen) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center p-4">
        {content}
      </div>
    );
  }

  return content;
}
