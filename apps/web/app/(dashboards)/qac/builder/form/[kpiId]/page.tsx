"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import { ArrowLeft, Edit, Save, X } from "lucide-react";
import { useFormById } from "@/hooks/forms";
import FormPreview from "@/components/formbuilder/form-preview";
import FormBuilder from "@/components/formbuilder/form-builder";
import type { FormElementInstance, FormConfig } from "@/lib/types";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

// This interface defines the props our component will receive
interface KpiDetailPageProps {
  params: {
    kpiId: string; // This comes from the URL [kpiId]
  };
}

export default function KpiDetailPage({ params }: KpiDetailPageProps) {
  // State to track if we're in edit mode or view mode
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const [isEditMode, setIsEditMode] = useState(mode === "edit");

  // Get the router for navigation
  const router = useRouter();

  // Mock data for testing (remove when backend is ready)
  const mockData = {
    kpi: {
      kpi_id: params.kpiId,
      kpi_name: `KPI ${params.kpiId}`,
      kpi_description:
        "This is a mock KPI for testing purposes. The backend will provide real data later.",
      kpi_value: 95,
      elements: [
        {
          id: "element-1",
          type: "text" as const,
          attributes: {
            label: "Student Name",
            placeholder: "Enter student name",
            required: true,
          },
        },
        {
          id: "element-2",
          type: "number" as const,
          attributes: {
            label: "Score",
            placeholder: "Enter score",
            min: 0,
            max: 100,
            required: true,
          },
        },
        {
          id: "element-3",
          type: "textarea" as const,
          attributes: {
            label: "Comments",
            placeholder: "Enter additional comments",
            rows: 3,
            required: false,
          },
        },
      ] as FormElementInstance[],
    },
  };

  // Use mock data for now (replace with real API call when backend is ready)
  const { data, isLoading, error } = useFormById(params.kpiId);

  // For testing: use mock data instead of API response
  const testData = mockData;
  const testIsLoading = false;
  const testError = null;

  // Handle going back to KPI list
  const handleGoBack = () => {
    // Navigate back to the KPI builder page
    router.push("/qac/builder");
  };

  // Handle switching to edit mode
  const handleEditMode = () => {
    setIsEditMode(true);
  };

  // Handle canceling edit mode
  const handleCancelEdit = () => {
    setIsEditMode(false);
  };

  // Handle saving changes
  const handleSave = () => {
    // The FormBuilder component handles its own saving
    // We just need to exit edit mode
    setIsEditMode(false);
    // Show success feedback
    toast.success("KPI updated successfully", {
      description: "Your changes have been saved.",
    });
  };

  // Show loading state while data is being fetched
  if (testIsLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg text-muted-foreground">
              Loading KPI details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if data fetching failed
  if (testError) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold mb-2">Error Loading KPI</h2>
            <p className="text-muted-foreground mb-4">
              Failed to load KPI details
            </p>
            <Button onClick={handleGoBack} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // If no data is found
  if (!testData || !testData.kpi) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-gray-400 text-6xl mb-4">📄</div>
            <h2 className="text-xl font-semibold mb-2">KPI Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The KPI you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={handleGoBack} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Extract KPI data
  const kpi = testData.kpi;
  const kpiName = kpi.kpi_name || "Untitled KPI";
  const kpiDescription = kpi.kpi_description || "No description available";
  const elements = kpi.elements || [];
  const value = kpi.kpi_value;

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header Section */}
      <div className="mb-6">
        {/* Navigation and Action Buttons */}
        <div className="flex justify-between items-center mb-4">
          <Button onClick={handleGoBack} variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          {/* Edit/Save/Cancel Buttons */}
          <div className="flex gap-2">
            {!isEditMode ? (
              <Button onClick={handleEditMode} size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Edit KPI
              </Button>
            ) : (
              <>
                <Button onClick={handleSave} size="sm">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
                <Button onClick={handleCancelEdit} variant="outline" size="sm">
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>

        {/* KPI Title and Description */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{kpiName}</h1>
          <p className="text-muted-foreground">{kpiDescription}</p>
          {typeof value !== "undefined" && (
            <p className="text-sm text-muted-foreground">Value: {value}</p>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">
          {isEditMode ? "Edit KPI Template" : "KPI Template"}
        </h2>

        {/* Form Content */}
        {!isEditMode ? (
          // View Mode - Show Form Preview
          <div className="max-w-3xl mx-auto">
            <FormPreview
              formTitle={kpiName}
              elements={elements}
              description={kpiDescription}
              readOnly={true}
            />
          </div>
        ) : (
          // Edit Mode - Show Form Builder
          <div>
            <FormBuilder
              initialForm={{
                id: params.kpiId,
                title: kpiName,
                description: kpiDescription,
                value: value || 0,
                elements: elements,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
