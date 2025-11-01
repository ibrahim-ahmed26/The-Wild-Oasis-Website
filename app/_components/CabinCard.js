import { UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

function CabinCard({ cabin }) {
  const {
    id,
    name,
    "max-capacity": maxCapacity,
    "regular-price": regularPrice,
    discount,
    image,
  } = cabin;

  return (
    <div className="flex flex-col md:flex-row border-primary-800 border">
      <div className="relative md:flex-1 w-full">
        <Image
          src={image}
          fill
          alt={`Cabin ${name}`}
          className="flex-1 object-cover rounded-lg border-r hover:scale-105 delay-75 transition-all border-primary-800"
        />
      </div>

      <div className="flex-grow">
        <div className="pt-5 pb-4 px-7 bg-primary-950">
          <h3 className="text-accent-500 font-semibold text-2xl mb-3">
            Cabin {name}
          </h3>

          <div className="flex gap-3 items-center mb-2">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <p className="text-lg text-primary-200">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </p>
          </div>

          <p className="flex gap-3 justify-center md:justify-end items-center md:items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-3xl font-[350]">
                  ${regularPrice - discount}
                </span>
                <span className="line-through font-semibold text-primary-600">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-3xl font-[350]">${regularPrice}</span>
            )}
            <span className="text-primary-200">/ night</span>
          </p>
        </div>

        <div className="bg-primary-950 border-t border-t-primary-800 text-right">
          <Link
            href={`/cabins/${id}`}
            className="border-l border-primary-800 py-4 px-6 inline-block hover:bg-accent-600 transition-all hover:text-primary-900"
          >
            Details & reservation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;
