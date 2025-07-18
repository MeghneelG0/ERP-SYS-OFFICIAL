export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type LoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    name: string | null;
    role: UserRole;
  };
};
