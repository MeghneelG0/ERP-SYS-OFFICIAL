import { z } from "zod";

export const StudentStrengthSchema = z.object({
  year: z.number().int().min(1, "Year is required"),
  intake: z.number().int().min(0, "Intake must be a non-negative number"),
  admitted: z
    .number()
    .int()
    .min(0, "Admitted count must be a non-negative number"),
});

export const DepartmentInfoSchema = z.object({
  ugPrograms: z
    .number()
    .int()
    .min(0, "UG Programs must be a non-negative number"),
  pgPrograms: z
    .number()
    .int()
    .min(0, "PG Programs must be a non-negative number"),
  totalCourses: z
    .number()
    .int()
    .min(0, "Total Courses must be a non-negative number"),
  creditsEven: z
    .number()
    .int()
    .min(0, "Even semester credits must be a non-negative number"),
  creditsOdd: z
    .number()
    .int()
    .min(0, "Odd semester credits must be a non-negative number"),
  studentsInternship: z
    .number()
    .int()
    .min(0, "Internship student count must be a non-negative number"),
  studentsProject: z
    .number()
    .int()
    .min(0, "Project student count must be a non-negative number"),
  fullTimeTeachers: z
    .number()
    .int()
    .min(0, "Full-time teacher count must be a non-negative number"),
  studentStrength: z.array(StudentStrengthSchema),
  totalCalculationType: z.enum(["ADMITTED", "SANCTIONED"]),
});
