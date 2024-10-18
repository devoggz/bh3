"use client";
// pages/poll.tsx

import { useState } from "react";
import Poll from "@/components/Poll";
import { ToastContainer } from "react-toastify";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const PollPage = () => {
  const router = useRouter();
  const [points, setPoints] = useState(0);

  const handleVote = (pointsToAdd: number) => {
    setPoints((prevPoints) => prevPoints + pointsToAdd);
  };

  return (
    <div className="container-fluid mx-auto h-screen p-6 mb-16 bg-gradient-to-r from-slate-50 from-10% via-sky-50 via-30% to-emerald-50 to-90%">
      <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded-tl-xl rounded-tr-xl p-6 mb-6 text-center font-bold text-2xl text-white">
        {" "}
        Sauti zivume
        <p className="text-sm text-white font-normal">Toa maoni yako</p>
      </div>
      <div className="flex flex-col gap-6 mb-12 ">
        {" "}
        <Poll
          question="Je, Wanaboda wanapewa heshima vile inavyostahili?"
          onVote={handleVote}
        />
        <p className="bg-emerald-200/50 rounded-xl my-4 p-2 font-bold text-3xl text-bhpink text-center">
          +{points} points
        </p>
        <ToastContainer />
      </div>

      <Button
        className="w-full"
        variant="ghost"
        onClick={() => router.push("/tasks")}
      >
        Return to Tasks
      </Button>
    </div>
  );
};

export default PollPage;
