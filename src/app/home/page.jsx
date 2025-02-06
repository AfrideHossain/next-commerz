import { auth } from "@/auth";
import LogoutBtn from "@/components/authentication/LogoutBtn";
import Image from "next/image";
import { redirect } from "next/navigation";
export default async function Home() {
  const session = await auth();
  console.log(
    "\x1b[36m%s\x1b[0m",
    "\n\nsession from home route=> ",
    session,
    "\n\n"
  );

  if (!session?.user) redirect("/login");

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <div className="p-8 border border-gray-500 rounded-md space-y-2">
          {session?.user?.image && (
            <div className="flex items-center justify-center my-6">
              <Image
                width={80}
                height={80}
                priority
                src={session?.user?.image}
                alt={session?.user?.name}
                className="rounded-full"
              />
            </div>
          )}
          <h1 className="text-3xl font-bold text-center">
            {session?.user?.name}
          </h1>
          <h3 className="text-xl font-semibold text-center">
            {session?.user?.email}
          </h3>
          <div className="flex justify-center items-center">
            <LogoutBtn />
          </div>
        </div>
      </div>
    </>
  );
}
