"use client";
import Link from "next/link";

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

export function MainNav({ role }: { role: string }) {
  return (
    <div>
      <nav className="flex items-center space-x-4 lg:space-x-6">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Portaria</MenubarTrigger>
            <MenubarContent>
              <MenubarItem asChild>
                <Link href="/car">Nova entrada de carro</Link>
              </MenubarItem>
              <MenubarItem asChild>
                <Link href="/guest">Nova entrada de passante</Link>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Relatórios</MenubarTrigger>
            <MenubarContent>
              <MenubarItem asChild>
                <Link href="/">Dashboard</Link>
              </MenubarItem>
              <MenubarItem asChild>
                <Link href="/guest">Todo período</Link>
              </MenubarItem>
              <MenubarItem asChild>
                <Link href="/guest">Entradas de Hoje</Link>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          {role === "admin" && (
            <MenubarMenu>
              <MenubarTrigger>Sistema</MenubarTrigger>
              <MenubarContent>
                <MenubarItem asChild>
                  <Link href="/register">Cadastrar Usuário</Link>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          )}
        </Menubar>
      </nav>
    </div>
  );
}
