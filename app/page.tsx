import Carousel from '@/components/Carousel/Carousel';
import HomeContainer from '@/components/ItemList/HomeContainer';

export default async function HomePage({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  return (
    <main className='flex w-full flex-col items-center justify-center gap-4 lg:w-2/3'>
      <Carousel />
      <HomeContainer search={searchParams.search} />
    </main>
  );
}
