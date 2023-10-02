"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExitGuestsPagination } from "./ExitGuestsPagination";
import { ExitGuestsViewOptions } from "./ExitGuetsViewOptions";
import { Input } from "@/components/ui/input";
interface ExitGuestDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  acessorKey: string;
  headerLabel: string;
  acessorKey2?: string;
  headerLabel2?: string;
  acessorKey3?: string;
  headerLabel3?: string;
  acessorKey4?: string;
  headerLabel4?: string;
}

export function ExitGuestDataTable<TData, TValue>({
  columns,
  data,
  acessorKey,
  headerLabel,
  acessorKey2,
  headerLabel2,
  acessorKey3,
  headerLabel3,
  acessorKey4,
  headerLabel4,
}: ExitGuestDataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Input
          placeholder={`Pesquisar por ${headerLabel}`}
          value={
            (table.getColumn(acessorKey)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(acessorKey)?.setFilterValue(event.target.value)
          }
        />
        {acessorKey2 && (
          <Input
            placeholder={`Pesquisar por ${headerLabel2}`}
            value={
              (table.getColumn(acessorKey2)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(acessorKey2)?.setFilterValue(event.target.value)
            }
            className="max-w-xs"
          />
        )}
        {acessorKey3 && (
          <Input
            placeholder={`Pesquisar por ${headerLabel3}`}
            value={
              (table.getColumn(acessorKey3)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(acessorKey3)?.setFilterValue(event.target.value)
            }
            className="max-w-xs"
          />
        )}
        {acessorKey4 && (
          <Input
            placeholder={`Pesquisar por ${headerLabel4}`}
            value={
              (table.getColumn(acessorKey4)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(acessorKey4)?.setFilterValue(event.target.value)
            }
            className="max-w-xs"
          />
        )}
        <ExitGuestsViewOptions table={table} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum dado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <ExitGuestsPagination table={table} />
    </div>
  );
}
