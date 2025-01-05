import { timeStamps } from '@/utils/Helper';
import Image from 'next/image';

type TContent = {
  data: {
    id: string;
    title: string;
    content: string;
    category: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    profileId: string;
    profile: {
      firstName: string;
      lastName: string;
      email: string;
      profileImage: string;
      job: string;
      nickname: string;
    };
  };
};

export default function Content({ data }: TContent) {
  // Destructuring properties from data
  const {
    // id,
    title,
    content,
    category,
    image,
    createdAt,
    // updatedAt,
    // profileId,
    profile,
  } = data;

  const { nickname } = profile;
  // const { firstName, lastName, email, profileImage, job, nickname } = profile;

  return (
    <>
      {/* Post Header */}
      <div className='flex w-full flex-col items-center gap-4 lg:w-2/3'>
        {/* User */}
        <div className='flex w-full items-center justify-between gap-2'>
          {/* user image */}
          <div className='flex items-center gap-1'>
            <div className='relative aspect-square min-h-8 min-w-8 overflow-hidden rounded-full'>
              <Image
                className='object-cover'
                fill
                src={profile.profileImage}
                alt='user profile'
              />
            </div>
            <div className='flex w-full flex-col items-center justify-between text-left'>
              <div className='flex w-full items-center justify-between gap-1'>
                <span className='text-sm'>{category}</span>
                <span className='text-muted-foreground'>•</span>
                <p className='text-xs text-muted-foreground'>
                  {timeStamps(createdAt)}
                </p>
              </div>
              <span className='w-full text-xs text-muted-foreground'>
                {nickname}
              </span>
            </div>
          </div>

          <div className='px-2'>...</div>
        </div>

        {/* Post main */}
        <div className='w-full'>
          <h2 className='mb-2 w-full text-xl font-semibold'>{title}</h2>
          <p className='mb-2 w-full text-xs'>{content}</p>
        </div>

        {/* Post Image */}
        {image && (
          <img
            src={image}
            alt='Post Image'
            className='mb-4 w-full rounded-lg'
          />
        )}
      </div>
    </>
  );
}
