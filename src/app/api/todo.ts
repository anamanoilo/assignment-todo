import axios from "axios";

axios.defaults.baseURL = process.env.API_URL;

export async function GET() {
  try {
    const response = await axios.get("/todos");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
