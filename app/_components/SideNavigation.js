"use client";
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-6 w-6 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-6 w-6 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-6 w-6 text-primary-600" />,
  },
];

function SideNavigation() {
  const pathName = usePathname();
  return (
    <nav
      className="
        fixed bottom-0 left-0 right-0 border-t border-primary-900
        md:static md:border-t-0 md:border-r 
      "
    >
      <ul
        className="
          flex justify-around md:justify-start 
          md:flex-col 
          items-center md:items-stretch 
          gap-1 md:gap-2 
          text-sm md:text-lg 
          h-full
        "
      >
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className={` 
                flex flex-col md:flex-row 
                items-center justify-center md:justify-start 
                gap-1 md:gap-4 
                py-2 md:py-3 
                px-3 md:px-5 
                hover:bg-primary-900 hover:text-primary-100 
                transition-colors 
                font-medium md:font-semibold text-primary-200
                ${pathName === link.href ? "bg-primary-900" : ""}
                `}
            >
              {link.icon}
              <span className="hidden md:inline-block text-xs md:text-base">
                {link.name}
              </span>
            </Link>
          </li>
        ))}

        <li className="md:block mt-auto">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
