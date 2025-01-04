import { Heart } from 'lucide-react';

export default function FavoriteToogle({ id }: { id: string }) {
  const isFavorite = false;
  const count = 1;
  return (
    <div className='flex w-fit cursor-pointer items-center gap-1 rounded-full border bg-muted-foreground px-2 py-1 text-xs'>
      <Heart className='h-3 w-3' />
      <span>{count}</span>
    </div>
  );
}
