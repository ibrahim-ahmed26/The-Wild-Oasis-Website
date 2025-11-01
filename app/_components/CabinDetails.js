import {
  EyeSlashIcon,
  MapPinIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import TextExpander from "./TextExpander";
import Image from "next/image";

export default function CabinDetails({ cabin }) {
  const { name, image, description, "max-capacity": maxCapacity } = cabin;
  return (
    <div className="grid grid-cols-1 md:grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
      <div className="relative h-[300px] md:h-full w-full translate-x-0 md:translate-x-3">
        <Image
          fill
          className="object-cover"
          src={image}
          alt={`Cabin ${name}`}
        />
      </div>

      <div>
        <h3 className="text-accent-100 animate-pulse font-black text-4xl md:text-7xl mb-5 translate-y-[-385px] md:translate-y-0 md:translate-x-[-254px] bg-primary-950 p-6 pb-1 w-[110%] md:w-[150%]">
          Cabin {name}
        </h3>

        <p className="text-lg text-primary-300 mb-10">
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className="flex flex-col gap-4 mb-7">
          <li className="flex gap-3 items-center">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <MapPinIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <EyeSlashIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
