export const envConfig = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  nextAuthSecret: process.env.NEXTAUTH_SECRET || "my-secret",
  nextAuthUrl: process.env.NEXTAUTH_URL || "http://localhost:3000",
};
