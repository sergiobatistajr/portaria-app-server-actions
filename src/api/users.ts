import { User, Role } from "./types";
import prismadb from "@/lib/prismadb";
import bcrypt from "bcrypt";
export const getUsers = async (): Promise<User[]> =>
  await prismadb.user.findMany();

export const getUser = async (id: string): Promise<User | null> =>
  await prismadb.user.findUnique({ where: { id } });

export const createUser = async (
  name: string,
  username: string,
  password: string,
  role: Role
): Promise<User> => {
  const hashedPassword = await bcrypt.hash(password, 12);
  return await prismadb.user.create({
    data: {
      name,
      username,
      hashedPassword,
      role,
    },
  });
};

export const updateUser = async (
  id: string,
  name: string,
  username: string,
  role?: Role,
  isActive?: boolean
): Promise<User> =>
  await prismadb.user.update({
    where: { id },
    data: {
      name,
      username,
      role,
      isActive,
    },
  });

export const changePassword = async (
  id: string,
  password: string
): Promise<User> => {
  const hashedPassword = await bcrypt.hash(password, 12);
  return await prismadb.user.update({
    where: { id },
    data: {
      hashedPassword,
    },
  });
};

export const disableUser = async (id: string): Promise<User> => {
  return await prismadb.user.update({
    where: { id },
    data: {
      isActive: false,
    },
  });
};
