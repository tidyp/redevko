import supabase from "./supabase";

export async function getPoptags() {
  const { data, error } = await supabase.from("poptags").select("*");

  if (error) {
    console.error(error);
    throw new Error("Tags not found");
  }

  return data;
}
export async function getTopWriters() {
  const { data, error } = await supabase
    .from("topwriters")
    .select("*");

  if (error) {
    console.error(error);
    throw new Error("Tags not found");
  }

  return data;
}
