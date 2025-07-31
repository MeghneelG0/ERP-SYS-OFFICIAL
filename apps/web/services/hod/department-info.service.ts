import { ApiClient } from "@/lib/api-client"; // Assuming a shared ApiClient
import {
  DepartmentInfoInstance,
  CreateDepartmentInfoInput,
} from "@workspace/types/types";
import { ApiError } from "@/types/error"; // Assuming a shared ApiError type

/**
 * Fetches the department information for the currently authenticated HOD.
 * A 404 is treated as a valid case where no profile exists yet.
 */
export const getDepartmentInfo = async () => {
  try {
    const response = await ApiClient.get<DepartmentInfoInstance>(
      "/hod/department-info",
    );
    return response;
  } catch (error: unknown) {
    const apiError = error as ApiError;
    // If the error is a 404, we return null data, not an error
    if (apiError.status === 404) {
      return { data: null, error: undefined };
    }
    throw error;
  }
};

/**
 * Creates a new department information record.
 */
export const createDepartmentInfo = async (data: CreateDepartmentInfoInput) => {
  try {
    const response = await ApiClient.post<
      DepartmentInfoInstance,
      CreateDepartmentInfoInput
    >("/hod/department-info", data);
    return response;
  } catch (error: unknown) {
    const apiError = error as ApiError;
    throw error;
  }
};

/**
 * Updates an existing department information record.
 */
export const updateDepartmentInfo = async (
  id: string,
  data: Partial<CreateDepartmentInfoInput>,
) => {
  try {
    const response = await ApiClient.patch<
      DepartmentInfoInstance,
      Partial<CreateDepartmentInfoInput>
    >(`/hod/department-info/${id}`, data);
    return response;
  } catch (error: unknown) {
    const apiError = error as ApiError;
    throw error;
  }
};

/**
 * Deletes a department information record.
 */
export const deleteDepartmentInfo = async (id: string) => {
  try {
    const response = await ApiClient.delete<null>(`/hod/department-info/${id}`);
    return response;
  } catch (error: unknown) {
    const apiError = error as ApiError;
    throw error;
  }
};
