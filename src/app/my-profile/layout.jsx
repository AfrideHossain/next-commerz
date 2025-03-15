import UserPanelMenu from "@/components/Users/UserPanelMenu";

export default function MyProfileLayout({ children }) {
  return (
    <>
      <section className="min-h-screen flex">
        <div className="min-h-screen pt-6">
          <UserPanelMenu />
        </div>
        <div className="p-6 w-full">{children}</div>
      </section>
    </>
  );
}
