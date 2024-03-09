"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/lib/schema";
import { Copy, Trash } from "lucide-react";

import { useAction } from "@/hooks/use-action";
import { copyCard } from "@/server-actions/copy-card";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { deleteCard } from "@/server-actions/delete-card";

import { useCardModal } from "@/hooks/use-card-modal";
import { useQueryClient } from "@tanstack/react-query";

export const Actions = ({ data }: { data: CardWithList }) => {
  const params = useParams();
  const cardModal = useCardModal();
  const queryClient = useQueryClient();
  const { exec: execCopy, isLoading: copyLoading } = useAction(copyCard, {
    onSuccess() {
      toast.success(`copied ${data.title}`);
      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id],
      });
    },
    onError(error) {
      toast.error(error);
    },
  });

  const { exec: execDelete, isLoading: deleteLoading } = useAction(deleteCard, {
    onSuccess() {
      toast.success(`deleted ${data.title}`);
      cardModal.onClose();
    },
    onError(error) {
      toast.error(error);
    },
  });

  const handleCopy = () => {
    const boardId = params.boardId as string;
    execCopy({ id: data.id, listId: data.listId, boardId: boardId });
  };

  const handleDelete = () => {
    const boardId = params.boardId as string;
    execDelete({ id: data.id, listId: data.listId, boardId: boardId });
  };
  return (
    <div className="space-y-2 mt-2">
      <p className="text-sm font-semibold">Actions</p>
      <Button
        variant="gray"
        className="w-full justify-start"
        size="inline"
        onClick={handleCopy}
        disabled={copyLoading}
      >
        <Copy className="w-4 h-4 mr-2" />
        Copy
      </Button>
      <Button
        variant="gray"
        className="w-full justify-start"
        size="inline"
        onClick={handleDelete}
        disabled={deleteLoading}
      >
        <Trash className="w-4 h-4 mr-2" />
        Delete
      </Button>
    </div>
  );
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};
