import {
  getCabin,
  getSettings,
  getBookedDatesByCabinId,
} from "../_library/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

export default async function Reservations({ cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-4  min-h-[400px] px-4 py-2 border border-primary-800">
      <DateSelector settings={settings} bookedDates={bookedDates} />
      <ReservationForm cabin={cabin} />
    </div>
  );
}
