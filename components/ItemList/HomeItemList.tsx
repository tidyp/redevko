import HomeCard from '../ItemCard/HomeCard';

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

export default function HomeItemList({ dataList }: { dataList: TDataList[] }) {
  return (
    <section className='w-full divide-y-2'>
      {dataList.map((data) => (
        <HomeCard key={data.id} data={data} />
      ))}
    </section>
  );
}
