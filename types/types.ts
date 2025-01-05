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

export type TDataList = {
  category: string;
  id: string;
  title: string;
  image: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  profileId: string;
  profile: {
    profileImage: string;
  };
};
