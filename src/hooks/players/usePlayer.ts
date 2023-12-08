import { useQuery } from "@tanstack/react-query";
import { getPlayer } from "../../services/playersApi";

export function usePlayer(player_id: number) {
  const { data: player, isPending: isPlayerLoading } = useQuery({
    queryKey: ["editPlayer", player_id],
    queryFn: () => getPlayer(player_id),
  });

  return { player, isPlayerLoading };
}
