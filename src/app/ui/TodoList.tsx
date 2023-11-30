"use client";
import { Card, CardBody } from "@nextui-org/react";
import { Todo } from "../page";

export default function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <>
      <ul className="grid gap-6">
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
    </>
  );
}
