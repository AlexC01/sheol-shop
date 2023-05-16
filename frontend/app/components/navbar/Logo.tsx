"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return <Image alt="Logo" width={200} height={100} className="block cursor-pointer" src="/images/logo.png" />;
};

export default Logo;
