"use client";
import { useState } from "react";

export default function Counter({ users }) {
  const [count, setCount] = useState(0);
  console.log(users);
  return (
    <button
      onClick={() => setCount((c) => c + 1)}
      className="bg-slate-700 p-4 text-white rounded-lg"
    >
      {count}
    </button>
  );
}
