import { Button } from "@/components/ui/button";
import Logo from "../../../components/logo";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className=" items-center  fixed top-0  shadow-sm  w-full flex py-6 px-4 ">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center">
          <Button size="sm">
            <Link href="/sign-up">Sign Up</Link>
          </Button>
          <Button size="sm">
            <Link href="/sign-in"> Login </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
