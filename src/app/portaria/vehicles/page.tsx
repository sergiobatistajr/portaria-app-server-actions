import { Header } from "@/components/Header";
import CreateVehicleClient from "./_components/CreateVehicleClient";
import { auth } from "@/lib/auth";

export default async function CarPage() {
  const session = await auth();

  return (
    <div>
      <Header
        title="Entrada de veículos"
        subtitle="Preencha os dados do veículo e clique em salvar"
      />
      <CreateVehicleClient userId={session?.user.id!} />
    </div>
  );
}
