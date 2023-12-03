import Link from "next/link";
import Modal from "./ui/Modal";
import { getTodos, addTodo } from "./api/todosAPI";
import TodoList from "./ui/TodoList";
import PaginationBox from "./ui/PaginationBox";
import { Input, Button } from "@nextui-org/react";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};
// export type Props = {
//   searchParams: Record<string, string>|null|undefined;
// };

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    limit?: string;
    page?: string;
    modal?: string;
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
  console.log("totalPages:", totalPages);
  console.log("page:", page);

  return (
    <main className="container px-4">
      <div className="flex flex-col gap-8">
        <TodoList todos={todos} />
        <PaginationBox totalPages={totalPages} page={page} />
        <form action={addTodo} className="my-50 mx-10">
          <Input name="title" />
          <Button type="submit">Add Todo</Button>
        </form>
      </div>
    </main>
  );
}
