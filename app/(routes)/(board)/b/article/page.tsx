import Image from 'next/image';
import Link from 'next/link';

type TArticle = {
  title: string;
  link: string;
};

export default async function page() {
  const res = await fetch('http://localhost:3000/api/article');
  const { data: datas } = await res.json();
  console.log(datas);

  return (
    <main className='flex w-full flex-col justify-center gap-4 px-4 lg:w-2/3'>
      <h1>RSS</h1>
      {datas.map((data: TArticle) => (
        <div className='flex items-center divide-y' key={data.title}>
          <Link target='blank' href={data.link}>
            <li className='flex items-center gap-2'>
              <div className='relative min-h-8 min-w-8'>
                <Image
                  fill
                  src='https://authjs.dev/img/providers/line.svg'
                  className='object-cover'
                  alt='line'
                />
              </div>
              <div className='flex items-center gap-2 py-2 text-sm font-semibold md:text-lg'>
                {data.title}
              </div>
              <div className='flex justify-between'>
                <div className='flex items-center justify-center gap-2'>
                  {/* <div>{timeStamps(data.isoDate)}</div> */}
                  {/* <GoEye /> */}
                </div>
              </div>
            </li>
          </Link>
        </div>
      ))}
    </main>
  );
}
