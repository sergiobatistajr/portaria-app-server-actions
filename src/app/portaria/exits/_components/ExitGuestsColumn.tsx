"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ExitGuestDataTableColumnHeader } from "./ExitGuestDataTableColumnHeader";

import ExitGuestColumnAction from "./ExitGuestColumnAction";
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
      return (
        <ExitGuestColumnAction path={`/portaria/exits/${row.original.id}`} />
      );
    },
  },
];
