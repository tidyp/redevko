export type actionFunction = (
  prevState: any,
  formData: FormData,
) => Promise<{ message: string }>;

export type PostProps = {
  id: string;
  title: string;
  content: string;
  category: string;
  image: number;
};
