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
    const { isPublish } = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const car = await db.car.update({
      where: {
        id: cardId,
        userId,
      },
      data: {
        isPublish: isPublish,
      },
    });
    return NextResponse.json(car);
  } catch (error) {
    console.log("[CAR ID PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      cardId: string;
    };
  }
) {
  try {
    const { userId } = auth();
    const { cardId } = params;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const deletedCompany = await db.car.delete({
      where: {
        id: cardId,
      },
    });
    return NextResponse.json(deletedCompany);
  } catch (error) {
    console.log("[CAR DELETE ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
