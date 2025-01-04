import { SkeletonCard } from '../ItemCard/SkeletonCard';

export default function SkeletionList() {
  return (
    <div className='flex w-full flex-col gap-4'>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
