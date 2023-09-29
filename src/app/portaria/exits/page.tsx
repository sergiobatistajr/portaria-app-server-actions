import { getGuestsInside } from "@/api/guests";
import { ExitGuestDataTable } from "./_components/ExitGuestsDataTable";
import { columns } from "./_components/ExitGuestsColumn";
import { Header } from "@/components/Header";

export default async function ExitsPage() {
  const guestsInside = await getGuestsInside();

  const formattedGuestsInside = guestsInside.map((guest) => {
    const mouth = guest.entryDate.getMonth();
    const day = guest.entryDate.getDate();
    const year = guest.entryDate.getFullYear();
    const hour = guest.entryHour;
    return {
      ...guest,

      entryDate: new Date(`${mouth}/${day}/${year} ${hour}`),
    };
  });

  return (
    <div>
      <Header
        title="Cadastrar saída"
        subtitle="Lista de hóspedes que estão dentro do hotel"
      />
      <div className="container mx-auto">
        <ExitGuestDataTable columns={columns} data={formattedGuestsInside} />
      </div>
    </div>
  );
}
