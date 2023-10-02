import { Header } from "@/components/Header";
import DashboardClient from "./_components/Dashboard";
import { dashboard } from "@/api/guests";

export default async function Home() {
  const data = await dashboard();
  return (
    <>
      <Header title="Dashboard" subtitle="Todas as entradas/saídas" />
      <DashboardClient data={data} />
    </>
  );
}
