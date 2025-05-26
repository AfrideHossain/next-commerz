import LoginForm from "@/components/authentication/LoginForm";
import SocialLogin from "@/components/authentication/SocialLogin";
import Image from "next/image";

export default function Login() {
  return (
    <>
      <div className="w-full md:w-xl border border-neutral bg-base-300/50 p-6 sm:p-8 rounded-2xl shadow-2xl">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="h-18 w-18 rounded-full overflow-hidden flex justify-center items-center">
            <div className="relative w-full h-full">
              <Image
                src={"/assets/logo/logo-variant-3.png"}
                fill
                priority
                sizes="50vw"
                alt="Jadur Haat logo variant 3"
                className="object-cover scale-125"
              />
            </div>
          </div>
        </div>
        {/* Headings */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">
          Welcome Back, Legend!
        </h1>
        <p className="text-center text-zinc-400 mb-6 text-sm sm:text-base">
          Let’s not leave good stuff behind. Sign in and grab it now.
        </p>
        <div className="space-y-4">
          <LoginForm />
          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-zinc-700"></div>
            <span className="px-3 text-zinc-400 text-sm">or</span>
            <div className="flex-grow border-t border-zinc-700"></div>
          </div>
          <SocialLogin />
        </div>
      </div>
    </>
  );
}
