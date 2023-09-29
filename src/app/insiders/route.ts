import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
export async function GET(req: Request) {
  try {
    const insiders = await prismadb.guest.findMany({
      where: {
        isInside: true,
      },
    });

    return NextResponse.json(insiders);
  } catch (error) {
    if (error instanceof Error) {
      console.error("[INSIDERS_GET]", error.message);
    }
  }
}
