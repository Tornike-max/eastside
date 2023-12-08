import supabase from "./supabase";

export async function getClubHistory() {
  const { data, error } = await supabase
    .from("team_history")
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function updateHistory({
  newData,
}: {
  newData: {
    titles: number;
    founded: number;
    lang_geo: string;
    lang_eng: string;
  };
}) {
  const { data, error } = await supabase
    .from("team_history")
    .update({ ...newData })
    .eq("id", 1)
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  return data;
}
