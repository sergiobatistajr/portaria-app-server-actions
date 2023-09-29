import { changePassword, getUser } from "@/api/users";
import ResetPasswordClient from "./_components/UserResetPassowrd";
import { redirect } from "next/navigation";
import { Header } from "@/components/Header";

export default async function ResetPasswordPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const user = await getUser(params.id);

  if (!user) redirect("/users");

  return (
    <>
      <Header
        title="Resetar senha"
        subtitle="Preencha os campos abaixo para resetar a senha do usuário"
      />
      <ResetPasswordClient name={user.name} id={user.id} />
    </>
  );
}
