import { socialLogin } from "@/app/actions/authentication";
import Form from "next/form";

export default function SocialLogin() {
  return (
    <Form action={socialLogin} className="w-full">
      <button
        type="submit"
        name="action"
        value={"google"}
        className="w-full btn bg-white text-black font-semibold hover:bg-zinc-200 transition"
      >
        Continue with Google
      </button>
    </Form>
  );
}
