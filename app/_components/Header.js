import Logo from "./Logo";
import Navigation from "./navigation.js";

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b-2 px-4  border-accent-400 py-5">
      <Logo />
      <Navigation />
    </header>
  );
}
