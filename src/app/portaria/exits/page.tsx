import { getGuestsInside } from "@/api/guests";
import { ExitGuestDataTable } from "./_components/ExitGuestsDataTable";
import { columns } from "./_components/ExitGuestsColumn";
import { Header } from "@/components/Header";
import { format } from "date-fns";
export default async function ExitsPage() {
  const guestsInside = await getGuestsInside();

  const formattedGuestsInside = guestsInside.map((guest) => {
    const mouth = guest.entryDate.getMonth();
    const day = guest.entryDate.getDate();
    const year = guest.entryDate.getFullYear();
    const hour = guest.entryHour;
    const plate = guest.plate ? guest.plate : " Passante";
    const apartment = guest.apartment ? guest.apartment.toString() : "-";

    return {
      nome: guest.name,
      dataDeEntrada: format(
        new Date(`${mouth}/${day}/${year} ${hour}`),
        "yyy/MM/dd HH:mm"
      ),
      placa: plate,
      apartamento: apartment,
    };
  });

  return (
    <div>
      <Header
        title="Cadastrar saída"
        subtitle="Lista de hóspedes que estão dentro do hotel"
      />
      <div className="container mx-auto">
        <ExitGuestDataTable
          columns={columns}
          data={formattedGuestsInside}
          acessorKey="name"
          headerLabel="nome"
          acessorKey2="plate"
          headerLabel2="placa"
          acessorKey3="entryDate"
          headerLabel3="data de entrada"
          acessorKey4="apartment"
          headerLabel4="apartamento"
        />
      </div>
    </div>
  );
}
