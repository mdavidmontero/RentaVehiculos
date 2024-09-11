"use client";
import { Car } from "@prisma/client";
import { ListCarsProps } from "./ListCars.types";
import Image from "next/image";
import { Fuel, Gauge, Gem, Heart, Users, Wrench } from "lucide-react";
import { ModalAddReservation } from "@/components/shared/ModalAddReservation/ModalAddReservation";
import { useLovedCars } from "@/hooks/use-loved-cars";

export function ListCars(props: ListCarsProps) {
  const { cars } = props;

  const { addLoveItem, lovedItems, removeLovedItem } = useLovedCars();
  return (
    <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
      {cars.map((car: Car) => {
        const {
          priceDay,
          photo,
          cv,
          engine,
          id,
          people,
          name,
          transmission,
          type,
        } = car;

        const likeCard = lovedItems.some((item) => item.id === car.id);
        return (
          <div className="p-1 rounded-lg shadow-md hover:shadow-lg" key={id}>
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
                <p>{priceDay} $/dia</p>
              </div>
              <p className="flex items-center">
                <Gem className="h-4 w-4 mr-2" strokeWidth={1} />
                {type}
              </p>
              <p className="flex items-center">
                <Wrench className="h-4 w-4 mr-2" strokeWidth={1} />
                {transmission}
              </p>
              <p className="flex items-center">
                <Users className="h-4 w-4 mr-2" strokeWidth={1} />
                {people}
              </p>
              <p className="flex items-center">
                <Fuel className="h-4 w-4 mr-2" strokeWidth={1} />
                {engine}
              </p>
              <p className="flex items-center">
                <Gauge className="h-4 w-4 mr-2" strokeWidth={1} />
                {cv}
              </p>
              <div className="flex items-center justify-center gap-x-3">
                <ModalAddReservation car={car} />
                <Heart
                  className={`mt-2 cursor-pointer ${likeCard && "fill-black"}`}
                  onClick={
                    likeCard
                      ? () => removeLovedItem(car.id)
                      : () => addLoveItem(car)
                  }
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
