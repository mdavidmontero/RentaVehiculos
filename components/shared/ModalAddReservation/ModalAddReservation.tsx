import { Button } from "@/components/ui/button";
import { ModalAddReservationProps } from "./ModalAddReservation.types";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Car } from "@prisma/client";
import { CalendarSelector } from "./CalendarSelector/CalendarSelector";
import { useState } from "react";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

export function ModalAddReservation(props: ModalAddReservationProps) {
  const [dateSelected, setDateSelected] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(),
    to: addDays(new Date(), 5),
  });
  const { car } = props;

  const onReserverCar = async (car: Car, dateSelected: DateRange) => {
    try {
      const response = await axios.post("/api/checkout", {
        carId: car.id, // Fixed typo from cardId to carId
        priceDay: car.priceDay,
        startDate: dateSelected.from,
        endDate: dateSelected.to,
        carName: car.name,
      });

      if (response.data.url) {
        window.location = response.data.url;
        toast({
          title: "Reserva realizada",
          description: "Se ha realizado la reserva correctamente",
        });
      } else {
        throw new Error("No URL returned from the server.");
      }
    } catch (error) {
      toast({
        title: "Error al realizar la reserva",
        description:
          error instanceof Error ? error.message : "Error desconocido",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Reservar Vehiculo</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Selecciona las fechas en las que quieras alquilar el coche
          </AlertDialogTitle>
          <AlertDialogDescription>
            <CalendarSelector
              setDateSelected={setDateSelected}
              cartPriceDay={car.priceDay}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onReserverCar(car, dateSelected)}>
            Reservar Vehiculo
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
