import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function DriveToday() {
  return (
    <div className="p-6 lg:my-32 max-w-7xl mx-auto">
      <div className="bg-[url('/images/background-2.jpg')] bg-center bg-no-repeat bg-cover roundex-xl p-6 lg:p-32 relative">
        <div className="lg:flex gap-x-6">
          <div>
            <h3 className="text-4xl text-white">Drive yyour dream car Today</h3>
            <p className="text-white text-xl my-5">
              Register and explore the world of premium car
            </p>
            <Link href="/sign-in">
              <Button variant="outline" size="lg">
                Register here
              </Button>
            </Link>
          </div>
          <Reveal className="lg:absolute lg:-right-32 top-5" position="botton">
            <Image
              src="/images/audi.png"
              alt="car drive"
              width={500}
              height={250}
            />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
