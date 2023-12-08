import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditPlayer } from "../../services/playersApi";
import toast from "react-hot-toast";

type PlayersType = {
  full_name: string;
  position: string;
  jersey_number: number;
  nationality: string;
  height: number;
  weight: number;
  image: any;
};
export function useCreatePlayer() {
  const queryClient = useQueryClient();
  const { data: createPlayer, isPending: isPlayerCreation } = useMutation({
    mutationFn: (newObj: PlayersType) => createEditPlayer({ newObj }),
    onSuccess: () => {
      toast.success("Player Successfully added");
      queryClient.invalidateQueries({ queryKey: ["players"] });
    },
    onError: () => {
      toast.error("Error while adding player");
    },
  });

  return { isPlayerCreation, createPlayer };
}
