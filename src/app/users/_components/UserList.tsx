"use client";

import { UserDataTable } from "./UserDataTable";
import { userColumns } from "./UserColumns";
import { User } from "@/api/types";
export default function UserList({ users }: { users: User[] }) {
  return (
    <div className="container mx-auto">
      <UserDataTable columns={userColumns} data={users} />
    </div>
  );
}
