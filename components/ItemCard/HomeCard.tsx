import Image from 'next/image';
import Link from 'next/link';
import CommentCounter from './CommentCounter';
import FavoriteToogle from './FavoriteToogle';

import { TDataList } from '@/types/types';
import { timeStamps } from '@/utils/Helper';

export default function HomeCard({ data }: { data: TDataList }) {
  const { category, title, content, image, createdAt, profile } = data;
  return (
    <section className='relative flex w-full flex-col gap-2 py-4'>
      {/* User */}
      <div className='flex items-center gap-2'>
        <div className='relative h-6 w-6 overflow-hidden rounded-full'>
          <Image
            className='object-cover'
            fill
            src={profile.profileImage}
            alt='user profile'
          />
        </div>
        {/* <span className='text-sm'>User Name</span> */}
        <span className='md:text-md text-xs font-semibold lg:text-lg'>
          {category}
        </span>
        <span className='md:text-md text-xs text-muted-foreground lg:text-lg'>
          •
        </span>
        <span className='md:text-md text-xs text-muted-foreground lg:text-lg'>
          {timeStamps(createdAt)}
        </span>
      </div>

      <Link href={`/post/${data.id}`}>
        {/*  */}
        <div>
          <h2 className='text-semiblod'>{title}</h2>
          <p className='text-muted-foreground'>{content.substring(0, 30)}...</p>
        </div>

        {/* Image  */}
        <div className='relative mb-2 h-24 overflow-hidden rounded-md border p-2 md:h-48 lg:h-96'>
          <Image className='object-cover' fill src={image} alt={title} />
        </div>
      </Link>
      {/*  */}
      <div className='flex items-center gap-2'>
        <FavoriteToogle id={data.id} />
        <CommentCounter />
      </div>
    </section>
  );
}
