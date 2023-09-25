import { User, Role } from "@/api/types";
import { createUser } from "@/api/users";

export default async function RegisterPage() {
  const createUserAction = async (
    name: string,
    username: string,
    password: string,
    role: Role
  ): Promise<User> => {
    "use client";

    return await createUser(name, username, password, role);
  };
}
