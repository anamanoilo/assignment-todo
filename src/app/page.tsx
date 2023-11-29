import { GET } from "./api/todo";
import { Card, CardBody } from "@nextui-org/react";

export default async function Home() {
  const todos = await GET();
  console.log(todos);
  return (
    <main className="container mx-auto px-4 py-6">
      <p>Home</p>
      {/* <Pagination totalPages={totalPages} /> */}
      <ul className="grid gap-4">
        {todos.map((todo) => (
          <li key={todo.id}>
            <Card>
              <CardBody>
                <p>{todo.title}</p>
              </CardBody>
            </Card>
          </li>
        ))}
      </ul>
    </main>
  );
}
