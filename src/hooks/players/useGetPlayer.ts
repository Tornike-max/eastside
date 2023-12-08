import { useQuery } from "@tanstack/react-query";
import { getPlayer } from "../../services/playersApi";

export function useGetPlayer(player_id: number) {
  const { data: player, isPending: isPlayerLoading } = useQuery({
    queryKey: ["players", player_id],
    queryFn: () => getPlayer(player_id),
  });

  return { isPlayerLoading, player };
}
