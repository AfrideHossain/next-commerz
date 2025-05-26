import SocialLogin from "@/components/authentication/SocialLogin";
import RegistrationForm from "@/components/authentication/RegistrationForm";

export default function Registration() {
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
          Unlock Your VIP Access
        </h1>
        <p className="text-center text-zinc-400 mb-6 text-sm sm:text-base">
          Get early access to secret deals, and the stuff that sells out in
          minutes. Your cart’s future self will thank you.
        </p>
        <div className="space-y-4">
          <RegistrationForm />
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
