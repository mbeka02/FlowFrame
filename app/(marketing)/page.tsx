import { Medal } from "lucide-react";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Page() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center flex-col">
        <div className="bg-amber-100 hidden text-amber-600 uppercase mb-4  rounded-full shadow-sm p-4 gap-2 items-center border ">
          <Medal className="h-6 w-6 mr-2" />
          The No 1. Task Management App
        </div>

        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
          FlowFrame helps teams move!
        </h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-amber-600 to-amber-300 text-white px-4 p-2 rounded-md  pb-4  w-fit">
          Simplify tasks
        </div>
      </div>
      <div className="text-small md:text-xl mt-4 text-neutral-600 max-w-xs md:max-w-2xl mx-auto text-center">
        Collaborate , manage projects and attain your productivity goals. From
        high rises to the home office , the way your team works is unique
        -accomplish it all with FlowFrame
      </div>
    </div>
  );
}
