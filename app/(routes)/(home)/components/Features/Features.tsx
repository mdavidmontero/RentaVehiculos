import { Reveal } from "@/components/shared/Reveal";
import { dataFeautures } from "./Features.data";
import { Icon } from "lucide-react";
export function Features() {
  return (
    <div className="max-w-6xl mx-auto lg:py-40">
      <h3 className="text-2xl lg:text-6xl font-bold">Key Features</h3>
      <p className="max-w-lg mt-5 lg:mt-16 text-xl">
        We are all about our client conform and safety. That why provide the
        best service you can Image
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-5">
        {dataFeautures.map(({ icon: Icon, text, bg, delay }) => {
          return (
            <Reveal
              key={text}
              className="p-6 rounded-xl hover:shadow-md flex flex-col items-center"
              position="right"
              delay={delay}
            >
              <div
                className={`rounded-full ${bg} w-fit p-4 mb-4 flex justify-center`}
              >
                <Icon className="w-8 h-8" />
              </div>
              <p className="font-bold text-center text-xl">{text}</p>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
