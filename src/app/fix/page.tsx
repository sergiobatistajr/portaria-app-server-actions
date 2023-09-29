import { getGuests } from "@/api/guests";
import { Header } from "@/components/Header";

export default async function FixPage() {
  const guests = await getGuests();
  return (
    <div>
      <Header
        title="Lista de todas as entradas"
        subtitle="Aqui você pode ver todas as entradas de veículos e passantes e corrigir qualquer erro que tenha ocorrido."
      />
    </div>
  );
}
