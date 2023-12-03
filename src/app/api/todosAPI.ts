"use server";
import { Todo } from "../page";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
    const todos: Todo[] = response.data.map(
      ({ id, title, completed }: Todo) => {
        return {
          id,
          title,
          completed,
        };
      }
    );
    return { todos, totalItems };
  } catch (error) {
    throw error;
  }
}
export async function GetTodoById(id: number) {
  const response = await axios.get(`/todos/${id}`);
  return response.data;
}

export async function addTodo(formData: FormData) {
  const rawFormData = {
    title: formData.get("title"),
  };
  const todoToAdd = {
    ...rawFormData,
    completed: false,
  };
  const response = await axios.post("/todos", todoToAdd);
  revalidatePath("/");
  redirect(`/?page=${Math.ceil(response.data.id / 10)}`);
}

export async function updateTodo(id: number, formData: FormData) {
  console.log("formData:", formData);
  const rawFormData = {
    title: formData.get("title"),
    description: formData.get("description"),
    completed: formData.get("completed"),
  };
  const todoToUpdate = {
    ...rawFormData,
    id,
  };
  const response = await axios.put(`/todos/${id}`, todoToUpdate);
  console.log("response.data:", response.data);
  revalidatePath("/");
}

export async function deleteTodo(id: number) {
  console.log("id:", id);
  const response = await axios.delete(`/todos/${id}`);
  console.log("response:", response.data);
  revalidatePath("/");
}
