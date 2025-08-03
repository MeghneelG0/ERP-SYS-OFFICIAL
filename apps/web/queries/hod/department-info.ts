import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getDepartmentInfo,
  createDepartmentInfo,
  updateDepartmentInfo,
  deleteDepartmentInfo,
} from "@/services/hod/department-info.service";
import {
  DepartmentInfoInstance,
  CreateDepartmentInfoInput,
} from "@workspace/types/types";
import { toast } from "sonner";

const DEPARTMENT_INFO_QUERY_KEY = "departmentInfo";

/**
 * Hook to fetch department information for the HOD.
 */
export function useGetDepartmentInfo() {
  return useQuery<DepartmentInfoInstance | null>({
    queryKey: [DEPARTMENT_INFO_QUERY_KEY],
    queryFn: async () => {
      const res = await getDepartmentInfo();
      if (res.data !== undefined) {
        return res.data;
      }
      // Throw an error to be caught by React Query's error state
      throw new Error(res.error?.message || "Failed to fetch department info");
    },
  });
}

/**
 * Hook to create a new department information record.
 */
export function useCreateDepartmentInfo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateDepartmentInfoInput) => {
      const res = await createDepartmentInfo(data);
      if (res.data) return res.data;
      throw new Error(res.error?.message || "Failed to create department info");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DEPARTMENT_INFO_QUERY_KEY] });
      toast.success("Department profile created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

/**
 * Hook to update an existing department information record.
 */
export function useUpdateDepartmentInfo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateDepartmentInfoInput>;
    }): Promise<DepartmentInfoInstance> => {
      const res = await updateDepartmentInfo(id, data);
      if (res.data) return res.data;
      throw new Error(res.error?.message || "Failed to update department info");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DEPARTMENT_INFO_QUERY_KEY] });
      toast.success("Department profile updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

/**
 * Hook to delete a department information record.
 */
export function useDeleteDepartmentInfo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteDepartmentInfo(id);
      if (res.error) {
        throw new Error(
          res.error.message || "Failed to delete department info",
        );
      }
      return res.data;
    },
    onSuccess: () => {
      // After deleting, we set the query data to null to reflect the change immediately
      queryClient.setQueryData([DEPARTMENT_INFO_QUERY_KEY], null);
      queryClient.invalidateQueries({ queryKey: [DEPARTMENT_INFO_QUERY_KEY] });
      toast.success("Department profile deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
