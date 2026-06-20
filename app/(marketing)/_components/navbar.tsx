import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 flex h-14 w-full items-center border-b bg-white px-4 shadow-sm">
      <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Logo />
          <span className="text-lg font-semibold tracking-tight text-foreground">
            FlowFrame
          </span>
        </div>
        <div className="flex items-center gap-x-2">
          <Link href="/sign-in">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button variant="amber" size="sm">
              Get started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
