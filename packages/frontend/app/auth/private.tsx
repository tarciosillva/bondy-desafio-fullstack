"use client";

import useUserStore from "../context/login";
import { useRouter } from "next/navigation";

export default function Private({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { user } = useUserStore();

  if (!user._id) {
    router.push("/");
  }

  return children;
}
