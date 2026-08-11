import { supabase } from "@/lib/supabase/client";

const BUCKET = "services";

export const storageService = {
  async upload(file: File): Promise<string> {
    const extension = file.name.split(".").pop() ?? "jpg";

    const filename = `${crypto.randomUUID()}.${extension}`;

    const path = `trainings/${filename}`;

    console.log("[Storage] Upload:", path);

const { error } = await supabase
  .storage
  .from(BUCKET)
  .upload(path, file);

if (error) {
  console.error(error);
  throw error;
}

    const { data } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(path);

    console.log("[Storage URL]", data.publicUrl);

    return data.publicUrl;
  },

  async remove(url: string): Promise<void> {
    const path = url.split(`${BUCKET}/`)[1];

    if (!path) return;

    const { error } = await supabase.storage
      .from(BUCKET)
      .remove([path]);

    if (error) {
      console.error("[Storage Remove Error]", error);
      throw error;
    }
  },
};