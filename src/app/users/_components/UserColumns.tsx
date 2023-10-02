"use client";
import { User } from "@/api/types";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Key, MoreHorizontal, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import UserColumnAction from "./UserColumnAction";

type UserColumnsProps = {
  id: string;
  nome: string;
  usuário: string;
  função: string;
  status: boolean;
};

export const userColumns: ColumnDef<UserColumnsProps>[] = [
  {
    accessorKey: "nome",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
  },
  {
    accessorKey: "usuário",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Usuário" />
    ),
  },
  {
    accessorKey: "função",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Função" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <Badge variant={row.original.status ? "secondary" : "destructive"}>
        {row.original.status ? "Ativo" : "Inativo"}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const id = row.original.id;

      return (
        <UserColumnAction
          editProfilePath={`/users/${id}`}
          resetPasswordPath={`/users/reset-password/${id}`}
        />
      );
    },
  },
];
