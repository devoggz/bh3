"use client";

import Login from "@/components/auth/login";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Image, Link } from "@nextui-org/react";
import { LoginButton } from "@/components/auth/login-button";

export default function App() {
  const router = useRouter();
  return (
    <div className="container flex flex-col gap-4 items-center justify-center align-middle p-2">
      <Image
        isZoomed
        src="/images/home.png"
        alt="welcome"
        height={400}
        className="w-full object-cover"
      />
      <div className="flex flex-col p-4 items-center justify-center   ">
        <h2
          className="text-6xl font-bold p-4 text-bhgreen 
            animate-text"
        >
          BodaHub
        </h2>
        <p className="text-slate-500 text-wrap font-bold text-sm text-center">
          Tujengane kama wanaboda wa Kenya
        </p>
        <p className="text-lg font-semibold text-bhpink">Tuchanuane Tuinuane</p>
      </div>
      <Button
        onClick={() => router.push("/login")}
        className="bg-bhgreen rounded-full"
        size="lg"
      >
        Jiunge sasa
      </Button>
    </div>
  );
}
