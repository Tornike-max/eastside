import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleNews } from "../hooks/news/useGetSingleNews";
import Loader from "../ui/Loader";
import { getDate } from "../ui/getDate";
import {
  HiOutlineClock,
  HiOutlineMinus,
  HiOutlinePlus,
  HiOutlineUser,
  HiOutlineBookmarkSlash,
  HiBookmark,
  HiOutlinePencil,
} from "react-icons/hi2";
import { LuFacebook, LuInstagram } from "react-icons/lu";

import { useState } from "react";
import { Button } from "@nextui-org/react";
import { useAddComment } from "../hooks/news/useAddComment";
import { useSaveNews } from "../hooks/news/useSaveNews";
import { useUser } from "../hooks/users/useUser";

export default function NewsReview() {
  const navigate = useNavigate();
  const { authenticated } = useUser();
  const [size, setSize] = useState(1);
  const [commentValue, setCommentValue] = useState("");
  const { newsId } = useParams();
  const { news, isNewsPending } = useGetSingleNews(Number(newsId));
  const { addComment, isAddingComment } = useAddComment();
  const { save, isSaving } = useSaveNews();
  const [toggleBookmark, setToggleBookmarks] = useState(false);

  if (isNewsPending || isAddingComment || isSaving) return <Loader />;
  if (!news) return;

  function handleIncrease() {
    setSize((size) => (size === 5 ? size : size + 1));
  }

  function handleDecrease() {
    setSize((size) => (size === 0 ? size : size - 1));
  }

  function handleAddComment(e: React.FormEvent<HTMLFormElement>, id: number) {
    e.preventDefault();
    console.log(id);
    if (!id) return;

    const newObj = {
      comment_id: new Date().toISOString(),
      comment: commentValue,
    };
    addComment({ id, newObj });
    setCommentValue("");
  }

  const singleNews = news?.at(0);

  function handleSaveNews(id: number) {
    if (!news || news.length === 0) return;
    const newObj = news?.at(0);

    save({ newObj, id });

    if (newObj.saves?.some((save: { id: any }) => save.id === id)) {
      setToggleBookmarks(false);
    } else {
      setToggleBookmarks(true);
    }
  }

  return (
    <div className="border-[1px] border-stone-600 rounded-md py-4 px-6 flex justify-start items-center flex-col">
      {authenticated && (
        <div className="flex justify-between items-center w-full mb-2">
          <button
            onClick={() => navigate(`/editNews/${singleNews?.id}`)}
            className="w-10 h-9 rounded-full bg-purple-500 flex justify-center items-center"
          >
            <HiOutlinePencil className="text-stone-200" />
          </button>

          {toggleBookmark ? (
            <button
              onClick={() => handleSaveNews(singleNews.id)}
              className="flex justify-end items-end w-full text-purple-500 hover:text-purple-600"
            >
              <HiBookmark className=" text-xl" />
            </button>
          ) : (
            <button
              onClick={() => handleSaveNews(singleNews.id)}
              className="flex justify-end items-end w-full text-purple-500 hover:text-purple-600"
            >
              <HiOutlineBookmarkSlash className=" text-xl" />
            </button>
          )}
        </div>
      )}

      <div className="flex justify-start items-start flex-col gap-2">
        <h1 className="text-lg text-purple-500">{singleNews.title}</h1>
        <div className="flex justify-start gap-4 items-center w-full text-sm text-stone-200">
          <p className="flex items-center gap-1">
            <span>
              <HiOutlineClock />
            </span>
            <span>{getDate(singleNews.created_at)}</span>
          </p>
          <p className="flex items-center gap-1">
            <span>
              <HiOutlineUser />
            </span>
            <span>{singleNews.author.name}</span>
          </p>
        </div>

        <img
          className="rounded-xl mt-4"
          src={singleNews.image}
          alt="newsimage"
        />
        <div className="flex items-center gap-2 text-xl font-bold text-stone-200">
          <button
            onClick={() => handleDecrease()}
            className="w-8 h-8 rounded-full flex justify-center items-center  bg-red-500 hover:bg-red-600 duration-150 transition-all"
          >
            <HiOutlineMinus />
          </button>
          <button
            onClick={() => handleIncrease()}
            className={`w-8 h-8 rounded-full flex justify-center items-center  bg-purple-500 hover:bg-purple-600 duration-150 transition-all`}
          >
            <HiOutlinePlus />
          </button>
        </div>

        <div
          className={`flex items-start gap-2 justify-start text-stone-200 ${
            size === 0
              ? "text-xs"
              : size === 1
              ? "text-sm"
              : size === 2
              ? "text-base"
              : size === 3
              ? "text-lg"
              : setSize(0)
          }`}
        >
          {singleNews.content}
        </div>
      </div>

      <div className="flex justify-start items-start w-full my-10 gap-2">
        <span className="text-lg hover:text-xl duration-150 transition-all cursor-pointer">
          <a href="https://www.facebook.com/profile.php?id=61552923891754">
            <LuInstagram className="text-purple-500 " />
          </a>
        </span>
        <span className="text-lg hover:text-xl duration-150 transition-all cursor-pointer">
          <a href="https://www.facebook.com/profile.php?id=61552923891754">
            <LuFacebook className="text-indigo-600" />
          </a>
        </span>
      </div>

      <h1 className="text-xl text-start w-full text-stone-200">
        კომენტარები [
        {singleNews?.comments?.length < 1 ? "" : singleNews?.comments?.length}]
      </h1>
      <div className="bg-red-300 text-stone-900 w-full rounded-md my-2 px-2 py-2">
        <p>ინფორმაცია!</p>
        <p>
          მომხმარებლებს, რომელთაც რეგისტრაცია გავლილი არ აქვთ, მათ არ შეუძლიათ
          კომენტარის დამატება.
        </p>
      </div>
      <div className="flex justify-start items-start flex-col w-full my-10 gap-2 border-[1px] rounded-md border-stone-600">
        <form
          onSubmit={(e) => handleAddComment(e, singleNews.id)}
          className="w-full py-3 px-6"
        >
          <textarea
            className="w-full rounded-md text-stone-800 px-4 py-2 border border-stone-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Add your comment"
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
          />
          <div className="w-full flex justify-end items-end">
            <Button type="submit" className="text-end">
              Add
            </Button>
          </div>
        </form>

        <div className="w-full rounded-md my-2 px-4 py-6 border-[1px] border-stone-600 text-stone-200">
          {singleNews?.comments ? (
            singleNews.comments.map(
              (comment: {
                comment: string | number | null | undefined;
                comment_id: string;
              }) => (
                <div
                  key={crypto.randomUUID()}
                  className="flex flex-col gap-1 border-b-[1px] border-stone-700 py-4"
                >
                  <div className="flex justify-start items-center gap-2">
                    <span className="py-2 px-3 rounded-full bg-purple-500">
                      {"Tornike".split(",").map((item, i) => item[i])}
                    </span>
                    <h1 className="text-lg">Tornike</h1>
                  </div>
                  <span className="text-sm px-4 text-stone-300 mt-4">
                    {comment?.comment}
                  </span>
                  <span className="text-sm px-4 text-stone-300 mt-4">
                    {getDate(comment.comment_id)}
                  </span>
                </div>
              )
            )
          ) : (
            <p>No Comments</p>
          )}
        </div>
      </div>
    </div>
  );
}
