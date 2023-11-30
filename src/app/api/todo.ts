import axios from "axios";

axios.defaults.baseURL = process.env.API_URL;

export async function getTodos({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  const params = new URLSearchParams({
    _page: page.toString(),
    _limit: limit.toString(),
  });
  try {
    const response = await axios.get(`/todos?${params}`);
    const totalItems = response.headers["x-total-count"];
    return { todos: response.data, totalItems };
  } catch (error) {
    throw error;
  }
}
