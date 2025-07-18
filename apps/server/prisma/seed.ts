import * as dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from './client';
import { UserRole } from '@workspace/types/enums/enums';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create a default department
  const department = await prisma.department.upsert({
    where: { dept_name: 'Computer Science' },
    update: {},
    create: {
      dept_name: 'Computer Science',
      dept_creation: new Date(),
    },
  });

  console.log('✅ Department created:', department.dept_name);

  // Create QAC user (separate table)
  const qac = await prisma.qac.upsert({
    where: { qac_email: 'qac@jaipur.manipal.edu' },
    update: {
      qac_password: '14jan2004',
    },
    create: {
      qac_name: 'QAC Admin',
      qac_email: 'qac@jaipur.manipal.edu',
      qac_password: '14jan2004',
      qac_role: 'QAC',
    },
  });
  console.log('✅ QAC user created:', qac.qac_email);

  // Create admin users with specific roles (User table)
  const users = [
    {
      user_email: 'hod@jaipur.manipal.edu',
      user_name: 'HOD Admin',
      user_password: '14jan2004',
      user_role: UserRole.HOD,
      dept_id: department.id,
    },
    {
      user_email: 'faculty@jaipur.manipal.edu',
      user_name: 'Faculty Admin',
      user_password: '14jan2004',
      user_role: UserRole.FACULTY,
      dept_id: department.id,
    },
  ];

  for (const userData of users) {
    const user = await prisma.user.upsert({
      where: { user_email: userData.user_email },
      update: {
        user_role: userData.user_role,
        dept_id: userData.dept_id,
        user_password: '14jan2004',
      },
      create: {
        user_email: userData.user_email,
        user_name: userData.user_name,
        user_password: '14jan2004',
        user_role: userData.user_role,
        dept_id: userData.dept_id,
      },
    });
    console.log('✅ User created:', user.user_email);
  }

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
