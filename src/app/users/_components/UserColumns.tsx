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
      const router = useRouter();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => router.push(`/users/${row.original.id}`)}
            >
              <Settings className="w-4 h-4 mx-1" />
              Editar usuário
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                router.push(`/users/reset-password/${row.original.id}`)
              }
            >
              <Key className="w-4 h-4 mx-1" />
              Resetar senha
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
