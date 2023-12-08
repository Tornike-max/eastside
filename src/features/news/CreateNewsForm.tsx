import { Button } from "@nextui-org/button";
import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { HiOutlinePhoto } from "react-icons/hi2";
import { useCreateAndEditNews } from "../../hooks/news/useCreateAndEditNews";
import { useChangeLanguage } from "../../context/useChangeLanguage";

export default function CreateNewsForm({
  post,
}: {
  post?: {
    title: string;
    content: string;
    image: any;
    category: string;
    id: number;
  };
}) {
  const { isGeoLang } = useChangeLanguage();
  const { isWorking, createAndEdit } = useCreateAndEditNews();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: post?.content ? post.content : "",
      title: post?.title ? post.title : "",
      category: post?.category ? post.category : "",
      image: post?.image ? post.image : "",
    },
  });
  const onDrop: DropzoneOptions["onDrop"] = (acceptedFiles) => {
    setValue("image", acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });

  function onSubmit(data: any) {
    if (!data) return;
    let image;
    if (typeof data.image === "string") {
      image = data.image;
    } else {
      image = data.image[0];
    }
    // const image = data?.image[0];
    const newRow = {
      title: data.title,
      content: data.content,
      category: data.category,
      image: image,
      author_id: 1,
    };
    createAndEdit({ newRow, id: post?.id });
    reset();
  }

  const image = watch("image");

  return (
    <form
      className="flex flex-col gap-4 max-w-[500px] w-full justify-center m-auto px-4 md:px-0"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl text-stone-200 font-bold">
        {post
          ? `${isGeoLang ? "შეასწორე სიახლე" : "Edit News"}`
          : `${isGeoLang ? "შექმენი სიახლე" : "Create News"}`}
      </h1>
      <div>
        s
        <label className="text-stone-200">
          {isGeoLang ? "დაამატე სათაური" : "Add Title"}
        </label>
        <input
          className="py-2 px-3 rounded-md w-full bg-slate-200 hover:bg-slate-300 duration-150 transition-all"
          placeholder="Title"
          type="text"
          {...register("title", {
            required: "This Field Is Required",
          })}
        />
        {errors?.content?.message && <p>errors?.content?.message</p>}
      </div>
      <div>
        <label className="text-stone-200">
          {isGeoLang ? "დაამატე კონტენტი" : "Add Content"}
        </label>
        <textarea
          className="py-2 px-3 rounded-md w-full bg-slate-200 hover:bg-slate-300 duration-150 transition-all"
          placeholder="Content"
          {...register("content", {
            required: "This Field Is Required",
          })}
        />
        {errors?.content?.message && <p>errors?.content?.message</p>}
      </div>
      <div>
        <label className="text-stone-200">
          {isGeoLang ? "დაამატე კატეგორია" : "Add Category"}
        </label>
        <input
          className="py-2 px-3 rounded-md w-full bg-slate-200 hover:bg-slate-300 duration-150 transition-all"
          placeholder="Category"
          type="text"
          {...register("category", {
            required: "This Field Is Required",
          })}
        />
        {errors?.content?.message && <p>errors?.content?.message</p>}
      </div>
      <div
        {...getRootProps()}
        className="flex flex-col justify-center items-center rounded-xl cursor-pointer bg-slate-200 hover:bg-slate-300 duration-150 transition-all"
      >
        <input {...getInputProps()} className="cursor-pointer" />
        {isDragActive ? (
          <div>
            {image &&
              image?.map(
                (file: {
                  name:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | null
                    | undefined;
                }) => <span>{file.name}</span>
              )}
          </div>
        ) : (
          <div className="max-w-[500px] w-full rounded-md py-16 px-10 flex flex-col justify-center items-center space-y-2">
            <span className="flex justify-center items-center">
              <HiOutlinePhoto className="text-purple-400 sm:w-28 sm:h-28 w-20 h-20" />
            </span>
            <h3 className="text-purple-600 font-medium text-base sm:text-lg">
              {isGeoLang ? "გადაიტანეთ ფოტო აქ" : "Drag Photo Here"}
            </h3>
            <p className="text-purple-400 font-normal text-sm sm:text-base">
              SVG, PNG, JPEG
            </p>

            <Button color="secondary" variant="ghost">
              {isGeoLang ? "აირჩიეთ კომპიუტერიდან" : "Select from computer"}
            </Button>
          </div>
        )}
      </div>
      <Button
        disabled={isWorking}
        type="submit"
        color="secondary"
        variant="shadow"
      >
        {post
          ? `${isGeoLang ? "შესწორება" : "Edit"}`
          : `${isGeoLang ? "შექმნა" : "Create"}`}
      </Button>
    </form>
  );
}
