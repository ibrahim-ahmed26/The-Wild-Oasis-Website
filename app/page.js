import Link from "next/link";
import Image from "next/image";
import bg from "@/public/bg.png";
export default function Page() {
  return (
    <main className="mt-24">
      <Image
        src={bg}
        quality={80}
        fill
        placeholder="blur"
        alt="Mountains and forests with two cabins"
      />
      <div className="relative z-10 text-center">
        <h1 className="text-2xl lg:text-8xl text-primary-50 mb-10  animate-pulse tracking-tight font-normal">
          Welcome To Paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 md:px-8 md:py-6 px-4 py-3 text-primary-800 sm:text-base md:text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
