import { ApiClient } from "@/lib/api-client";
import {
  CreatePillarTemplateInput,
  PillarInstance,
} from "@workspace/types/types";
import { ApiError } from "@/types/error";

export const getPillars = async () => {
  try {
    const response = await ApiClient.get<PillarInstance[]>("/qc/pillar");
    return response;
  } catch (error: unknown) {
    const apiError = error as ApiError;
    throw error;
  }
};

export const addPillar = async (data: CreatePillarTemplateInput) => {
  try {
    const response = await ApiClient.post<
      PillarInstance,
      CreatePillarTemplateInput
    >("/qc/pillar", data);
    return response;
  } catch (error: unknown) {
    const apiError = error as ApiError;
    throw error;
  }
};

export const updatePillar = async (
  id: string,
  data: Partial<CreatePillarTemplateInput>,
) => {
  try {
    const response = await ApiClient.patch<
      PillarInstance,
      Partial<CreatePillarTemplateInput>
    >(`/qc/pillar/${id}`, data);
    return response;
  } catch (error: unknown) {
    const apiError = error as ApiError;
    throw error;
  }
};

export const deletePillar = async (id: string) => {
  try {
    const response = await ApiClient.delete<PillarInstance>(`/qc/pillar/${id}`);
    return response;
  } catch (error: unknown) {
    const apiError = error as ApiError;
    throw error;
  }
};
