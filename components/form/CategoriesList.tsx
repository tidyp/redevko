import Link from 'next/link';

const categories = [
  ['discuss', 'Discuss'],
  ['question', 'question'],
  ['event', 'event'],
  ['team', 'team'],
];

export default function CategoriesList({
  selectCategory,
}: {
  selectCategory: string;
}) {
  return (
    <section>
      <ul className='mb-4 flex items-center gap-4'>
        {categories.map(([category, label]) => (
          <li key={category}>
            <Link
              href={`/post/new/?category=${category}`}
              className={`${
                selectCategory === category ? 'text-primary' : 'text-gray-500'
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
