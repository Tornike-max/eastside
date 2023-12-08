import { Button } from "@nextui-org/button";
import { useGetNews } from "../../hooks/news/useGetNews";
import Loader from "../../ui/Loader";
import EachPost from "./EachPost";
import { useSearchParams } from "react-router-dom";
import { MAX_PAGE_NEWS } from "../../constants";

export default function News() {
  const [searchParams, setSearchParams] = useSearchParams();
  const curPage = Number(searchParams.get("page")) || 1;
  const { news, isNewsPending, count } = useGetNews(Number(curPage));

  if (isNewsPending) return <Loader />;

  if (!news)
    return (
      <div className="flex justify-center items-center mt-40">
        <p className="text-stone-200 text-3xl">No News Available</p>
      </div>
    );

  const PAGE_SIZE = count && Math.ceil(count / MAX_PAGE_NEWS);

  function handlePrev(e: React.MouseEvent) {
    e.preventDefault();
    const prev = curPage === 1 ? curPage : curPage - 1;
    searchParams.set("page", String(prev));
    setSearchParams(searchParams);
    console.log(searchParams);
  }

  function handleNext(e: React.MouseEvent) {
    e.preventDefault();
    const next = curPage === PAGE_SIZE ? curPage : curPage + 1;

    searchParams.set("page", String(next));
    setSearchParams(searchParams);
  }

  return (
    <div>
      <div className="grid-container">
        <EachPost news={news} />
      </div>
      <div className="flex justify-between items-center w-full text-stone-200">
        <span>
          {count && count <= MAX_PAGE_NEWS
            ? `Only ${count} posts at this moment`
            : `${count} Posts`}
        </span>
        <div className="flex justify-end items-center gap-1">
          <Button
            onClick={(e) => handlePrev(e)}
            variant="ghost"
            color="secondary"
          >
            Previouse
          </Button>
          <Button
            onClick={(e) => handleNext(e)}
            variant="ghost"
            color="secondary"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
