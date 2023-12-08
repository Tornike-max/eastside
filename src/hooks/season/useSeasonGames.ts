import { useQuery } from "@tanstack/react-query";
import { getSeasonGames } from "../../services/seasonApi";

export function useSeasonGames() {
  const { data, isPending } = useQuery({
    queryFn: getSeasonGames,
    queryKey: ["season"],
  });

  return { data, isPending };
}
