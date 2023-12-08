import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditPlayer } from "../../services/playersApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type PlayersType = {
  full_name: string;
  position: string;
  jersey_number: number;
  nationality: string;
  height: number;
  weight: number;
  image: any;
};

// type PlayerStats = {
//   matches_played: number;
//   aces: number;
//   spikes: number;
//   digs: number;
//   blocks: number;
//   sets: number;
//   player_id: number | undefined;
// };

export function useEditOrCreatePlayer() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: createEdit, isPending: isWorkingPlayer } = useMutation({
    mutationFn: ({
      player_id,
      newObj,
    }: {
      player_id?: number | undefined;
      newObj?: PlayersType;
    }) => createEditPlayer({ player_id, newObj }),

    onSuccess: (data) => {
      toast.success("Player updated successfully");
      queryClient.invalidateQueries({ queryKey: ["players"] });
      queryClient.invalidateQueries({
        queryKey: ["editPlayer", data.player_id],
      });
      console.log(data);
      navigate("/players");
    },
    onError: () => {
      toast.error("Error while updating players");
    },
  });

  return { createEdit, isWorkingPlayer };
}
