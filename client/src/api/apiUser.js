import { API_URL } from '../config';
// READ: userinfo
// -----------------------------------------------------------------
export async function readUserinfo(id) {
  try {
    const res = await fetch(`${API_URL}user/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
}

// UPDATE: userinfo
// -----------------------------------------------------------------
export async function updateUserinfo({ id, username, profileImage }) {
  const formData = new FormData();
  formData.append("username", username);
  // formData.append("email", email);
  formData.append("profileImage", profileImage);

  const res = await fetch(`${API_URL}user/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Failed to update user. Status: ${res.status}`);
  }

  const data = await res.json();
  return data;
}

