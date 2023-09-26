import { Header } from "@/components/Header";

export default function ProfilePage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return (
    <>
      <Header title="Seu perfil" subtitle="Edite seu perfil aqui" />
      profile page{params.id}
    </>
  );
}
