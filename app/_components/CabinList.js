import { getCabins } from "@app/_library/data-service";
import CabinCard from "./CabinCard";
export default async function CabinList({ filter }) {
  const cabins = await getCabins();
  if (!cabins.length) return null;
  let displayCabins;
  if (filter === "all") displayCabins = cabins;
  if (filter === "small")
    displayCabins = cabins.filter((cabin) => cabin["max-capacity"] <= 3);
  if (filter === "medium")
    displayCabins = cabins.filter(
      (cabin) => cabin["max-capacity"] >= 4 && cabin["max-capacity"] <= 7
    );
  if (filter === "large")
    displayCabins = cabins.filter((cabin) => cabin["max-capacity"] >= 8);
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
