import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { TableReserves } from "./components/TableReserves";

export default async function pageReserve() {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const orders = await db.order.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <h1 className="mb-4 text-3xl">Reserves Page</h1>
      {orders.length === 0 ? (
        <div className="flex flex-col justify-center gap-4 items-center">
          <h2 className="text-xl">No tienes ningún Pedido</h2>
          <p>Haz tus Pedidos a través de la pagina de vehiculos</p>
          <Link href="/cars">
            <Button>Lista de Vehiculos</Button>
          </Link>
        </div>
      ) : (
        <TableReserves orders={orders} />
      )}
    </div>
  );
}
