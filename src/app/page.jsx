import Hero from "@/components/home/Hero";
import HomeProducts from "@/components/home/HomeProducts";
import ServicesSec from "@/components/home/ServicesSec";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="relative">
        <Hero />
      </div>
      <section className="container mx-auto space-y-20 py-20">
        <div>
          <HomeProducts />
        </div>
        <div>
          <ServicesSec />
        </div>
      </section>
    </>
  );
}
