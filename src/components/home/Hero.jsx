import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative w-full h-[90vh] sm:h-screen">
      <div className="w-full h-full flex justify-center md:justify-end">
        <div className="relative w-full h-full">
          {/* Background Image */}
          <Image
            src="/assets/banner4.png"
            alt="Hero Image"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60">
        <div className="w-full h-full flex flex-col justify-center items-center gap-5 px-4 sm:px-12 py-10 text-white">
          <h1 className="uppercase text-center text-7xl md:text-9xl font-medium tracking-wider">
            Jadur <span>Haat</span>
          </h1>
          <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-center">
            Own the Vibe, Rule the Scene.
          </h2>
          <p className="text-lg md:text-xl text-base-content/80">
            Snag epic fashion that screams YOU.
          </p>
          <Link
            href="/products"
            className="btn btn-primary btn-wide rounded-full font-semibold hover:bg-primary/80 transition-colors duration-300"
          >
            Shop Now
          </Link>
          {/* <h2 className="text-lg text-center sm:text-xl lg:text-2xl text-base-content/80 max-w-2xl mx-auto mb-8">
            Own the Vibe, Rule the Scene. Snag epic fashion that screams YOU
          </h2> */}
          {/* <p className="text-sm sm:text-lg max-w-xl">
          At Jadur Hat, fashion isn’t just about clothing — it’s a statement, a
          reflection of who you are. Our mission is to redefine the way you
          express yourself with bold designs, timeless elegance, and unmatched
          comfort.
        </p> */}
        </div>
        <div className="w-20 h-20 rounded-full border flex justify-center items-center absolute bottom-10 left-10">
          <p>Scroll</p>
        </div>
      </div>
    </div>
  );
}
