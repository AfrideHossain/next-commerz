import SocialLogin from "@/components/authentication/SocialLogin";
import RegistrationForm from "@/components/authentication/RegistrationForm";

export default function Registration() {
  return (
    <>
      <h1 className="text-4xl font-bold">Hello folk! Join us</h1>
      <div className="p-8 border border-gray-500 rounded-md mt-10 space-y-4">
        <RegistrationForm />
        <div className=" flex items-center gap-4">
          <div className="border border-gray-500 flex-grow"></div>
          <p className="font-semibold text-lg text-gray-500">OR</p>
          <div className="border border-gray-500 flex-grow"></div>
        </div>
        <SocialLogin />
      </div>
    </>
  );
}
