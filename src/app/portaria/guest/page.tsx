import { createGuest } from "@/api/guests";
import { Guest } from "@/api/types";
import { Header } from "@/components/Header";
import { auth } from "@/lib/auth";
import GuestCreateClient from "./_components/GuestCreateClient";

export default async function GuestPage() {
  const session = await auth();

  const createGuestAction = async (
    name: string,
    isInside: boolean,
    entryDate: Date,
    entryHour: string,
    apartment?: number
  ): Promise<Guest> => {
    "use server";

    return await createGuest(
      name,
      isInside,
      entryDate,
      entryHour,
      session?.user.id!,
      apartment
    );
  };
  return (
    <div>
      <Header
        title="Entrada de passantes"
        subtitle="Preencha os dados do passante e clique em salvar."
      />
      <GuestCreateClient createGuestAction={createGuestAction} />
    </div>
  );
}
