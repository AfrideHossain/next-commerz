export default function ServicesSecBox({ icon: Icon, children }) {
  // icon: Icon destructures the icon prop and renames it to Icon, which can now be used as a component.
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-neutral flex justify-center items-center">
          <Icon className="w-10 h-10" />
        </div>
        <h1 className="text-xl md:text-3xl font-semibold text-center">
          {children}
        </h1>
      </div>
    </div>
  );
}
