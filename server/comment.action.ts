'use server';

export const createCommentAction = async (
  prevState: any,
  formData: FormData,
) => {
  const rawData = Object.fromEntries(formData);
  console.log(rawData);
  return { message: 'create comment' };
};

export const fetchPropertyComments = async () => {
  return { message: 'fetch comments' };
};

export const fetchPropertyCommentsByUser = async () => {
  return { message: 'fetch user comments' };
};

export const deleteCommentAction = async () => {
  return { message: 'delete  comments' };
};
