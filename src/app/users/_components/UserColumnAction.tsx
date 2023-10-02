"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Key, MoreHorizontal, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserColumnAction({
  editProfilePath,
  resetPasswordPath,
}: {
  editProfilePath: string;
  resetPasswordPath: string;
}) {
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
        <DropdownMenuItem onClick={() => router.push(editProfilePath)}>
          <Settings className="w-4 h-4 mx-1" />
          Editar usuário
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(resetPasswordPath)}>
          <Key className="w-4 h-4 mx-1" />
          Resetar senha
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
