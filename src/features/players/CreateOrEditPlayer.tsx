import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { useEditOrCreatePlayer } from "../../hooks/players/useEditOrCreatePlayer";

type PlayersType = {
  player_id: number | undefined;
  full_name: string;
  position: string;
  jersey_number: number;
  nationality: string;
  height: number;
  weight: number;
  image: any;
};

export default function CreateOrEditPlayer({
  player,
}: {
  player?: PlayersType;
}) {
  const { register, handleSubmit } = useForm<PlayersType>({
    defaultValues: {
      image: player?.image ? player.image : "",
    },
  });

  const { createEdit, isWorkingPlayer } = useEditOrCreatePlayer();
  const onSubmit: SubmitHandler<PlayersType> = (data) => {
    if (!data) return;

    let image;

    if (data.image !== "string") {
      console.log("here");
      image = data.image[0];
    } else {
      console.log("Else block");
      image = data.image;
    }
    const newObj = {
      full_name: data.full_name,
      position: data.position,
      jersey_number: data.jersey_number,
      nationality: data.nationality,
      height: data.height,
      weight: data.weight,
      image: image,
    };

    createEdit({ newObj, player_id: player?.player_id });
  };

  return (
    <div className="max-w-5xl w-full">
      <h1 className="text-start text-stone-200 text-3xl font-serif my-4">
        {player ? "Edit Selected Player" : "Add New Player"}
      </h1>
      <form
        className="text-stone-200 flex flex-col gap-4 justify-center items-center w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full flex flex-col gap-4">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input
              type="text"
              label="Full Name"
              defaultValue={player ? player.full_name : ""}
              variant="bordered"
              {...register("full_name", {
                required: true,
              })}
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input
              variant="bordered"
              label="Position"
              defaultValue={player ? player.position : ""}
              type="text"
              {...register("position", {
                required: "This field is required",
              })}
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input
              variant="bordered"
              label="Jersey Number"
              defaultValue={
                player ? Number(player?.jersey_number).toString() : "0"
              }
              type="number"
              {...register("jersey_number", {
                required: "This field is required",
              })}
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input
              variant="bordered"
              label="Nationality"
              defaultValue={player ? player.nationality : ""}
              type="text"
              {...register("nationality", {
                required: "This field is required",
              })}
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input
              variant="bordered"
              type="number"
              defaultValue={player ? Number(player.height).toString() : "0"}
              label="Height"
              {...register("height", {
                required: "This field is required",
              })}
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input
              variant="bordered"
              type="number"
              defaultValue={player ? Number(player.weight).toString() : "0"}
              label="Weight"
              {...register("weight", {
                required: "This field is required",
              })}
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <div className="flex w-full flex-col md:flex-nowrap mb-6 md:mb-0 gap-4">
            <label>Player Image</label>
            <input
              type="file"
              {...register("image", {
                required: "This field is required",
              })}
            />
          </div>
        </div>

        <Button
          disabled={isWorkingPlayer}
          className=" w-full"
          type="submit"
          variant="shadow"
          color="secondary"
        >
          {player ? "Edit Player" : "Add Player"}
        </Button>
      </form>
    </div>
  );
}
