import { Header } from "@/components/Header";
import { getUsers } from "@/api/users";
import { UserDataTable } from "./_components/UserDataTable";
import { userColumns } from "./_components/UserColumns";

export default async function UsersPage() {
  const users = await getUsers();

  const formattedUsers = users.map((user) => {
    const id = user.id;
    const nome = user.name;
    const usuário = user.username;
    const função = user.role;
    const status = user.isActive;
    return {
      id,
      nome,
      usuário,
      função,
      status,
    };
  });

  return (
    <div>
      <Header title="Usuários" subtitle="Gerencie os usuários do sistema" />
      <div className="container mx-auto mb-2">
        <UserDataTable columns={userColumns} data={formattedUsers} />
      </div>
    </div>
  );
}
