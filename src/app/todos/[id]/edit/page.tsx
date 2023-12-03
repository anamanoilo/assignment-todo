import {
  Card,
  CardBody,
  Input,
  Button,
  Checkbox,
  Textarea,
} from "@nextui-org/react";
import { updateTodo, GetTodoById } from "../../../api/todosAPI";

export default async function EditTodo({ params }: { params: { id: number } }) {
  const todoId = params.id;
  const { id, title, completed, description } = await GetTodoById(todoId);
  const updateTodoWithId = updateTodo.bind(null, id);
  return (
    <main>
      <div className="container px-4">
        <form action={updateTodoWithId}>
          <Card>
            <CardBody>
              <Checkbox
                name="completed"
                color="success"
                defaultValue={completed}
              />
              <Input name="title" label="Title" value={title} />
              <Textarea
                name="description"
                label="Description"
                placeholder="Enter your description"
                className="max-w-xs"
                defaultValue={description ? description : ""}
              />
              <Button type="submit">Save</Button>
            </CardBody>
          </Card>
        </form>
      </div>
    </main>
  );
}
