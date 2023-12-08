import { useQuery } from "@tanstack/react-query";
import { getSingleNews } from "../../services/newsApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast/headless";

export function useGetSingleNews(id: number) {
  const navigate = useNavigate();
  const {
    data: news,
    isPending: isNewsPending,
    error,
  } = useQuery({
    queryFn: () => getSingleNews(id),
    queryKey: ["news", id],
  });
  if (error) {
    navigate("/news");
    toast.error("No news found");
  }

  return { news, isNewsPending };
}
