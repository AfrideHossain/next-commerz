import Link from "next/link";

export default function AboutPage() {
  return (
    <section className="container min-h-screen p-4 flex flex-col justify-center items-center gap-4 mx-auto">
      <h1 className="md:text-3xl text-xl text-center font-semibold mb-4 leading-0 pt-4 md:pt-0">
        About Jadur Haat
      </h1>
      <div className="w-full md:w-5xl mx-auto">
        <p>
          Jadur Haat is an exhilarating e-commerce fashion emporium,
          meticulously crafted for the audacious, style-savvy souls aged 14 to
          40 who yearn to weave their essence into every thread they wear.
          Infused with contemporary opulence, refined elegance, and a daringly
          confident “franky” spirit, Jadur Haat curates exquisite,
          trend-defining collections that embolden every individual to shine as
          the architect of their own iconic identity. Rooted in trust, serenity,
          and unparalleled sophistication, our brand delivers a transcendent
          shopping odyssey that reverberates with the vibrant pulse of
          Bangladesh and the broader South Asian tapestry.
        </p>
        <br />
        <p>
          Each garment in our repertoire is a masterpiece, thoughtfully selected
          to dance at the intersection of cutting-edge trends and timeless
          allure, catering to a kaleidoscope of tastes seeking bold, versatile,
          and statement-making styles. From the effortlessly chic allure of
          streetwear to the poised grandeur of formal attire and the everyday
          elegance of essentials, Jadur Haat ensures every wearer radiates
          confidence and distinction. Our clarion call, “Own the Vibe, Rule the
          Scene,” is an invitation to embrace fearless individuality, while our
          promise to “Snag epic fashion that screams YOU” ignites a movement of
          self-expression.
        </p>
        <br />
        <p>
          Jadur Haat is more than a fashion brand—it is a cultural renaissance,
          a celebration of quality, accessibility, and resonance with the
          spirited South Asian ethos. We empower our community to redefine style
          with audacity and flair, beckoning every customer to seize their
          moment, embody their unique vibe, and reign supreme in their sartorial
          scene.
        </p>
      </div>
      <div>
        <Link href={"/products"} className="btn btn-primary">
          Shop Now
        </Link>
      </div>
    </section>
  );
}
