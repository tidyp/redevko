import Content from '@/components/Post/Content';
import { fetchPostDetail } from '@/server/post.action';
import { Suspense } from 'react';

export default async function PostDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // Post Detail Data
  const data = await fetchPostDetail(params.id);
  // Post comment Data
  // const comment = await fetchPostComment(params.id);

  return (
    <div className='flex w-full flex-col items-center justify-center gap-4 lg:w-2/3'>
      <Suspense fallback={<div>Loading...</div>}>
        <Content data={data} />
      </Suspense>
      <div>
        <h2>Comment Form</h2>
      </div>
      <div>
        <h2>Comment</h2>
        <p>Comment Content</p>
      </div>
    </div>
  );
}
