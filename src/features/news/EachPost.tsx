import { Link, useNavigate } from "react-router-dom";
import { getDate } from "../../ui/getDate";
import { HiOutlineTrash, HiOutlineUser } from "react-icons/hi2";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDeleteNews } from "../../hooks/news/useDeleteNews";

type NewsItem = {
  author: {
    name: string;
    email: string;
    author_id: number;
    created_at: string;
  };
  author_id: number;
  category: string;
  content: string;
  created_at: string;
  id: number;
  title: string;
  image: string;
  low_res: string;
};

type NewsArray = NewsItem[] | undefined;

export default function EachPost({ news }: { news: NewsArray }) {
  const navigate = useNavigate();
  const { deleteNews, isDeleting } = useDeleteNews();

  function handleSeeAuthor(e: React.MouseEvent) {
    e.preventDefault();
    navigate("/");
  }

  function onDeleteClick(e: React.MouseEvent, id: number) {
    e.preventDefault();
    console.log("click");
    deleteNews(id);
  }
  return (
    <>
      {news?.map((post) => (
        <Link
          to={`/news/${post.id}`}
          key={post.id}
          className="bg-stone-900 text-stone-200 shadow-md rounded-lg overflow-hidden cursor-pointer my-4 relative"
        >
          {post.image && (
            <>
              <LazyLoadImage
                src={post.image}
                style={{ width: "100%" }}
                placeholderSrc={post.low_res}
                alt={post.title}
                className="w-full h-auto object-cover transition-transform duration-300 transform hover:scale-105"
              />
              {/* Delete button */}
              <button
                type="button"
                disabled={isDeleting}
                onClick={(e) => onDeleteClick(e, post.id)}
                className="absolute top-2 right-2 text-red-500 py-2 px-3 rounded-full bg-stone-200 opacity-70 hover:text-red-600 transition-all duration-300 focus:outline-none text-2xl"
              >
                <HiOutlineTrash />
              </button>
            </>
          )}
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2 px-2 hover:text-purple-500 duration-75 transition-all">
              {post.title}
            </h2>
            <p className="text-sm text-stone-300 px-2 pb-10">
              {post.content.length > 70
                ? `${post.content.slice(0, 70)}...`
                : post.content}
            </p>
          </div>
          <div className="rounded-lg text-xs absolute bottom-0 left-0 right-0 bg-stone-900 border-[1px] border-stone-800 py-2 px-4 w-full flex justify-between items-center">
            <span>{getDate(post.created_at)}</span>
            <button
              onClick={(e) => handleSeeAuthor(e)}
              className="flex items-center gap-1 hover:text-purple-500 duration-75 transition-all"
            >
              <HiOutlineUser />
              <span>{post.author.name}</span>
            </button>
          </div>
        </Link>
      ))}
    </>
  );
}
