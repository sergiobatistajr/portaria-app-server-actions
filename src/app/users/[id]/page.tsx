import { getUser, updateUser } from "@/api/users";
import EditUser from "./_components/EditUserClient";
import { redirect } from "next/navigation";
import { User, Role } from "@/api/types";
import { Header } from "@/components/Header";

export default async function EditUserPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUser(params.id);
  if (!user) redirect("/users");
  const updateUserAction = async (
    name: string,
    username: string,
    role: Role,
    isActive: boolean
  ): Promise<User> => {
    "use server";

    return await updateUser(params.id, name, username, role, isActive);
  };

  return (
    <>
      <Header title="Editar usuário" subtitle="Edite os dados do usuário" />
      <EditUser initialData={user} updateUserAction={updateUserAction} />
    </>
  );
}
