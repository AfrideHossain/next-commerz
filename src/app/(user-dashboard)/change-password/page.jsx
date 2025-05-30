import { auth } from "@/auth";
import ChangePasswordForm from "@/components/changePassword/ChangePasswordForm";
import { redirect } from "next/navigation";

export default async function ChangePasswordPage() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="md:min-h-screen w-full px-2 flex justify-center">
      <ChangePasswordForm />
    </div>
  );
}
