import { PrismaClient, UserRole } from '../prisma/client';

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

  // Create admin users with specific roles
  const users = [
    {
      email: 'qac@admin.com',
      name: 'QAC Admin',
      role: UserRole.QAC,
      dept_id: '', // QAC users don't belong to a specific department
    },
    {
      email: 'hod@admin.com',
      name: 'HOD Admin',
      role: UserRole.HOD,
      dept_id: department.id,
    },
    {
      email: 'faculty@admin.com',
      name: 'Faculty Admin',
      role: UserRole.FACULTY,
      dept_id: department.id,
    },
  ];

  for (const userData of users) {
    const user = await prisma.user.upsert({
      where: { user_email: userData.email },
      update: {
        user_role: userData.role,
        dept_id: userData.dept_id,
      },
      create: {
        user_email: userData.email,
        user_name: userData.name,
        user_password: '', // OTP-based authentication
        user_role: userData.role,
        dept_id: userData.dept_id,
      },
    });
    console.log(`✅ User created: ${user.user_email} (${user.user_role})`);
  }

  // Create QAC user in the Qac table for QAC role mapping
  const qac = await prisma.qac.upsert({
    where: { qac_email: 'qac@admin.com' },
    update: {},
    create: {
      qac_name: 'QAC Admin',
      qac_email: 'qac@admin.com',
      qac_password: '', // OTP-based authentication
      qac_role: 'ADMIN',
    },
  });

  console.log(`✅ QAC user created: ${qac.qac_email}`);

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
