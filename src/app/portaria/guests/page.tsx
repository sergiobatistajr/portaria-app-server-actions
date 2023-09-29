import { Header } from "@/components/Header";
import { auth } from "@/lib/auth";
import GuestCreateClient from "./_components/GuestCreateClient";

export default async function GuestPage() {
  const session = await auth();

  return (
    <div>
      <Header
        title="Entrada de passantes"
        subtitle="Preencha os dados do passante e clique em salvar."
      />
      <GuestCreateClient userId={session?.user.id!} />
    </div>
  );
}
