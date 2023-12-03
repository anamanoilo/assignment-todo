// "use client";
import { Card, CardBody, Checkbox, Button } from "@nextui-org/react";
import { Todo } from "../page";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

export default function TodoList({ todos }: { todos: Todo[] }) {
  return (
    // <div className="container px-4">
    <ul className="flex flex-col gap-4">
      {todos.map((todo) => (
        <li key={todo.id}>
          <Card className="container">
            <CardBody className="flex">
              <div className="flex">
                <Checkbox
                  defaultSelected={todo.completed}
                  color="success"
                  // onChange={() => {}}
                />
                <p>{todo.title}</p>
              </div>
              <div className="flex gap-4 items-center">
                <EditButton id={todo.id} />
                <DeleteButton id={todo.id} />
              </div>
            </CardBody>
          </Card>
        </li>
      ))}
    </ul>
    // </div>
  );
}
