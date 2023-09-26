import { Header } from "@/components/Header";
import DashboardClient from "./_components/Dashboard";

export default function Home() {
  return (
    <>
      <Header title="Dashboard" subtitle="Todas as entradas/saídas" />
      <DashboardClient />
    </>
  );
}
