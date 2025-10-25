import Image from "next/image";
import firstImage from "@/public/about-1.jpg";
import secondImage from "@/public/about-2.jpg";
import Link from "next/link";

export const metadata = {
  title: "About",
};

export default function Page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 lg:gap-x-24 lg:gap-y-32 text-base md:text-lg">
      {/* First Section */}
      <div className="md:col-span-2 lg:col-span-3">
        <h1 className="text-3xl md:text-4xl mb-8 md:mb-10 text-accent-400 font-medium">
          Welcome to The Wild Oasis
        </h1>

        <div className="space-y-6 md:space-y-8">
          <p>
            Where nature&apos;s beauty and comfortable living blend seamlessly.
            Hidden away in the heart of the Italian Dolomites, this is your
            paradise away from home. But it&apos;s not just about the luxury
            cabins. It&apos;s about the experience of reconnecting with nature
            and enjoying simple pleasures with family.
          </p>
          <p>
            Our 8 luxury cabins provide a cozy base, but the real freedom and
            peace you&apos;ll find in the surrounding mountains. Wander through
            lush forests, breathe in the fresh air, and watch the stars twinkle
            above from the warmth of a campfire or your hot tub.
          </p>
          <p>
            This is where memorable moments are made, surrounded by
            nature&apos;s splendor. It&apos;s a place to slow down, relax, and
            feel the joy of being together in a beautiful setting.
          </p>
        </div>
      </div>

      <div className="md:col-span-2 lg:col-span-2 relative aspect-[4/3] md:aspect-square">
        <Image
          src={firstImage}
          fill
          className="object-cover rounded-lg"
          placeholder="blur"
          quality={85}
          alt="Family sitting around a fire pit in front of cabin"
        />
      </div>

      {/* Second Section */}
      <div className="md:col-span-2 lg:col-span-2 relative aspect-[4/3] md:aspect-square">
        <Image
          src={secondImage}
          fill
          className="object-cover rounded-lg"
          placeholder="blur"
          quality={85}
          alt="Family that manages The Wild Oasis"
        />
      </div>

      <div className="md:col-span-2 lg:col-span-3">
        <h1 className="text-3xl md:text-4xl mb-8 md:mb-10 text-accent-400 font-medium">
          Managed by our family since 1962
        </h1>

        <div className="space-y-6 md:space-y-8">
          <p>
            Since 1962, The Wild Oasis has been a cherished family-run retreat.
            Started by our grandparents, this haven has been nurtured with love
            and care, passing down through our family as a testament to our
            dedication to creating a warm, welcoming environment.
          </p>
          <p>
            Over the years, we&apos;ve maintained the essence of The Wild Oasis,
            blending the timeless beauty of the mountains with the personal
            touch only a family business can offer. Here, you&apos;re not just a
            guest; you&apos;re part of our extended family. So join us at The
            Wild Oasis soon, where tradition meets tranquility, and every visit
            is like coming home.
          </p>

          <div>
            <Link
              href="/cabins"
              className="inline-block mt-4 bg-accent-500 px-6 md:px-8 py-4 md:py-5 text-primary-800 text-base md:text-lg font-semibold hover:bg-accent-600 transition-all rounded-lg"
            >
              Explore our luxury cabins
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
