"use client";
import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();
const initalState = { from: undefined, to: undefined };
function ReservationsProvider({ children }) {
  const [range, setRange] = useState(initalState);
  function resetRange() {
    setRange(initalState);
  }
  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}
function useReservation() {
  const context = useContext(ReservationContext);
  if (context === "undefined")
    throw new Error("Provider Used Outside the tree");
  return context;
}

export { useReservation, ReservationsProvider };
