import { fetchPosts } from '@/server/post.action';
import EmptyList from './EmptyList';
import HomeItemList from './HomeItemList';
import SkeletionList from './SkeletionList';
import { Suspense } from 'react';

export default async function HomeContainer({ search }: { search?: string }) {
  const dataList = await fetchPosts({ search });

  if (dataList.length < 0) {
    return (
      <EmptyList heading='No posts found' message='Please try again later' />
    );
  }

  return (
    <Suspense fallback={<SkeletionList />}>
      <HomeItemList dataList={dataList} />
    </Suspense>
  );
}
