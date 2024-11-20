"use client";

import Image from "next/image";
import Private from "../auth/private";
import useUserStore from "../context/login";

export default function Welcome() {
  const { user } = useUserStore();
  return (
    <Private>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-10">
        <div className="flex justify-center items-center">
          <Image
            src={"/logo-bondy.png"}
            width={500}
            height={170}
            alt="bondy-logo"
            priority
          />
        </div>
        <div>
          <h1 className="text-gray-500 text-2xl">
            Seja bem vindo {user.name}! 👋
          </h1>
        </div>
      </div>
    </Private>
  );
}
