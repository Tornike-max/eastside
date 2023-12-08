import { useParams } from "react-router-dom";
import CreateNewsForm from "./CreateNewsForm";
import { useGetSingleNews } from "../../hooks/news/useGetSingleNews";
import Loader from "../../ui/Loader";

export default function EditNews() {
  const { editId } = useParams();
  const { news, isNewsPending } = useGetSingleNews(Number(editId));

  if (isNewsPending) return <Loader />;
  if (!news) return;
  const post = news[0];
  return (
    <>
      <CreateNewsForm post={post} />
    </>
  );
}
