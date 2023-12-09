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
    <main className="container">
      <div className=" md:h-screen flex flex-col gap-6 items-center py-10">
        <h1 className="text-xl md:text-2xl lg:text-4xl ">Todo List:</h1>
        <PaginationBox totalPages={totalPages} page={page} />
        <div className="grow">
          <TodoList todos={todos} />
        </div>

        <form action={addTodo} className="flex flex-row gap-4 w-full">
          <Input
            className="grow"
            name="title"
            variant="faded"
            label="Todo title"
          />
          <Button
            type="submit"
            color="primary"
            className="ml-auto self-stretch"
            size="lg"
          >
            Add Todo
          </Button>
        </form>
      </div>
    </main>
  );
}
