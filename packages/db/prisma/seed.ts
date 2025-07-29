import * as dotenv from "dotenv";
dotenv.config();

import { PrismaClient, UserRole } from "./client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // Create a default department
  const department = await prisma.department.upsert({
    where: { dept_name: "Computer Science" },
    update: {},
    create: {
      dept_name: "Computer Science",
      dept_creation: new Date(),
    },
  });

  console.log("✅ Department created:", department.dept_name);

  // Create admin users with specific roles (unified User table)
  const users = [
    {
      user_email: "qac@jaipur.manipur.edu",
      user_name: "QAC Admin",
      user_password: "14jan2004",
      user_role: UserRole.QAC,
      dept_id: null, // QAC users don't belong to a specific department
    },
    {
      user_email: "hod@jaipur.manipur.edu",
      user_name: "HOD Admin",
      user_password: "14jan2004",
      user_role: UserRole.HOD,
      dept_id: department.id,
    },
    {
      user_email: "faculty@jaipur.manipur.edu",
      user_name: "Faculty Admin",
      user_password: "14jan2004",
      user_role: UserRole.FACULTY,
      dept_id: department.id,
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { user_email: user.user_email },
      update: {},
      create: user,
    });
    console.log("✅ User created:", user.user_email);
  }

  // Seed default PillarTemplate and KpiTemplate for QAC admin
  const qacUser = await prisma.user.findUnique({
    where: { user_email: "qac@jaipur.manipur.edu" },
  });
  if (qacUser) {
    const academicYear = 202425;
    // Pillar templates
    const pillars = [
      {
        pillar_name: "Teaching",
        pillar_value: 0.4,
        description: "Focus on teaching quality",
        academic_year: academicYear,
        created_by_user: qacUser.id,
      },
      {
        pillar_name: "Research",
        pillar_value: 0.3,
        description: "Emphasis on research output",
        academic_year: academicYear,
        created_by_user: qacUser.id,
      },
      {
        pillar_name: "Extension",
        pillar_value: 0.3,
        description: "Community engagement and outreach",
        academic_year: academicYear,
        created_by_user: qacUser.id,
      },
    ];
    await prisma.pillarTemplate.createMany({ data: pillars });
    console.log("✅ Pillar templates seeded");

    // KPI templates
    const kpis = [
      {
        kpi_number: 1,
        kpi_metric_name: "Student Satisfaction",
        kpi_description: "Survey-based satisfaction score",
        kpi_data: {},
        kpi_value: 85,
        academic_year: academicYear,
        kpi_calculated_metrics: {},
        created_by_user: qacUser.id,
      },
      {
        kpi_number: 2,
        kpi_metric_name: "Publication Count",
        kpi_description: "Number of research publications",
        kpi_data: {},
        kpi_value: 50,
        academic_year: academicYear,
        kpi_calculated_metrics: {},
        created_by_user: qacUser.id,
      },
      {
        kpi_number: 3,
        kpi_metric_name: "Outreach Events",
        kpi_description: "Count of community outreach events",
        kpi_data: {},
        kpi_value: 20,
        academic_year: academicYear,
        kpi_calculated_metrics: {},
        created_by_user: qacUser.id,
      },
    ];
    await prisma.kpiTemplate.createMany({ data: kpis });
    console.log("✅ KPI templates seeded");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
