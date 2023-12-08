import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePlayer as deletePlayerApi } from "../../services/playersApi";
import toast from "react-hot-toast";

export function useDeletePlayer() {
  const queryClient = useQueryClient();
  const { mutate: deletePlayer, isPending: isDeleting } = useMutation({
    mutationFn: (player_id: number) => deletePlayerApi(player_id),
    onSuccess: () => {
      toast.success("Successfully deleted player");
      queryClient.invalidateQueries({ queryKey: ["players"] });
    },
    onError: () => {
      toast.error("Error deleting player");
    },
  });

  return { deletePlayer, isDeleting };
}
