import { Button, Input } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useGetHistory } from "../../hooks/history/useGetHistory";
import Loader from "../../ui/Loader";
import { useUpdateHistory } from "../../hooks/history/useUpdateHistory";

type HistoryType = {
  titles: number;
  founded: number;
  lang_geo: string;
  lang_eng: string;
};
export default function UpdateHistory() {
  const { data: history, isPending } = useGetHistory();
  const { newHistory, isHistoryPending } = useUpdateHistory();
  const { register, handleSubmit } = useForm<HistoryType>();

  const onSubmit: SubmitHandler<HistoryType> = (data) => {
    console.log(data);
    const newData = {
      titles: data.titles,
      founded: data.founded,
      lang_geo: data.lang_geo,
      lang_eng: data.lang_eng,
    };
    newHistory({ newData });
  };

  if (isPending || isHistoryPending) return <Loader />;
  console.log(history);
  return (
    <div className="max-w-5xl w-full m-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 items-center"
      >
        <h1 className="text-xl md:text-2xl lg:text-3xl text-stone-200 font-bold">
          Update Club History
        </h1>
        <div className="max-w-md w-full">
          <Input
            label="Founded in"
            type="number"
            defaultValue={history?.founded}
            variant="faded"
            {...register("founded", { required: true })}
          />
        </div>
        <div className="max-w-md w-full">
          <Input
            label="Number of Titles"
            type="number"
            defaultValue={history?.titles === 0 ? 0 : history.titles}
            variant="faded"
            {...register("titles", { required: true })}
          />
        </div>
        <div className="max-w-md w-full">
          <textarea
            placeholder="Write the text in Georgian"
            defaultValue={history?.lang_geo}
            className="w-full rounded-lg bg-stone-100 px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-blue-500 resize-none overflow-auto"
            {...register("lang_geo", { required: true })}
          />
        </div>
        <div className="max-w-md w-full mt-4">
          <textarea
            placeholder="Write the text in English"
            defaultValue={history?.lang_eng}
            className="w-full rounded-lg bg-stone-100 px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-blue-500 resize-none overflow-auto"
            {...register("lang_eng", { required: true })}
          />
        </div>
        <Button color="primary" variant="shadow" type="submit">
          Update
        </Button>
      </form>
    </div>
  );
}
