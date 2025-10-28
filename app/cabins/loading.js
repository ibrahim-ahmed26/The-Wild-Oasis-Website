import React from "react";
import Spinner from "@app/_components/Spinner";

export default function loading() {
  return (
    <div className="grid grid-cols-1 items-center justify-center gap-2">
      <Spinner />
      <p className="text-3xl animate-pulse text-center text-accent-400">
        Loading Cabins Data...
      </p>
    </div>
  );
}
