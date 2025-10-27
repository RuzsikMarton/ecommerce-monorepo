import Image from "next/image";
import Link from "next/link";
import SearchBar from "../SearchBar";
import { Home, Bell} from "lucide-react";
import ShoppingCartIcon from "../ShoppingCartIcon";

const Navbar = () => {
  return (
    <nav className="w-full px-4 lg:px-8 xl:px-16 2xl:px-32 relative py-2 md:py-4 border-b border-gray-300 items-center">
      {/* Mobile*/}
      <Link href={"/"} className="flex md:hidden items-center">
        <Image
          src="/logo.png"
          alt="RMDesigns"
          width={42}
          height={42}
          className="w-8 h-8"
        />
      </Link>
      <div className="hidden md:flex justify-between ">
        {/* Left */}
        <Link href={"/"} className="flex items-center">
          <Image
            src="/logo.png"
            alt="RMDesigns"
            width={42}
            height={42}
            className="h-9 w-9"
          />
          <p className="block text-md font-semibold tracking-wider">DESIGNS.</p>
        </Link>
        {/* Right */}
        <div className="flex text-gray-600 gap-6 items-center">
            <SearchBar />
            <Link href={"/"}>
                <Home className="w-4 h-4"/>
            </Link> 
            <Bell className="w-4 h-4"/>
            <ShoppingCartIcon />
            {/* Sign In */}
            <Link href={"/"}>
                Sign In
            </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
