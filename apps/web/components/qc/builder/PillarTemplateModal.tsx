import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@workspace/ui/components/dialog";
import { CardContent } from "@workspace/ui/components/card";
import React from "react";

interface PillarTemplateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pillarName: string;
  setPillarName: (name: string) => void;
  pillarWeight: string;
  setPillarWeight: (weight: string) => void;
  handleAddPillar: (e: React.FormEvent) => void;
}

export function PillarTemplateModal({
  open,
  onOpenChange,
  pillarName,
  setPillarName,
  pillarWeight,
  setPillarWeight,
  handleAddPillar,
}: PillarTemplateModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-lg">Create New Pillar Template</DialogTitle>
        </DialogHeader>
        <CardContent>
          <form onSubmit={handleAddPillar} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={pillarName}
                onChange={(e) => setPillarName(e.target.value)}
                className="w-full border rounded px-2 py-1 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Weight (A)</label>
              <input
                type="number"
                step="0.01"
                value={pillarWeight}
                onChange={(e) => setPillarWeight(e.target.value)}
                className="w-full border rounded px-2 py-1 text-sm"
                required
              />
            </div>
            <DialogFooter className="flex gap-2 justify-end mt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="min-w-[100px]"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="w-fit min-w-[100px]" size="sm">
                Add Pillar
              </Button>
            </DialogFooter>
          </form>
        </CardContent>
      </DialogContent>
    </Dialog>
  );
}
