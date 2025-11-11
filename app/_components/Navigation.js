import Link from "next/link";
import {
  HomeIcon,
  UserIcon,
  BuildingOffice2Icon,
  HomeModernIcon,
} from "@heroicons/react/24/outline";
import { auth } from "../_library/auth";
import Image from "next/image";
export default async function Navigation() {
  const session = await auth();
  return (
    <nav className="z-10 text-xl">
      <ul className="decoration-none mt-5 md:mt-0 flex items-end justify-center gap-4 cursor-pointer">
        <li>
          <Link href="/">
            <span className="hidden md:inline hover:text-accent-400 transition-colors">
              Home
            </span>
            <span className="hover:text-accent-400 transition-colors md:hidden">
              {<HomeIcon className="w-5 h-5" />}
            </span>
          </Link>
        </li>
        <li>
          <Link href="/cabins">
            <span className=" hidden md:inline hover:text-accent-400 transition-colors ">
              Cabins
            </span>
            <span className="hover:text-accent-400 transition-colors md:hidden">
              {<HomeModernIcon className="w-5 h-5" />}
            </span>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <span className=" hidden md:inline hover:text-accent-400 transition-colors">
              About
            </span>
            <span className="hover:text-accent-400 transition-colors md:hidden">
              {<BuildingOffice2Icon className="w-5 h-5" />}
            </span>
          </Link>
        </li>
        <li>
          <Link href="/account" className="flex gap-4 items-center">
            <span className=" hidden md:inline hover:text-accent-400 transition-colors">
              Guest Area
            </span>

            <span className="hover:text-accent-400 transition-colors md:hidden">
              {<UserIcon className="w-5 h-5" />}
            </span>
            {session ? (
              <Image
                src={session.user.image}
                alt="Google Image"
                width={30}
                height={30}
                className="rounded-full"
              />
            ) : (
              ""
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
