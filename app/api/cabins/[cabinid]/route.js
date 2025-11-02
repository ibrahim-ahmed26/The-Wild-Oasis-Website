import { getBookedDatesByCabinId, getCabin } from "@/app/_library/data-service";

export async function GET(request, { params }) {
  try {
    const [cabins, bookedData] = await Promise.all([
      getCabin(params.cabinid),
      getBookedDatesByCabinId(params.cabinid),
    ]);
    return Response.json({ cabins, bookedData });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "cabin couldn't find " });
  }
}
