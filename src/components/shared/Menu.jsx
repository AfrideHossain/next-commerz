import { cn } from "@/utils/cn";
import Link from "next/link";

const pubilc_links = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Products",
    path: "/products",
  },
];
export default function Menu({ className }) {
  return (
    <>
      <ul className={cn(className)}>
        {pubilc_links.map((link) => (
          <li key={link.title}>
            <Link href={link.path} className="font-medium">
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
