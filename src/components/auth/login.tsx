"use client";

import { Link } from "@nextui-org/react";
import LoginForm from "./login-form";
import { useRouter } from "next/navigation";

export default function Login({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <div className="h-screen mb-12 flex flex-col items-center justify-center  px-2 space-y-4 ">
      <div className="flex items-center justify-center mt-6">
        {/* <Image src="/images/auth.jpeg" alt="welcome" height={240} /> */}
      </div>
      <div className="m-auto w-full max-w-[430px] rounded-lg border border-gray-200 bg-white p-6 pt-9 sm:p-12">
        <div className="mb-6">
          <h2 className="  text-2xl font-bold titlecase leading-[48px] ">
            Login/Ingia
          </h2>
        </div>
        <LoginForm />
        <div className=" mb-2">
          <p className="text-center text-small">
            Hauna akaunti? {""}
            <Link
              className="cursor-pointer font-bold text-emerald-500"
              size="sm"
              onPress={() => router.replace("/register")}
            >
              Sajili/ Tengeneza akaunti yako
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
