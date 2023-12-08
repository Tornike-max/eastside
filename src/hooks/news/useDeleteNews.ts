import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNewsApi } from "../../services/newsApi";
import toast from "react-hot-toast";

export function useDeleteNews() {
  const queryClient = useQueryClient();
  const { mutate: deleteNews, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => deleteNewsApi(id),
    onSuccess: () => {
      toast.success("News deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
    onError: () => {
      toast.error("Error while deleting news");
    },
  });

  return { isDeleting, deleteNews };
}
