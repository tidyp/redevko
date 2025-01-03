import Carousel from '@/components/Carousel/Carousel';
import HomeContainer from '@/components/ItemList/HomeContainer';
import { fetchPosts } from '@/server/post.action';

export default async function HomePage({
  searchParams,
}: {
  searchParams: string;
}) {
  console.log(searchParams);
  const data = await fetchPosts({});
  console.log(data);

  return (
    <main className='flex w-full flex-col items-center justify-center gap-4 lg:w-2/3'>
      <Carousel />
      <HomeContainer />
    </main>
  );
}
