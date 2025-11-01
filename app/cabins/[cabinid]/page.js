import CabinDetails from "@/app/_components/CabinDetails";
import Reservations from "@/app/_components/Reservations";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_library/data-service";
import { Suspense } from "react";
export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinid);
  return { title: `Cabin ${name}` };
}
export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({
    cabinid: String(cabin.id),
  }));
  return ids;
}
export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinid);
  const { name } = cabin;

  return (
    <div className="max-w-7xl mx-auto mt-8">
      <CabinDetails cabin={cabin} />
      <div>
        <h2 className="md:text-5xl text-2xl font-semibold text-center mb-4 text-accent-400 animate-pulse">
          Reserve Cabin {name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservations cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
