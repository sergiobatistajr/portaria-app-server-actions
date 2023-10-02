"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import type { Guest } from "./types";
import prismadb from "@/lib/prismadb";
import { cache } from "react";

export const dashboard = cache(
  async (): Promise<
    Array<{
      month: string;
      total: number;
    }>
  > => {
    const guests = await prismadb.guest.findMany({
      select: {
        entryDate: true,
      },
    });
    const months = guests.map((guest) => guest.entryDate.getMonth());
    const monthsUnique = [...new Set(months)];
    const monthsCount = monthsUnique.map((month) => {
      const monthName = new Date(0, month).toLocaleString("pt-BR", {
        month: "long",
      });
      const monthCount = months.filter((m) => m === month).length;
      return {
        month: monthName,
        total: monthCount,
      };
    });
    return monthsCount;
  }
);

export const getGuests = cache(
  async (): Promise<Guest[]> =>
    await prismadb.guest.findMany({ orderBy: { updatedAt: "desc" } })
);

// export const getGuestsInside = cache(
//   async (): Promise<Guest[]> =>
//     await prismadb.guest.findMany({
//       where: { isInside: true },
//       orderBy: { createdAt: "desc" },
//     })
// );

export const getGuestsInside = async (): Promise<Guest[]> => {
  const insiders = await fetch("http://localhost:3000/insiders", {
    next: { tags: ["insiders"] },
  });

  return insiders.json();
};

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
  revalidateTag("insiders");
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
  revalidateTag("insiders");
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
