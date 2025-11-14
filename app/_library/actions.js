"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { redirect } from "next/navigation";

export async function SignIn() {
  await signIn("google", { redirectTo: "/account" });
}
export async function SignOut() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuest(prevState, formData) {
  const session = await auth();
  if (!session) throw new Error("User Must Be Signed In First");
  const nationalID = formData.get("national_id");
  const regex = /^\d{6,14}$/;
  if (!regex.test(nationalID)) throw new Error("Invalid NationalId");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  const updateData = {
    national_id: nationalID,
    nationality,
    country_flag: countryFlag,
  };
  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) {
    return { error: false, message: "Guest could not be updated" };
  }
  revalidatePath("/account/profile");
  return { success: true, message: "Profile Updated Successfully" };
}
export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("User Must Sign In first");
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId)
    .eq("guestsId", session.user.guestId);

  if (error) throw new Error("Booking could not be deleted");
  revalidatePath("/account/reservations");
}
export async function createBooking(addtionalData, formData) {
  const session = await auth();
  if (!session) throw new Error("User Must Sign In first");
  const { startDate, endDate, numNights, cabinPrice, cabinId } = addtionalData;
  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");
  const guestId = session.user.guestId;
  const newBooking = {
    "start-date": startDate,
    "end-date": endDate,
    "num-nights": numNights,
    "total-price": cabinPrice,
    "cabin-price": cabinPrice,
    "extras-price": 0,
    status: "unconfirmed",
    "has-breakfast": false,
    "is-paid": false,
    observations,
    cabinId,
    "num-guests": Number(numGuests),
    guestsId: guestId,
  };
  console.log(newBooking);
  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    throw new Error("Booking could not be created");
  }
  revalidatePath(`/cabins/${cabinId}`);
  redirect("/thankyou");
}
export async function getSingleBooking(reservationId) {
  const session = await auth();
  if (!session) throw new Error("User Must Sign In first");
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins( max-capacity)")
    .eq("id", reservationId)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not get loaded");
  }
  return data;
}
export async function updateReservation(formData) {
  const session = await auth();
  if (!session) throw new Error("User Must Sign In first");
  const reservationId = formData.get("reservationId");
  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");
  const updatedFields = { "num-guests": numGuests, observations };
  const { error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", reservationId)
    .single();
  if (error) {
    throw new Error("Booking could not get loaded");
  }
  revalidatePath(`account/reservations/${reservationId}`);
  redirect("/account/reservations");
}
