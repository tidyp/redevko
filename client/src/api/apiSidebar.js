import { API_URL } from '../config';

export async function getSideBar() {
  try {
    const res = await fetch(`${API_URL}sidebar`);
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
