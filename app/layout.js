import Logo from "./components/Logo";
import Navigation from "./components/navigation";
import "./globals.css";
export const metadata = {
  title: "The Wild Oasis",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="flex justify-between items-center p-2">
          <Logo />
          <Navigation></Navigation>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
