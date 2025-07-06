import Hero from "@/components/home/Hero";
import HomeProducts from "@/components/home/HomeProducts";
import ServicesSec from "@/components/home/ServicesSec";
import VipPass from "@/components/home/VipPass";
import ProductsByTag from "@/components/Products/ProductsByTag";
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
          <h1 className="text-3xl mb-5 font-semibold w-fit px-4 pb-2 border-b-2 border-blue-700">
            New Arrival
          </h1>
          <ProductsByTag tagname={"newArrival"} />
        </div>
        <div>
          <VipPass />
        </div>
        <div>
          <ServicesSec />
        </div>
      </section>
    </>
  );
}
