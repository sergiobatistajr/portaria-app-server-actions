import { redirect } from "next/navigation";
import { getUser, updateUser } from "@/api/users";
import { Header } from "@/components/Header";
import EditProfile from "./_components/EditProfile";
import { User } from "@/api/types";
import { auth } from "@/lib/auth";

export default async function ProfilePage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const session = await auth();
  const user = await getUser(params.id);

  if (!user) return redirect("/");

  if (session?.user.id !== user.id) return redirect("/");

  return (
    <>
      <Header
        title="Seu perfil"
        subtitle="Edite suas informações pessoais e de acesso."
      />
      <EditProfile initialData={user} />
    </>
  );
}
