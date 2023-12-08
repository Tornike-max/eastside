import supabase, { supabaseUrl } from "./supabase";

export async function getPlayers() {
  let { data, error } = await supabase.from("players").select("*");
  if (error) throw new Error(error.message);

  return data;
}

export async function getPlayerStat(player_id: number) {
  let { data, error } = await supabase
    .from("player_stats")
    .select("*,players(*)")
    .eq("player_id", player_id)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

type PlayersType = {
  full_name: string;
  position: string;
  jersey_number: number;
  nationality: string;
  height: number;
  weight: number;
  image: any;
};

// type PlayerStats = {
//   matches_played: number;
//   aces: number;
//   spikes: number;
//   digs: number;
//   blocks: number;
//   sets: number;
//   player_id: number | undefined;
// };
export async function createEditPlayer({
  player_id,
  newObj,
}: // playerStats,
{
  player_id?: number;
  newObj?: PlayersType;
  // playerStats?: PlayerStats;
}) {
  const hasImagePath = newObj?.image?.startsWith?.(supabaseUrl);
  console.log(hasImagePath);
  console.log(newObj);

  const imageName = `${Math.random()}-${newObj?.image?.name}`.replace(
    /\//g,
    ""
  );

  const imagePath = hasImagePath
    ? newObj?.image
    : `${supabaseUrl}/storage/v1/object/public/images/${imageName}`;

  if (player_id) {
    const { data, error } = await supabase
      .from("players")
      .update({ ...newObj, image: imagePath })
      .eq("player_id", player_id)
      .select()
      .single();

    if (error) throw new Error(error.message);

    const { error: storageError } = await supabase.storage
      .from("images")
      .upload(imageName, newObj?.image);

    console.log(data);

    if (storageError) {
      throw new Error(`images could'n be uploaded`);
    }

    return data;
  } else {
    const { data, error } = await supabase
      .from("players")
      .insert([{ ...newObj, image: imagePath }])
      .select();

    if (error) throw new Error(error.message);

    const { error: storageError } = await supabase.storage
      .from("images")
      .upload(imageName, newObj?.image);

    console.log(data);

    if (storageError) {
      throw new Error(`images could'n be uploaded`);
    }
    return data;
  }
}

export async function getPlayer(player_id: number) {
  const { data, error } = await supabase
    .from("players")
    .select("*")
    .eq("player_id", player_id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deletePlayer(player_id: number) {
  const { error } = await supabase
    .from("player_stats")
    .delete()
    .eq("player_id", player_id);

  if (error) throw new Error(error.message);

  if (!error) {
    const { error: playerError } = await supabase
      .from("players")
      .delete()
      .eq("player_id", player_id);

    if (playerError) throw new Error(playerError.message);
  }
}
