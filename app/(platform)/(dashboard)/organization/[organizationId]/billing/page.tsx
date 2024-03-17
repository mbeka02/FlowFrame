import { Separator } from "@/components/ui/separator";
import Info from "../_components/info";
import { Payment } from "./_components/payment";

export default async function Page() {
  return (
    <div className="w-full">
      <Info />
      <Separator className="my-2" />
      <p className="hidden last:block  text-xs text-center  text-muted-foreground ">
        Nothing to see here yet!
      </p>
      <Payment />
    </div>
  );
}
