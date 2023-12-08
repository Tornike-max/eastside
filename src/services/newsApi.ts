import { MAX_PAGE_NEWS } from "../constants";
import supabase, { supabaseUrl } from "./supabase";

export async function getNews(curPage: number) {
  let from = curPage === 1 ? curPage - 1 : (curPage - 1) * MAX_PAGE_NEWS;
  let to = curPage * MAX_PAGE_NEWS - 1;

  const { data, error, count } = await supabase
    .from("posts")
    .select("*,author(*)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw new Error(error.message);

  return { data, count };
}

export async function getSingleNews(id: number) {
  const { data, error } = await supabase
    .from("posts")
    .select("*,author(*)")
    .eq("id", id);

  if (error) throw new Error(error.message);

  return data;
}

type CommentType = {
  comment_id: string;
  comment: string;
};

export async function addComment({
  newObj,
  id,
}: {
  newObj: CommentType;
  id: number;
}) {
  const { data, error } = await supabase.from("posts").select("*").eq("id", id);

  if (error) throw new Error("Errow while Selecting");

  if (error) throw new Error(error);

  const existingComments = data[0].comments || [];
  const newComments = [...existingComments, newObj];

  const { error: updateError } = await supabase
    .from("posts")
    .update({ comments: newComments })
    .eq("id", id);

  if (updateError) throw new Error(updateError.message);
}

type SaveType = {
  newObj: object;
};

export async function saveNews({
  newObj,
  id,
}: {
  newObj: SaveType;
  id: number;
}) {
  const { data, error } = await supabase.from("posts").select("*").eq("id", id);

  if (error) throw new Error("Errow while Selecting");

  if (error) throw new Error(error);

  const post = data[0];
  const saves = post.saves || [];

  const existingIndex = saves.findIndex(
    (save: { id: number }) => save.id === id
  );

  if (existingIndex !== -1) {
    // Post exists in saves, remove it
    saves.splice(existingIndex, 1);
  } else {
    // Post doesn't exist in saves, add it
    saves.push(newObj);
  }

  const { error: updateError } = await supabase
    .from("posts")
    .update({ saves })
    .eq("id", id);

  if (updateError) throw new Error(updateError.message);
}

type NewRowType = {
  title: string;
  content: string;
  image: any;
  category: string;
  author_id: number;
};

export async function createEditNews({
  newRow,
  id,
}: {
  newRow: NewRowType;
  id: number | undefined;
}) {
  const hasImagePath = newRow?.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newRow?.image?.name}`.replace(
    /\//g,
    ""
  );

  const imagePath = hasImagePath
    ? newRow.image
    : `${supabaseUrl}/storage/v1/object/public/images/${imageName}`;

  if (!id) {
    const { data, error } = await supabase
      .from("posts")
      .insert([{ ...newRow, image: imagePath }])
      .select()
      .single();

    if (error) throw new Error(error.message);

    const { error: storageError } = await supabase.storage
      .from("images")
      .upload(imageName, newRow.image);

    if (storageError) {
      await supabase.from("posts").delete().eq("id", data.id);
      throw new Error(`images could'n be uploaded`);
    }
    return data;
  } else {
    const { data, error } = await supabase
      .from("posts")
      .update({ ...newRow, image: imagePath })
      .eq("id", id)
      .select();

    if (error) throw new Error(error.message);

    const { error: storageError } = await supabase.storage
      .from("images")
      .upload(imageName, newRow.image);

    if (storageError) {
      throw new Error(`images could'n be uploaded`);
    }
    return data;
  }
}

export async function deleteNewsApi(id: number) {
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw new Error(`Error while deleting news`);
}
