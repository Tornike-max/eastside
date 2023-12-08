import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveNews } from "../../services/newsApi";
import toast from "react-hot-toast";

type SaveType = {
  newObj: object;
  id: number;
};

export function useSaveNews() {
  const queryClient = useQueryClient();
  const { mutate: save, isPending: isSaving } = useMutation({
    mutationFn: ({ newObj, id }: { newObj: SaveType; id: number }) =>
      saveNews({ newObj, id }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      toast.success("Post successfully saved");
    },
    onError: () => {
      toast.error("Post failed while saving");
    },
  });

  return { save, isSaving };
}
