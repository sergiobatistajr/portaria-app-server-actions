import { format } from "date-fns";

import { getGuest } from "@/api/guests";
import ExitGuestClient from "./_components/ExitGuestClient";
import { Header } from "@/components/Header";
export default async function ExitsPage({
  params,
}: {
  params: { id: string };
}) {
  const guest = await getGuest(params.id);
  if (!guest) return null;

  const formattedGuest = () => {
    const day = guest.entryDate.getDate();
    const month = guest.entryDate.getMonth() + 1;
    const year = guest.entryDate.getFullYear();
    const hour = guest.entryHour;
    const plate = guest.plate ? guest.plate : undefined;
    const apartment = guest.apartment ? guest.apartment.toString() : undefined;
    const observations = guest.observations ? guest.observations : undefined;
    const entryDate = format(
      new Date(`${month}/${day}/${year} ${hour}`),
      "yyy/MM/dd HH:mm"
    );

    return {
      id: guest.id,
      name: guest.name,
      entryDate,
      plate,
      observations,
      apartment,
    };
  };

  const exitGuest = formattedGuest();

  return (
    <div>
      <Header
        title="Cadastro de saída"
        subtitle="Lançamento de saída de visitante"
      />
      <ExitGuestClient exitGuest={exitGuest} />
    </div>
  );
}
