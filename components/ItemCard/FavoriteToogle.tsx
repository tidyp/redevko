import { fetctFavoritePosts } from '@/server/post.action';
import { Heart } from 'lucide-react';

export default async function FavoriteToogle({ id }: { id: string }) {
  console.log(`id : ${id}`);
  const isFavorite = false;
  const count = 1;

  // 로그인 확인

  // 즐겨찾기 fetch
  const favoriteID = await fetctFavoritePosts({ id });
  console.log(favoriteID);

  return (
    <div className='flex w-fit cursor-pointer items-center gap-1 rounded-full border bg-muted-foreground px-2 py-1 text-xs'>
      <Heart className='h-3 w-3' />
      <span>{count}</span>
    </div>
  );
}
