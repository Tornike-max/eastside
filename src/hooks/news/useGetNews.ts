import { useQuery } from "@tanstack/react-query";
import { getNews } from "../../services/newsApi";

export function useGetNews(curPage: number) {
  const { data: newsData, isPending: isNewsPending } = useQuery({
    queryFn: () => getNews(curPage),
    queryKey: ["news", `page-${curPage}`],
  });

  return { news: newsData?.data, isNewsPending, count: newsData?.count };
}
