import { Badge } from "@workspace/ui/components/badge";
import { AlertCircle, CheckCircle } from "lucide-react";
import { PillarInstance } from "@workspace/types/types";

interface WeightValidationProps {
  currentWeight: number;
  newWeight?: number;
  maxWeight?: number;
  className?: string;
  showDetails?: boolean;
  showProgressBar?: boolean;
}

export function WeightValidation({
  currentWeight,
  newWeight = 0,
  maxWeight = 1.0,
  className = "",
  showDetails = true,
  showProgressBar = true,
}: WeightValidationProps) {
  const totalWeight = currentWeight + newWeight;
  const isValid = totalWeight <= maxWeight;
  const availableWeight = maxWeight - currentWeight;
  const percentageTotal = (totalWeight / maxWeight) * 100;

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Weight Status Badge */}
      <div className="flex items-center gap-2">
        {isValid ? (
          <Badge
            variant="default"
            className="bg-green-100 text-green-800 hover:bg-green-100"
          >
            <CheckCircle className="w-3 h-3 mr-1" />
            Valid Weight
          </Badge>
        ) : (
          <Badge
            variant="destructive"
            className="bg-red-100 text-red-800 hover:bg-red-100"
          >
            <AlertCircle className="w-3 h-3 mr-1" />
            Weight Exceeds Limit
          </Badge>
        )}
      </div>

      {/* Weight Details */}
      {showDetails && (
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Current Total:</span>
            <span className="font-medium">
              {(currentWeight * 100).toFixed(0)}%
            </span>
          </div>

          {newWeight > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">New Weight:</span>
              <span className="font-medium">
                {(newWeight * 100).toFixed(0)}%
              </span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {newWeight > 0 ? "Total Would Be:" : "Available:"}
            </span>
            <span className={`font-medium ${!isValid ? "text-red-600" : ""}`}>
              {(newWeight > 0 ? totalWeight : availableWeight) * 100}%
            </span>
          </div>
        </div>
      )}

      {/* Progress Bar - Only show if showProgressBar is true */}
      {showProgressBar && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              isValid ? "bg-green-500" : "bg-red-500"
            }`}
            style={{
              width: `${Math.min(percentageTotal, 100)}%`,
            }}
          />
        </div>
      )}

      {/* Error Message */}
      {!isValid && (
        <p className="text-xs text-red-600">
          Total weight cannot exceed {(maxWeight * 100).toFixed(0)}%. Current:{" "}
          {(currentWeight * 100).toFixed(0)}%, New:{" "}
          {(newWeight * 100).toFixed(0)}%, Total:{" "}
          {(totalWeight * 100).toFixed(0)}%
        </p>
      )}
    </div>
  );
}

// Hook for weight validation logic
export function useWeightValidation(
  existingPillars: PillarInstance[] = [],
  editingPillarId?: string,
) {
  const getCurrentTotalWeight = (): number => {
    return existingPillars.reduce((sum, pillar) => {
      // If editing, exclude the current pillar's weight from the calculation
      if (editingPillarId && pillar.id === editingPillarId) {
        return sum;
      }
      return sum + (pillar.pillar_value || 0);
    }, 0);
  };

  const validateTotalWeight = (newWeight: number): boolean => {
    const currentTotal = getCurrentTotalWeight();
    const newTotal = currentTotal + newWeight;
    return newTotal <= 1.0;
  };

  const getAvailableWeight = (): number => {
    const currentTotal = getCurrentTotalWeight();
    return Math.max(0, 1.0 - currentTotal);
  };

  return {
    getCurrentTotalWeight,
    validateTotalWeight,
    getAvailableWeight,
  };
}
