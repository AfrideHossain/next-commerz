import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-2 text-white">
      <div className="relative w-96 h-96 animate-float">
        <Image
          src="/assets/lost-2.png" // Replace with your image path or use a placeholder
          alt="Lost Astronaut"
          fill
          sizes="100vw"
          className="object-cover scale-125"
          priority
        />
      </div>
      <h1 className="text-5xl md:text-7xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-600 leading-normal">
        Houston, We Lost This Page!
      </h1>
      <p className="text-lg md:text-xl text-gray-300 text-center mb-8 max-w-md">
        Error 404: Looks like this page is floating in the vast void of space.
        Maybe it’s chilling with some aliens? 🚀
      </p>
      <Link
        href="/"
        className="btn btn-wide btn-primary"
      >
        Beam Me Back Home
      </Link>
    </div>
  );
}
