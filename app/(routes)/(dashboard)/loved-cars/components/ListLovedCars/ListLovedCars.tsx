"use client";
import { useLovedCars } from "@/hooks/use-loved-cars";
import { Car } from "@prisma/client";
import { Fuel, Gauge, Gem, Heart, Users, Wrench } from "lucide-react";
import Image from "next/image";
import { ModalAddReservation } from "@/components/shared/ModalAddReservation/ModalAddReservation";
export function ListLovedCars() {
  const { lovedItems, removeLovedItem } = useLovedCars();
  return (
    <>
      {lovedItems.length === 0 ? (
        <h2>Aun no dispones de coches que te gusten</h2>
      ) : (
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {lovedItems.map((car: Car) => {
            const {
              priceDay,
              photo,
              name,
              type,
              transmission,
              people,
              engine,
              cv,
              id,
            } = car;

            return (
              <div
                className="p-1 rounded-lg shadow-md hover:shadow-lg"
                key={id}
              >
                <Image
                  src={photo}
                  alt={name}
                  width={400}
                  height={600}
                  className="rounded-lg"
                />
                <div className="p-3">
                  <div className="flex flex-col mb-3 gap-x-4">
                    <p className="text-xl min-h-16 lg:min-h-fit">{name}</p>
                    <p>{priceDay} $ /dia</p>
                    <p className="flex items-center gap-2">
                      <Wrench className="h-4 w-4 mr-2" /> {transmission}
                    </p>
                    <p className="flex items-center gap-2">
                      <Users className="h-4 w-4 mr-2" /> {people}
                    </p>
                    <p className="flex items-center gap-2">
                      <Fuel className="h-4 w-4 mr-2" /> {engine}
                    </p>
                    <p className="flex items-center gap-2">
                      <Gauge className="h-4 w-4 mr-2" /> {cv}
                    </p>
                    <div className="flex items-center justify-center gap-x-3">
                      <ModalAddReservation car={car} />
                      <Heart
                        className="mt-2 cursor-pointer fill-black"
                        onClick={() => removeLovedItem(car.id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
