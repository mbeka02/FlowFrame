"use client";

import { FormInput } from "@/components/form/form-input";
import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/lib/schema";
import { updateCard } from "@/server-actions/update-card";
import { useQueryClient } from "@tanstack/react-query";
import { Layout } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";

export const Header = ({ data }: { data: CardWithList }) => {
  const queryClient = useQueryClient();
  const params = useParams();
  const inputRef = useRef<ElementRef<"input">>(null);
  const [title, setTitle] = useState(data.title);
  const { exec } = useAction(updateCard, {
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id],
      });

      toast.success(`changed title to ${data.title}`);
      setTitle(data.title);
    },
  });
  const handleBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = params.boardId as string;

    if (title === data.title) {
      return;
    }

    exec({ title, boardId, id: data.id });
  };

  return (
    <div className="flex items-start gap-x-3 mb-6 w-full">
      <Layout className="h-5 w-5  mt-1 text-neutral-700" />
      <div className="w-full">
        <form action={handleSubmit}>
          <FormInput
            id="title"
            name="title"
            onBlur={handleBlur}
            ref={inputRef}
            defaultValue={title}
            className="text-neutral-700 bg-transparent  border-transparent relative text-xl font-semibold px-1  -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate"
          />
        </form>
        <p className="text-muted-foreground text-sm">
          in list <span className="underline">{data.list.title}</span>
        </p>
      </div>
    </div>
  );
};

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className="flex items-start gap-x-3 mb-6 w-full">
      <Skeleton className="w-5 h-5 mt-1" />
      <div className="w-full">
        <Skeleton className=" -left-1.5 w-[95%] mb-0.5 " />
      </div>
    </div>
  );
};
