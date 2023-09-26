import { Header } from "@/components/Header";
import UserList from "./_components/UserList";
import { getUsers } from "@/api/users";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div>
      <Header title="Usuários" subtitle="Gerencie os usuários do sistema" />
      <UserList users={users} />
    </div>
  );
}
