import { Button, Input } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useGetGame } from "../../hooks/season/useGetGame";
import Loader from "../../ui/Loader";

type FormData = {
  location: string;
  location_id: string;
  oponent: string;
  east_side: string;
  date: string;
  score: string;
  result: boolean;
};

export default function EditTable() {
  const { tableId } = useParams();
  const { match, isMatchLoading } = useGetGame(Number(tableId));

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      oponent: match ? match.oponent : "",
      date: match ? match.date : "",
      score: match ? match.score : "",
      result: match ? match.result : "",
      location_id: match ? match.location_id : "",
      east_side: match ? match.east_side : "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (!data) return;

    const isTeamWin =
      Number(data.score.split("-")[0]) > Number(data.score.split("-")[1]);

    // Adjust type if needed for location_id
    const newObj = {
      location_id: 1,
      oponent: data?.oponent,
      east_side: data.east_side,
      date: data?.date,
      score: data?.score,
      result: isTeamWin,
    };
    console.log(newObj);
  };

  if (isMatchLoading) return <Loader />;

  return (
    <div className="w-full">
      <h1 className="text-3xl text-stone-200 font-serif mb-6">Create Match</h1>
      <form
        className="text-stone-200 flex flex-col gap-4 justify-center items-center w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full flex flex-col gap-4">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input
              type="text"
              variant="bordered"
              //   disabled={true}
              defaultValue="East Side"
              {...register("east_side", {
                required: true,
              })}
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input
              variant="bordered"
              label="Oponent (ოპონენტი)"
              type="text"
              {...register("oponent", {
                required: "This field is required",
              })}
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input
              variant="bordered"
              label="Score (ანგარიში): 3-1, 3-0, 1-3"
              type="text"
              {...register("score", {
                validate: (value) =>
                  value === "0-3" ||
                  value === "1-3" ||
                  value === "2-3" ||
                  value === "3-0" ||
                  value === "3-1" ||
                  value === "3-2" ||
                  value === "",
              })}
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input
              variant="bordered"
              label="location (ლოკაცია)"
              type="string"
              {...register("location", {
                required: "This field is required",
              })}
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input
              variant="bordered"
              type="date"
              {...register("date", {
                required: "This field is required",
              })}
            />
          </div>
        </div>

        <Button
          disabled={false}
          className=" w-full"
          type="submit"
          variant="shadow"
          color="secondary"
        >
          Edit
        </Button>
      </form>
    </div>
  );
}
