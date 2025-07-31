import { z } from "zod";
import { DepartmentInfoSchema } from "../schema/department-info.schema";

export type CreateDepartmentInfoInput = z.infer<typeof DepartmentInfoSchema>;

export interface StudentStrengthInstance {
  id: string;
  year: number;
  intake: number;
  admitted: number;
  departmentInfoId: string;
}

export interface DepartmentInfoInstance {
  id: string;
  ugPrograms: number;
  pgPrograms: number;
  totalCourses: number;
  creditsEven: number;
  creditsOdd: number;
  studentsInternship: number;
  studentsProject: number;
  fullTimeTeachers: number;
  totalCalculationType: "ADMITTED" | "SANCTIONED";
  departmentId: string;
  studentStrength: StudentStrengthInstance[];
}
