import { Skeleton } from '../ui/skeleton';

export function SkeletonCard() {
  return (
    <div className='flex w-full flex-col gap-2'>
      {/* User */}
      <div className='flex items-center gap-2'>
        <Skeleton className='h-6 w-6 rounded-full' />
        <Skeleton className='h-6 w-1/3' />
      </div>

      <Skeleton className='h-6 w-1/2' />
      <Skeleton className='h-6 w-full' />
      <Skeleton className='h-24 w-full' />

      {/*  */}
      {/* <div className='flex items-center gap-2'>
        <Skeleton className='w-20' />
        <Skeleton className='w-20' />
      </div> */}
      <hr className='border-t border-muted-foreground py-2' />
    </div>
  );
}
