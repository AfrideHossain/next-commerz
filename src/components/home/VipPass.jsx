import { auth } from "@/auth";
import VipPassBtn from "./VipPassBtn";

export default async function VipPass() {
  // get session
  const session = await auth();

  return (
    <div className="relative p-6 md:p-10 flex flex-row items-center justify-center gap-6 overflow-hidden">
      {/* Text and CTA Section */}
      <div className="relative z-10 bg-black/30 backdrop-blur-lg rounded-2xl p-6 md:p-8 space-y-4 border border-white/10">
        {/* Starry Background Particles */}
        <div className="absolute inset-0 bg-[url('/assets/starry-1.jpg')] opacity-20 bg-cover pointer-events-none"></div>
        {/* Limited Offer Badge */}
        <div className="absolute -top-4 -right-4 bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-full animate-shake-slow shadow-lg">
          Limited Offer!
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold uppercase bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          Elite VIP Pass
        </h1>
        <div className="*:leading-normal">
          <p className="text-lg text-gray-200">
            Only{" "}
            <span className="font-bold text-yellow-300">a few spots left!</span>{" "}
            Grab your exclusive 5% lifetime discount on every purchase before
            they’re gone forever!
          </p>
          <p className="text-md text-gray-300">
            Join <i>thousands</i> of savvy shoppers who’ve already claimed this
            <span className="font-bold text-primary"> no-expiry pass</span>.
            Don’t miss out!
          </p>
          <p className="text-xs text-gray-300">
            <strong className="text-xs">N.B:</strong> For your kind information,
            Our administration has full rights to discontinue or modify this
            offer at any time without prior notice.
          </p>
        </div>
        <p className="text-2xl font-bold text-red-500 animate-pulse">
          Hurry! Offer's valid till 10<sup>th</sup> June, 2025.
        </p>
        <div>
          <VipPassBtn userId={session?.user?.id} />
        </div>
      </div>
    </div>
  );
}
