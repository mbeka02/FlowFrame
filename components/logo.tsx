import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <div className="md:flex items-center gap-x-2 hidden">
        <Image
          alt="logo"
          src="/logo.png"
          width={28}
          height={28}
          className="rounded-sm"
        />
        <span className={cn("text-lg font-semibold  text-neutral-900 ")}>
          FlowFrame
        </span>
      </div>
    </Link>
  );
};

export default Logo;
