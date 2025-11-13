"use client";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
  startOfDay,
  parseISO,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useEffect, useCallback, useMemo } from "react";
import { useReservation } from "./ReservationsProvider";

// Helper: check if selected range overlaps booked dates
function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ settings, cabin, bookedDates }) {
  const { range, setRange, resetRange } = useReservation();

  // Normalize booked dates - convert strings to Date objects and strip time
  const normalizedBookedDates = useMemo(() => {
    if (!bookedDates?.length) return [];
    return bookedDates.map((date) => {
      const dateObj = typeof date === "string" ? parseISO(date) : date;
      return startOfDay(dateObj);
    });
  }, [bookedDates]);

  // If the selected range overlaps booked dates after data loads, clear it
  useEffect(() => {
    if (isAlreadyBooked(range, normalizedBookedDates)) {
      resetRange();
    }
  }, [bookedDates, normalizedBookedDates, range, resetRange]);

  // Displayed range (avoid showing invalid selection)
  const displayRange = isAlreadyBooked(range, normalizedBookedDates)
    ? {}
    : range;

  const { "regular-price": regularPrice, discount } = cabin;
  const numNights = displayRange?.to
    ? differenceInDays(displayRange.to, displayRange.from)
    : 0;
  const cabinPrice = numNights * (regularPrice - discount);

  const { minBookingLength, maxBookingLength } = settings;

  // Check if a date should be disabled
  const isDateDisabled = useCallback(
    (currentDate) => {
      const normalizedCurrent = startOfDay(currentDate);
      const today = startOfDay(new Date());

      // Disable dates before today
      if (normalizedCurrent < today) return true;

      // Disable already booked dates
      if (
        normalizedBookedDates.some((day) => isSameDay(day, normalizedCurrent))
      ) {
        return true;
      }

      // Disable dates that would conflict with booked dates in the range
      if (range?.from && !range?.to) {
        const normalizedFrom = startOfDay(range.from);

        // When only 'from' is selected, check if selecting this date would overlap with bookings
        const potentialStart =
          normalizedFrom < normalizedCurrent
            ? normalizedFrom
            : normalizedCurrent;
        const potentialEnd =
          normalizedFrom < normalizedCurrent
            ? normalizedCurrent
            : normalizedFrom;

        // Check if any booked date falls between the potential range (exclusive of endpoints)
        const hasBookingInBetween = normalizedBookedDates.some(
          (bookedDate) =>
            bookedDate > potentialStart && bookedDate < potentialEnd
        );

        if (hasBookingInBetween) {
          return true;
        }
      }

      return false;
    },
    [range, normalizedBookedDates]
  );

  // Handle date selection logic
  const handleSelect = (newRange) => {
    // If user clicks after completing a range, reset first
    if (range?.from && range?.to) {
      setRange({ from: undefined, to: undefined });
      setTimeout(() => {
        setRange(newRange);
      }, 0);
      return;
    }
    setRange(newRange);
  };

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        classNames={{
          months: "flex flex-col sm:flex-row gap-8",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-lg font-medium",
          nav: "space-x-1 flex items-center",
          nav_button:
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 transition-opacity",
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell:
            "text-primary-800 rounded-md w-9 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent-500 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: "h-9 w-9 p-0 font-normal hover:bg-accent-500 hover:text-primary-900 rounded-md transition-colors aria-selected:opacity-100",
          day_selected:
            "bg-accent-500 text-primary-900 hover:bg-accent-500 hover:text-primary-900 focus:bg-accent-500 focus:text-primary-900",
          day_today: "bg-accent-100 text-primary-950 font-semibold",
          day_outside: "text-primary-500 opacity-50",
          day_disabled: "text-primary-500 opacity-50 cursor-not-allowed",
          day_range_middle:
            "aria-selected:bg-accent-300 aria-selected:text-primary-900",
          day_hidden: "invisible",
        }}
        mode="range"
        onSelect={handleSelect}
        selected={displayRange}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={isDateDisabled}
      />

      {/* Price summary section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 px-6 sm:px-8 py-4 sm:py-0 bg-accent-500 text-primary-800 min-h-[72px] rounded-b-lg sm:rounded-none">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl font-semibold">
                  ${regularPrice - discount}
                </span>
                <span className="line-through font-semibold text-primary-700 text-lg">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl font-semibold">${regularPrice}</span>
            )}
            <span className="text-sm text-primary-700">/night</span>
          </p>

          {numNights > 0 && (
            <>
              <p className="bg-accent-600 px-3 py-2 text-xl rounded-md font-semibold shadow-sm">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wide text-primary-700">
                  Total
                </span>
                <span className="text-2xl font-bold text-primary-900">
                  ${cabinPrice}
                </span>
              </p>
            </>
          )}
        </div>

        {(range?.from || range?.to) && (
          <button
            className="border-2 border-primary-800 rounded-lg px-5 py-2 text-sm font-semibold hover:bg-primary-800 hover:text-accent-50 transition-all duration-200 active:scale-95 shadow-sm"
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
