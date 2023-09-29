"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Guest } from "@/api/types";
import { format } from "date-fns";
import { ExitGuestDataTableColumnHeader } from "./ExitGuestDataTableColumnHeader";

export const columns: ColumnDef<Guest>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "entryDate",
    header: ({ column }) => (
      <ExitGuestDataTableColumnHeader column={column} title="Data de entrada" />
    ),
    cell: ({ row }) => (
      <div>{format(row.original.entryDate, "yyy/MM/dd HH:mm")}</div>
    ),
  },
];
