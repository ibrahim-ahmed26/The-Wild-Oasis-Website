"use client";

import Image from "next/image";
import { updateGuest } from "../_library/actions";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
const initialState = { success: null, message: null };
export default function UpdateForm({ children, guest }) {
  const { full_name, email, national_id, country_flag: countryFlag } = guest;
  const [state, formAction] = useFormState(updateGuest, initialState);
  useEffect(
    function () {
      if (state.message) {
        state.success
          ? toast.success(state.message)
          : toast.error("Profile Didn't Updated Correctly");
      }
    },
    [state]
  );
  return (
    <form
      action={formAction}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          defaultValue={full_name}
          name="full_name"
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          defaultValue={email}
          name="email"
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <Image
            src={countryFlag}
            width={40}
            height={40}
            alt="Country flag"
            className="h-5 rounded-sm"
          />
        </div>
      </div>
      {children}
      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          defaultValue={national_id}
          name="national_id"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <Button />
      </div>
    </form>
  );
}
function Button() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    >
      {pending ? "Updating...." : "Update profile"}
    </button>
  );
}
