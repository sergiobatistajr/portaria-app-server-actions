import { getUser } from "@/api/users";
import EditUser from "./_components/EditUserClient";
import { redirect } from "next/navigation";
import { Header } from "@/components/Header";

export default async function EditUserPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUser(params.id);
  if (!user) redirect("/users");

  return (
    <>
      <Header title="Editar usuário" subtitle="Edite os dados do usuário" />
      <EditUser initialData={user} />
    </>
  );
}
