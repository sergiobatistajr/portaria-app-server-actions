import { Header } from "@/components/Header";
import CreateVehicleClient from "./_components/CreateVehicleClient";
import { createVehicleGuest } from "@/api/guests";
import { Guest } from "@/api/types";
import { auth } from "@/lib/auth";

export default async function CarPage() {
  const session = await auth();

  const createVehicleGuestAction = async (
    name: string,
    model: string,
    pax: number,
    entryDate: Date,
    entryHour: string,
    isInside: boolean,
    plate: string,
    apartment?: number,
    observations?: string
  ): Promise<Guest> => {
    "use server";
    // const userId = session?.user.id!;
    return await createVehicleGuest(
      name,
      model,
      pax,
      entryDate,
      entryHour,
      session?.user.id!,
      isInside,
      plate,
      apartment,
      observations
    );
  };

  return (
    <div>
      <Header
        title="Entrada de veículos"
        subtitle="Preencha os dados do veículo e clique em salvar"
      />
      <CreateVehicleClient
        createVehicleGuestAction={createVehicleGuestAction}
      />
    </div>
  );
}
