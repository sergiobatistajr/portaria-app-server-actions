import { User, Role } from "@/api/types";
import { createUser } from "@/api/users";
import RegisterClient from "./_components/RegisterClient";

export default async function RegisterPage() {
  const createUserAction = async (
    name: string,
    username: string,
    password: string,
    role: Role
  ): Promise<User> => {
    "use server";

    return await createUser(name, username, password, role);
  };

  return <RegisterClient createUserAction={createUserAction} />;
}
