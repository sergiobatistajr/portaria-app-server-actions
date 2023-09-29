"use server";

import { cache } from "react";
import { revalidatePath } from "next/cache";
import { User, Role } from "./types";
import prismadb from "@/lib/prismadb";
import bcrypt from "bcrypt";

export const getUsers = cache(
  async (): Promise<User[]> => await prismadb.user.findMany()
);

export const getUser = cache(
  async (id: string): Promise<User | null> =>
    await prismadb.user.findUnique({ where: { id } })
);

export const createUser = async (
  name: string,
  username: string,
  password: string,
  role: Role
): Promise<void> => {
  const hashedPassword = await bcrypt.hash(password, 12);
  await prismadb.user.create({
    data: {
      name,
      username,
      hashedPassword,
      role,
    },
  });
  revalidatePath("/users");
};

export async function updateUser(
  id: string,
  name: string,
  username: string,
  role?: Role,
  isActive?: boolean
): Promise<void> {
  await prismadb.user.update({
    where: { id },
    data: {
      name,
      username,
      role,
      isActive,
    },
  });
  revalidatePath("/users");
}

export const changePassword = async (
  id: string,
  password: string
): Promise<void> => {
  const hashedPassword = await bcrypt.hash(password, 12);
  await prismadb.user.update({
    where: { id },
    data: {
      hashedPassword,
    },
  });
  revalidatePath("/users");
};

export const disableUser = async (id: string): Promise<void> => {
  await prismadb.user.update({
    where: { id },
    data: {
      isActive: false,
    },
  });
  revalidatePath("/users");
};
