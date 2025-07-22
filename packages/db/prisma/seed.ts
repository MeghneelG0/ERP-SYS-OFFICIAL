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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
