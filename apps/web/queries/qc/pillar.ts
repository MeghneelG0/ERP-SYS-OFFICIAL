import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPillars,
  addPillar,
  updatePillar,
  deletePillar,
} from "@/services/qc/pillar.service";
import { CreatePillarTemplateInput } from "@workspace/types/types";

export function useGetPillars() {
  return useQuery<CreatePillarTemplateInput[]>({
    queryKey: ["pillars"],
    queryFn: async () => {
      const res = await getPillars();
      if (res.data) return res.data;
      throw new Error(res.error?.message || "Failed to fetch pillars");
    },
  });
}

export function useAddPillar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addPillar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pillars"] });
    },
  });
}

export function useUpdatePillar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreatePillarTemplateInput>;
    }) => updatePillar(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pillars"] });
    },
  });
}

export function useDeletePillar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePillar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pillars"] });
    },
  });
}
