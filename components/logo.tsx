import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        alt="logo"
        src="/logo.png"
        width={28}
        height={28}
        className="rounded-sm"
      />
    </Link>
  );
};

export default Logo;
