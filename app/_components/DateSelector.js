"use client";
import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationsProvider";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ cabin, settings, bookedDates }) {
  const { range, setRange, resetRange } = useReservation();
  const { "regular-price": regularPrice, discount } = cabin;
  const displayedRange = isAlreadyBooked(range, bookedDates) ? {} : range;
  const numNights = differenceInDays(range.to, range.from);
  const cabinPrice = numNights * (regularPrice - discount);
  // SETTINGS
  const {
    "minimum-booking-length": minBookingLength,
    "max-booking-length": maxBookingLength,
  } = settings;
  return (
    <div className="flex flex-col items-center justify-between order-12 md:order-1 ">
      <DayPicker
        className="pt-12 place-self-center"
        classNames={{
          months: "flex-col flex lg:flex-row lg:gap-4",
          month: "lg:space-y-4",
        }}
        mode="range"
        disabled={(curdates) =>
          isPast(curdates) ||
          bookedDates.some((day) => isSameDay(day, curdates))
        }
        min={minBookingLength + 1}
        max={maxBookingLength}
        startMonth={new Date()}
        animate
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        onSelect={setRange}
        selected={displayedRange}
      />
      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {(range?.from || range?.to) && (
          <button
            className="border border-primary-800 rounded-lg ml-4 hover:text-accent-100 transition-colors py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

export default DateSelector;
