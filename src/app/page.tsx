import { getTodos } from "./api/todo";
import TodoList from "./ui/TodoList";
import PaginationBox from "./ui/PaginationBox";

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    limit?: string;
    page?: string;
  };
}) {
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;
  const {
    todos,
    totalItems,
  }: {
    todos: Todo[];
    totalItems: number;
  } = await getTodos({ limit, page });
  const totalPages = Math.ceil(totalItems / limit);
  return (
    <main className="container mx-auto px-4 py-6">
      <p>Home</p>
      <TodoList todos={todos} />

      <PaginationBox totalPages={totalPages} page={page} />
    </main>
  );
}
