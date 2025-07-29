import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPillars,
  addPillar,
  updatePillar,
  deletePillar,
} from "@/services/qc/pillar.service";
import {
  PillarInstance,
  CreatePillarTemplateInput,
} from "@workspace/types/types";
import { toast } from "sonner";

export function useGetPillars() {
  return useQuery<PillarInstance[]>({
    queryKey: ["pillars"],
    queryFn: async () => {
      const res = await getPillars();
      if (res.data) {
        // Map backend fields to PillarInstance shape
        return res.data.map((pillar: any) => ({
          ...pillar,
          name: pillar.name || pillar.pillar_name || `Pillar #${pillar.id}`,
          pillar_value: pillar.pillar_value ?? pillar.weight ?? 0,
          description: pillar.description ?? "",
          counts: pillar.counts ?? { assignedkpi: 0 },
        }));
      }
      return [];
    },
  });
}

export function useAddPillar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreatePillarTemplateInput) => {
      const res = await addPillar(data);
      if (res.data) return res.data;
      throw new Error(res.error?.message || "Failed to add pillar");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pillars"] });
      toast.success("Pillar added successfully");
    },
    onError: () => {
      toast.error("Failed to add pillar");
    },
  });
}

export function useUpdatePillar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string | number;
      data: Partial<CreatePillarTemplateInput>;
    }): Promise<PillarInstance> => {
      const res = await updatePillar(String(id), data);
      if (res.data) return res.data;
      throw new Error(res.error?.message || "Failed to update pillar");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pillars"] });
      toast.success("Pillar updated successfully");
    },
    onError: () => {
      toast.error("Failed to update pillar");
    },
  });
}

export function useDeletePillar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string | number): Promise<PillarInstance | null> => {
      const res: {
        data?: PillarInstance | null;
        error?: {
          message: string;
          status: number;
          details?: Record<string, unknown>;
        };
      } = await deletePillar(String(id));
      if (res.data !== undefined) return res.data;
      throw new Error(res.error?.message || "Failed to delete pillar");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pillars"] });
      toast.success("Pillar deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete pillar");
    },
  });
}
