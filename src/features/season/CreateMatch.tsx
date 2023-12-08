import { Button, Input } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateMatch } from "../../hooks/season/useCreateMatch";
import { useNavigate } from "react-router-dom";
import { useEditTable } from "../../hooks/season/useEditTable";
import { formattedDate } from "../../ui/formattedDate";
import { useChangeLanguage } from "../../context/useChangeLanguage";

type FormData = {
  location: string;
  location_id: string;
  oponent: string;
  east_side: string;
  date: string;
  score: string;
  result: boolean;
};

type MatchDataType = {
  id: number;
  location: string;
  location_id: string;
  oponent: string;
  east_side: string;
  date: string;
  score: string;
  result: boolean;
};

export default function CreateMatch({
  matchData,
}: {
  matchData: MatchDataType;
}) {
  const { isGeoLang } = useChangeLanguage();
  const navigate = useNavigate();
  const { edit, isEditing } = useEditTable();
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      location_id: matchData ? matchData.location_id : "",
      oponent: matchData ? matchData.oponent : "",
      east_side: matchData ? matchData.east_side : "",
      date: matchData ? matchData.date : "",
      score: matchData ? matchData.score : "",
      result: matchData ? matchData.result : false,
    },
  });
  const { createRow, isCreating } = useCreateMatch();
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

    if (matchData) {
      edit(
        { id: matchData?.id, editedData: newObj },
        {
          onSettled: () => {
            navigate("/season");
          },
        }
      );
    } else {
      createRow(
        { newObj },
        {
          onSettled: () => {
            navigate("/season");
          },
        }
      );
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-3xl text-stone-200 font-serif mb-6">
          {matchData
            ? `${isGeoLang ? "შეასწორე მატჩი" : "Edit Match"}`
            : `${isGeoLang ? "შექმენი მატჩი" : "Create Match"}`}
        </h1>
        <Button
          onClick={() => navigate(-1)}
          type="button"
          variant="ghost"
          color="default"
          className="text-stone-200 hover:text-stone-800 mb-6"
        >
          {isGeoLang ? "უკან" : "Go Back"}
        </Button>
      </div>
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
              defaultValue={matchData ? matchData.oponent : ""}
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
              defaultValue={matchData ? matchData.score : ""}
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
              defaultValue={matchData ? matchData.location_id : ""}
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
              defaultValue={matchData ? formattedDate(matchData.date) : ""}
              {...register("date", {
                required: "This field is required",
              })}
            />
          </div>
        </div>

        <Button
          disabled={isCreating || isEditing}
          className=" w-full"
          type="submit"
          variant="shadow"
          color="secondary"
        >
          {matchData ? "Edit" : "Create"}
        </Button>
      </form>
    </div>
  );
}
