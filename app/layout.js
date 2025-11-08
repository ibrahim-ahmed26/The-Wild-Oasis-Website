import Header from "@app/_components/Header";
import "@app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import { ReservationsProvider } from "./_components/ReservationsProvider";
import { Toaster } from "react-hot-toast";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});
export const metadata = {
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description:
    "The Wild Oasis is a luxury cabin booking app built with Next.js 14, React Server Components, and Supabase. Guests can explore cabins and make bookings, while staff manage reservations and guests from a secure dashboard.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${josefin.className} bg-primary-950 text-primary-100  min-h-dvh `}
      >
        <div className="flex flex-col  min-h-dvh">
          <Header />
          <div className="flex-1 px-4 py-4 grid">
            <main className="w-full">
              <ReservationsProvider>{children}</ReservationsProvider>
            </main>
          </div>
        </div>
        <Toaster
          position={"top-center"}
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: "#333",
              color: "#fff",
              borderRadius: "8px",
              fontSize: "0.95rem",
            },
            success: {
              iconTheme: {
                primary: "#4ade80", // green-400
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#f87171", // red-400
                secondary: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
