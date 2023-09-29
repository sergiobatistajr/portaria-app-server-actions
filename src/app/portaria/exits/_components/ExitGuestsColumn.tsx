"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ExitGuestDataTableColumnHeader } from "./ExitGuestDataTableColumnHeader";
import { useRouter } from "next/navigation";
import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
type GuestClientDataTable = {
  id: string;
  nome: string;
  dataDeEntrada: string;
  placa: string;
  apartamento: string;
};
export const columns: ColumnDef<GuestClientDataTable>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "dataDeEntrada",
    header: ({ column }) => (
      <ExitGuestDataTableColumnHeader column={column} title="Data de entrada" />
    ),
  },
  {
    accessorKey: "placa",
    header: ({ column }) => (
      <ExitGuestDataTableColumnHeader column={column} title="Placa" />
    ),
  },
  {
    accessorKey: "apartamento",
    header: ({ column }) => (
      <ExitGuestDataTableColumnHeader column={column} title="Apartamento" />
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
              onClick={() => router.push(`/portaria/exits/${row.original.id}`)}
            >
              Lançar saída
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
