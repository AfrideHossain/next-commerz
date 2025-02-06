import { socialLogin } from "@/app/actions/authentication";
import Form from "next/form";

export default function SocialLogin() {
  return (
    <Form action={socialLogin} className="w-full">
      <button
        type="submit"
        name="action"
        value={"google"}
        className="bg-white text-black font-semibold rounded-md p-2 w-full"
      >
        Login with Google
      </button>
    </Form>
  );
}
