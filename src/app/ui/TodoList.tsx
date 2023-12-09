// "use client";
import { Card, CardBody, Checkbox, Button } from "@nextui-org/react";
import { Todo } from "../page";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

export default function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <ul className="h-full w-ful grid  grid-cols-1 lg:grid-cols-2 gap-4">
      {todos?.map((todo) => (
        <li key={todo.id}>
          <Card isHoverable className="h-full">
            <CardBody className="w-full flex flex-nowrap flex-row items-start gap-8 ">
              <div className="w-full flex items-baseline ">
                <Checkbox
                  defaultSelected={todo.completed}
                  color="success"
                  // onChange={() => {}}
                />
                <p className="text-sm md:text-base xl:text-lg">{todo.title}</p>
              </div>
              <div className="flex gap-4 items-center ml-auto">
                <EditButton id={todo.id} />
                <DeleteButton id={todo.id} />
              </div>
            </CardBody>
          </Card>
        </li>
      ))}
    </ul>
  );
}
