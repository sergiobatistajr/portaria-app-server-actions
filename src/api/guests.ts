import type { Guest } from "./types";
import prismadb from "@/lib/prismadb";

export const getGuests = async (): Promise<Guest[]> =>
  await prismadb.guest.findMany();

export const getGuestsInside = async (): Promise<Guest[]> =>
  await prismadb.guest.findMany({ where: { isInside: true } });

export const getGuest = async (id: string): Promise<Guest | null> =>
  await prismadb.guest.findFirst({ where: { id } });

export const createGuest = async (
  name: string,
  isInside: boolean,
  entryDate: Date,
  entryHour: string,
  userId: string,
  apartment?: number
): Promise<Guest> =>
  await prismadb.guest.create({
    data: {
      name,
      isInside,
      entryDate,
      entryHour,
      userId,
      apartment,
    },
  });
