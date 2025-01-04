import Image from 'next/image';
import Link from 'next/link';
import CommentCounter from './CommentCounter';
import { create } from 'domain';
import FavoriteToogle from './FavoriteToogle';

type TDataList = {
  category: string;
  id: string;
  title: string;
  image: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  profileId: string;
};

export default function HomeCard({ data }: { data: TDataList }) {
  const { category, title, content, image, createdAt } = data;
  return (
    <section className='relative flex w-full flex-col gap-2'>
      {/* User */}
      <div className='flex items-center gap-2'>
        <div className='relative h-6 w-6 overflow-hidden rounded-full'>
          <Image className='object-cover' fill src={image} />
        </div>
        {/* <span className='text-sm'>User Name</span> */}
        <span>{category}</span>
        <span className='text-muted-foreground'>•</span>
        <span className='text-muted-foreground'>
          {createdAt.toDateString()}
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
      <hr className='border-t border-muted-foreground py-2' />
    </section>
  );
}
