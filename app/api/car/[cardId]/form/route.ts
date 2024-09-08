import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const { userId } = auth();
    const { cardId } = params;
    const values = await req.json();
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }
    const car = await db.car.update({
      where: {
        id: cardId,
        userId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(car);
  } catch (error) {
    console.log("[CAR FORM ID]", error);
    return new Response("Something went wrong", { status: 500 });
  }
}
