import HomeCard from '../ItemCard/HomeCard';
import { TDataList } from '@/types/types';

export default function HomeItemList({ dataList }: { dataList: TDataList[] }) {
  return (
    <section className='w-full divide-y-2'>
      {dataList.map((data) => (
        <HomeCard key={data.id} data={data} />
      ))}
    </section>
  );
}
