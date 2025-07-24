"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Alert, AlertDescription } from "@workspace/ui/components/alert";
import { Trash2, AlertTriangle } from "lucide-react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  itemType: "pillar" | "KPI";
  title?: string;
  description?: string;
  isLoading?: boolean;
}

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  itemType,
  title,
  description,
  isLoading = false,
}: DeleteConfirmationModalProps) {
  const [confirmationText, setConfirmationText] = useState("");
  const [showError, setShowError] = useState(false);

  const isConfirmationValid = confirmationText === itemName;
  const defaultTitle = `Delete ${itemType}`;
  const defaultDescription = `By deleting this ${itemType.toLowerCase()} you will also delete all associated data, reviews, and assignments. This action cannot be undone.`;

  const handleConfirm = () => {
    if (!isConfirmationValid) {
      setShowError(true);
      return;
    }
    onConfirm();
  };

  const handleClose = () => {
    setConfirmationText("");
    setShowError(false);
    onClose();
  };

  const handleInputChange = (value: string) => {
    setConfirmationText(value);
    if (showError && value === itemName) {
      setShowError(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <Trash2 className="h-5 w-5" />
            {title || defaultTitle}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Warning Alert */}
          <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 dark:text-red-200">
              {description || defaultDescription}
            </AlertDescription>
          </Alert>

          {/* Item Name Display */}
          <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              {itemType} to be deleted:
            </div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">
              {itemName}
            </div>
          </div>

          {/* Confirmation Input */}
          <div className="space-y-2">
            <Label htmlFor="confirmation-input" className="text-sm font-medium">
              Type{" "}
              <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">
                {itemName}
              </span>{" "}
              to confirm:
            </Label>
            <Input
              id="confirmation-input"
              type="text"
              value={confirmationText}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={`Type "${itemName}" here`}
              className={`${
                showError && !isConfirmationValid
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : ""
              }`}
              disabled={isLoading}
            />
            {showError && !isConfirmationValid && (
              <p className="text-sm text-red-600">
                Please type the exact {itemType.toLowerCase()} name to confirm
                deletion.
              </p>
            )}
          </div>

          {/* Progress indicator */}
          {confirmationText && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {confirmationText === itemName ? (
                <span className="text-green-600 dark:text-green-400">
                  ✓ Confirmation text matches
                </span>
              ) : (
                <span>
                  {confirmationText.length}/{itemName.length} characters
                </span>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={!isConfirmationValid || isLoading}
            className="bg-red-600 hover:bg-red-700"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete {itemType}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
