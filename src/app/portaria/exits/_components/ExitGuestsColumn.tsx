"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Guest } from "@/api/types";
import { ExitGuestDataTableColumnHeader } from "./ExitGuestDataTableColumnHeader";
type GuestClientDataTable = {
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
];
