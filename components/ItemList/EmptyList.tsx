export default function EmptyList({
  heading,
  message,
}: {
  heading: string;
  message: string;
}) {
  return (
    <div className='mt-4'>
      <h2 className='text-xl font-bold'>{heading}</h2>
      <p className='text-lg'>{message}</p>
    </div>
  );
}
