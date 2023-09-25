import type { Guest } from "./types";
import prismadb from "@/lib/prismadb";

export const getGuests = async (): Promise<Guest[]> =>
  await prismadb.guest.findMany();

export const getGuestsInside = async (): Promise<Guest[]> =>
  await prismadb.guest.findMany({ where: { isInside: true } });

export const getGuest = async (id: string): Promise<Guest | null> =>
  await prismadb.guest.findFirst({ where: { id } });

export const createGuest = async (
  id: string,
  name: string,
  isInside: boolean,
  entryDate: Date,
  entryHour: string,
  userId: string,
  plate?: string,
  apartment?: number,
  observations?: string,
  model?: string,
  pax?: number,
  exitDate?: Date,
  exitHour?: string
): Promise<Guest> =>
  await prismadb.guest.create({
    data: {
      id,
      name,
      isInside,
      plate,
      apartment,
      observations,
      model,
      pax,
      entryDate,
      entryHour,
      exitDate,
      exitHour,
      userId,
    },
  });
