import Header from "@app/_components/Header";
import "@app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import { ReservationsProvider } from "./_components/ReservationsProvider";
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
      </body>
    </html>
  );
}
