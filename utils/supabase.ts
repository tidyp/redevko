import { createClient } from '@supabase/supabase-js';

const bucket = 'devko';

export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_ANON_KEY as string,
);

// supabase 이미지 업로드
export const uploadImage = async (image: File) => {
  const timestamp = Date.now();
  const newName = `avatar/${timestamp}-${image.name}`;

  const { data } = await supabase.storage.from(bucket).upload(newName, image, {
    cacheControl: '3600',
  });
  if (!data) throw new Error('Image upload failed');
  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};
