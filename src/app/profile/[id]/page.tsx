import { redirect } from "next/navigation";
import { getUser, updateUser } from "@/api/users";
import { Header } from "@/components/Header";
import EditProfile from "./_components/EditProfile";
import { User } from "@/api/types";

export default async function ProfilePage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const user = await getUser(params.id);
  if (!user) redirect("/");

  const updateUserAction = async (
    name: string,
    username: string
  ): Promise<User> => {
    "use server";
    return await updateUser(params.id, name, username);
  };

  return (
    <>
      <Header
        title="Seu perfil"
        subtitle="Edite suas informações pessoais e de acesso."
      />
      <EditProfile initialData={user} updateUserAction={updateUserAction} />
    </>
  );
}
