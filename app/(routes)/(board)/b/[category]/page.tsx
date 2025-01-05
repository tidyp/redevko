type Params = {
  params: { category: string };
  searchParams: { search: string };
};

import HomeContainer from '@/components/ItemList/HomeContainer';

export default async function HomePage({ params, searchParams }: Params) {
  return (
    <main className='flex w-full flex-col items-center justify-center gap-4 lg:w-2/3'>
      <HomeContainer category={params.category} search={searchParams.search} />
    </main>
  );
}
