import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment as addCommentApi } from "../../services/newsApi";
import toast from "react-hot-toast";

type CommentType = {
  comment_id: string;
  comment: string;
};

export function useAddComment() {
  const queryClient = useQueryClient();
  const { mutate: addComment, isPending: isAddingComment } = useMutation({
    mutationFn: ({ newObj, id }: { newObj: CommentType; id: number }) =>
      addCommentApi({ newObj, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      toast.success("Comment added successfully");
    },
    onError: () => {
      toast.error("Errow while adding comment");
    },
  });

  return { addComment, isAddingComment };
}
