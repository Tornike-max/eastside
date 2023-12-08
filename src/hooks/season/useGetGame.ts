import { useQuery } from "@tanstack/react-query";
import { getSeasonGame } from "../../services/seasonApi";

export function useGetGame(id: number) {
  const { data: match, isPending: isMatchLoading } = useQuery({
    queryKey: ["season", id],
    queryFn: () => getSeasonGame(id),
  });

  return { match, isMatchLoading };
}
