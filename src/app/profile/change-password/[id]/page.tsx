import { redirect } from "next/navigation";
import { Header } from "@/components/Header";
import { changePassword } from "@/api/users";
import ChangePasswordClient from "./_components/ChangePasswordClient";
import { User } from "@/api/types";
import { auth } from "@/lib/auth";

export default async function ResetPasswordPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const session = await auth();

  if (session?.user.id !== params.id) redirect("/profile");

  const changePasswordAction = async (password: string): Promise<User> => {
    "use server";

    return await changePassword(params.id, password);
  };

  return (
    <>
      <Header title="Mudar senha" subtitle="Digite sua nova senha" />
      <ChangePasswordClient changePasswordAction={changePasswordAction} />
    </>
  );
}
