import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="mt-16 flex flex-col items-center gap-8 md:flex-row md:justify-between md:gap-0 md:items-start bg-footer p-8 text-white/60">
      <div className="flex flex-col gap-4 items-center md:items-start">
        <Link href={"/"} className="flex items-center">
          <Image src="/logo2.png" alt="RMDesigns" width={36} height={36} />
          <p className="hidden md:block text-md font-medium tracking-wider text-amber-50">
            MRDESIGNS.
          </p>
        </Link>
        <p className="text-sm">© 2025 RMDesigns</p>
        <p className="text-sm">All rights reserved</p>
      </div>
      <div className="flex flex-col gap-4 text-sm items-center md:items-start">
        <p className="text-amber-50">Links</p>
        <Link href={"/"}>Home</Link>
        <Link href={"/"}>Terms of Service</Link>
        <Link href={"/"}>Privacy Policy</Link>
      </div>
      <div className="flex flex-col gap-4 text-sm items-center md:items-start">
        <p className="text-amber-50">Products</p>
        <Link href={"/"}>All Products</Link>
        <Link href={"/"}>New Arrivals</Link>
        <Link href={"/"}>Sale</Link>
      </div>
      <div className="flex flex-col gap-4 text-sm items-center md:items-start">
        <p className="text-amber-50">Information</p>
        <Link href={"/"}>About</Link>
        <Link href={"/"}>Contact</Link>
      </div>
    </div>
  );
};

export default Footer;
