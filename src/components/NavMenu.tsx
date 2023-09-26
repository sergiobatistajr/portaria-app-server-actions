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
            <MenubarTrigger className="relative">Portaria</MenubarTrigger>
            <MenubarContent>
              <MenubarSub>
                <MenubarSubTrigger>Nova entrada</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Carros</MenubarItem>
                  <MenubarItem>Passantes</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSeparator />
              <MenubarItem>Saídas</MenubarItem>
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
              <MenubarMenu>
                <MenubarTrigger className="relative">Sistema</MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>Usuários</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem asChild>
                        <Link href="/users/register">
                          Cadastrar novo usuário
                        </Link>
                      </MenubarItem>
                      <MenubarItem asChild>
                        <Link href="/users">Mostrar usuários</Link>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSeparator />
                  <MenubarItem>Corrigir entrada/saída</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </MenubarMenu>
          )}
        </Menubar>
      </nav>
    </div>
  );
}
