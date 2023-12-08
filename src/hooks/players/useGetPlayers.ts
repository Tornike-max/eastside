import { useQuery } from "@tanstack/react-query";
import { getPlayers } from "../../services/playersApi";

export function useGetPlayers() {
  const { data: players, isPending: isPlayersLoading } = useQuery({
    queryKey: ["players"],
    queryFn: getPlayers,
  });

  return { players, isPlayersLoading };
}
