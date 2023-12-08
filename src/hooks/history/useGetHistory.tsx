import { useQuery } from "@tanstack/react-query";
import { getClubHistory } from "../../services/historyApi";

export function useGetHistory() {
  const { data, isPending } = useQuery({
    queryFn: getClubHistory,
    queryKey: ["clubHistory"],
  });

  return { data, isPending };
}
