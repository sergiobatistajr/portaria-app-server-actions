import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prismadb from "@/lib/prismadb";

export async function GET(req: Request) {
  try {
    const session = await auth();

    if (!session) new NextResponse("Unauthorized", { status: 401 });

    const insiders = await prismadb.guest.findMany({
      where: {
        isInside: true,
      },
      orderBy: {
        entryDate: "desc",
      },
    });

    return NextResponse.json(insiders);
  } catch (error) {
    console.log("[INSIDERS_GUEST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
