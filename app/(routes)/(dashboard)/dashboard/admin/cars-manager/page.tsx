import { ButtonAddCar } from "./components";

export default function CarsManagerPage() {
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Manager your Cars</h2>
        <ButtonAddCar />
      </div>
    </div>
  );
}
