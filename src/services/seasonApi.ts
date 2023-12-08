import supabase from "./supabase";

export async function getSeasonGames() {
  const { data, error } = await supabase
    .from("Games")
    .select("*,location(*)")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);

  return data;
}

type NewObjType = {
  oponent: string;
  result: boolean;
  east_side: string;
  score: string;
  date: string;
  location_id: number;
};

export async function createMatch({ newObj }: { newObj: NewObjType }) {
  const { data, error } = await supabase
    .from("Games")
    .insert([{ ...newObj }])
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

type EditTableType = {
  oponent: string;
  result: boolean;
  east_side: string;
  score: string;
  date: string;
  location_id: number;
};

export async function editTable({
  id,
  editedData,
}: {
  id: number;
  editedData: EditTableType;
}) {
  const { data, error } = await supabase
    .from("Games")
    .update({ ...editedData })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function getSeasonGame(id: number) {
  const { data, error } = await supabase
    .from("Games")
    .select("*,location(*)")
    .eq("id", id)
    .single();
  if (error) throw new Error(error.message);

  return data;
}
