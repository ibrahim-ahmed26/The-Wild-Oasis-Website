"use client";
import { TrashIcon } from "@heroicons/react/24/solid";
import { deleteReservation } from "../_library/actions";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";
import toast from "react-hot-toast";

function DeleteReservation({ bookingId }) {
  const [isPending, startTransition] = useTransition();
  function handleDelte() {
    if (!confirm("Are You Sure To Delete This Reservation")) return;
    startTransition(async () => {
      try {
        await deleteReservation(bookingId);
        toast.success(`Reservation no ${bookingId} Deleted Successfully`);
      } catch {
        toast.error("Failed To Delete The Reservation");
      }
    });
  }
  return (
    <button
      onClick={handleDelte}
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
    >
      {!isPending ? (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      ) : (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      )}
    </button>
  );
}

export default DeleteReservation;
