"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";

export async function SignIn() {
  await signIn("google", { redirectTo: "/account" });
}
export async function SignOut() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuest(formData) {
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
    throw new Error("Guest could not be updated");
  }
  revalidatePath("/account/profile");
}
