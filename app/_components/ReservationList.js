"use client";
import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import toast from "react-hot-toast";
import { deleteReservation } from "../_library/actions";

export default function ReservationList({ bookings }) {
  const [optimisticBooking, updateOptimisticBooking] = useOptimistic(
    bookings,
    (currentBooking, bookingIdToRemove) => {
      return currentBooking.filter(
        (booking) => booking.id !== bookingIdToRemove
      );
    }
  );
  async function handleDelete(bookingId) {
    if (!confirm("Are You Sure To Delete This Reservation")) return;
    try {
      updateOptimisticBooking(bookingId);
      await deleteReservation(bookingId);
      toast.success(`Reservation no ${bookingId} Deleted Successfully`);
    } catch {
      toast.error("Failed To Delete The Reservation");
    }
  }
  return (
    <ul className="space-y-6">
      {optimisticBooking.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
