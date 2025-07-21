import { ApiClient } from "@/lib/api-client";
import { CreatePillarTemplateInput } from "@workspace/types/types";

export const getPillars = async () => {
  return ApiClient.get<CreatePillarTemplateInput[]>("/qc/pillar");
};

export const addPillar = async (data: CreatePillarTemplateInput) => {
  return ApiClient.post<CreatePillarTemplateInput, CreatePillarTemplateInput>(
    "/qc/pillar",
    data,
  );
};

export const updatePillar = async (
  id: string,
  data: Partial<CreatePillarTemplateInput>,
) => {
  return ApiClient.patch<
    CreatePillarTemplateInput,
    Partial<CreatePillarTemplateInput>
  >(`/qc/pillar/${id}`, data);
};

export const deletePillar = async (id: string) => {
  return ApiClient.delete<null>(`/qc/pillar/${id}`);
};
