import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@workspace/ui/components/dialog";
import { CardContent } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Textarea } from "@workspace/ui/components/textarea";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddPillar, useUpdatePillar } from "@/queries/qc/pillar";
import {
  CreatePillarTemplateInput,
  PillarInstance,
} from "@workspace/types/types";
import { PillarSchema } from "@workspace/types/schema/pillar.schema";
import { toast } from "sonner";
import {
  WeightValidation,
  useWeightValidation,
} from "@/components/common/WeightValidation";

interface PillarTemplateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingPillar?: PillarInstance | null;
  existingPillars?: PillarInstance[];
}

// Form field component for cleaner code
interface FormFieldProps {
  label: string;
  name: keyof CreatePillarTemplateInput;
  type?: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  rows?: number;
  form: ReturnType<typeof useForm<CreatePillarTemplateInput>>;
}

function FormField({
  label,
  name,
  type = "text",
  placeholder,
  helperText,
  required = false,
  min,
  max,
  step,
  rows,
  form,
}: FormFieldProps) {
  const error = form.formState.errors[name];
  const isTextarea = type === "textarea";

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="block text-sm font-medium">
        {label} {required && "*"}
      </Label>

      {isTextarea ? (
        <Textarea
          id={name}
          {...form.register(name)}
          className="w-full"
          placeholder={placeholder}
          rows={rows}
        />
      ) : (
        <Input
          id={name}
          type={type}
          {...form.register(
            name,
            type === "number" ? { valueAsNumber: true } : {},
          )}
          className="w-full"
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
        />
      )}

      {helperText && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}

      {error && <p className="text-red-500 text-xs">{error.message}</p>}
    </div>
  );
}

export function PillarTemplateModal({
  open,
  onOpenChange,
  editingPillar,
  existingPillars = [],
}: PillarTemplateModalProps) {
  const addPillarMutation = useAddPillar();
  const updatePillarMutation = useUpdatePillar();

  const form = useForm<CreatePillarTemplateInput>({
    resolver: zodResolver(PillarSchema),
    defaultValues: {
      pillar_name: "",
      pillar_value: undefined,
      description: "",
    },
  });

  // Reset form when editingPillar changes
  useEffect(() => {
    if (editingPillar) {
      form.reset({
        pillar_name: editingPillar.name,
        pillar_value: editingPillar.pillar_value,
        description: editingPillar.description || "",
      });
    } else {
      form.reset({
        pillar_name: "",
        pillar_value: undefined,
        description: "",
      });
    }
  }, [editingPillar, form]);

  const isSubmitting =
    addPillarMutation.isPending || updatePillarMutation.isPending;
  const isEditing = !!editingPillar;
  const watchedWeight = form.watch("pillar_value");

  // Use the common weight validation hook
  const { getCurrentTotalWeight, validateTotalWeight } = useWeightValidation(
    existingPillars,
    editingPillar?.id,
  );

  const onSubmit = async (data: CreatePillarTemplateInput) => {
    // Validate total weight
    if (
      data.pillar_value !== undefined &&
      !validateTotalWeight(data.pillar_value)
    ) {
      const currentTotal = getCurrentTotalWeight();
      const newTotal = currentTotal + data.pillar_value;
      toast.error(
        `Total pillar weight cannot exceed 100%. Current: ${(currentTotal * 100).toFixed(0)}%, New total would be: ${(newTotal * 100).toFixed(0)}%`,
      );
      return;
    }

    try {
      if (isEditing) {
        await updatePillarMutation.mutateAsync({
          id: String(editingPillar!.id),
          data: {
            pillar_name: data.pillar_name,
            pillar_value: data.pillar_value,
            description: data.description,
          },
        });
      } else {
        await addPillarMutation.mutateAsync(data);
      }

      onOpenChange(false);
      form.reset();
    } catch (error) {
      // Error handling is done in the mutation hooks
      console.error("Form submission error:", error);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-lg">
            {isEditing ? "Edit Pillar Template" : "Create New Pillar Template"}
          </DialogTitle>
        </DialogHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              label="Name"
              name="pillar_name"
              placeholder="Enter pillar name"
              required
              form={form}
            />

            <FormField
              label="Weight"
              name="pillar_value"
              type="number"
              placeholder="Enter weight (0.0 - 1.0)"
              helperText="The weight determines the importance of this pillar. Total weight of all pillars should equal 1.0."
              min={0}
              max={1}
              step={0.01}
              form={form}
            />

            {/* Weight Validation Component */}
            {watchedWeight !== undefined &&
              watchedWeight > 0 &&
              !validateTotalWeight(watchedWeight) && (
                <WeightValidation
                  currentWeight={getCurrentTotalWeight()}
                  newWeight={watchedWeight}
                  className="mt-2"
                />
              )}

            <FormField
              label="Description"
              name="description"
              type="textarea"
              placeholder="Enter pillar description (optional)"
              rows={3}
              form={form}
            />

            <DialogFooter className="flex gap-2 justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>

              <Button type="submit" size="sm" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    {isEditing ? "Updating..." : "Creating..."}
                  </>
                ) : isEditing ? (
                  "Update Pillar"
                ) : (
                  "Add Pillar"
                )}
              </Button>
            </DialogFooter>
          </form>
        </CardContent>
      </DialogContent>
    </Dialog>
  );
}
