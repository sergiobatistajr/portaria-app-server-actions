"use server";
import { revalidatePath } from "next/cache";
import type { Guest } from "./types";
import prismadb from "@/lib/prismadb";
import { cache } from "react";

export const getGuests = cache(
  async (): Promise<Guest[]> =>
    await prismadb.guest.findMany({ orderBy: { updatedAt: "desc" } })
);

export const getGuestsInside = cache(
  async (): Promise<Guest[]> =>
    await prismadb.guest.findMany({
      where: { isInside: true },
      orderBy: { createdAt: "desc" },
    })
);

export const getGuest = async (id: string): Promise<Guest | null> =>
  await prismadb.guest.findFirst({ where: { id } });

export const createGuest = async (
  name: string,
  isInside: boolean,
  entryDate: Date,
  entryHour: string,
  userId: string,
  apartment?: number,
  observations?: string
): Promise<void> => {
  await prismadb.guest.create({
    data: {
      name,
      isInside,
      entryDate,
      entryHour,
      userId,
      apartment,
      observations,
    },
  });
  revalidatePath("/portaria/exits");
};

export const createVehicleGuest = async (
  name: string,
  model: string,
  pax: number,
  entryDate: Date,
  entryHour: string,
  userId: string,
  isInside: boolean,
  plate: string,
  apartment?: number,
  observations?: string
): Promise<void> => {
  await prismadb.guest.create({
    data: {
      name,
      model,
      pax,
      entryDate,
      entryHour,
      userId,
      isInside,
      plate,
      apartment,
      observations,
    },
  });
  revalidatePath("/portaria/exits");
};

export const createExitGuest = async (
  id: string,
  exitDate: Date,
  exitHour: string
): Promise<void> => {
  await prismadb.guest.update({
    where: { id },
    data: {
      isInside: false,
      exitDate,
      exitHour,
    },
  });
  revalidatePath("/portaria/exits");
};
