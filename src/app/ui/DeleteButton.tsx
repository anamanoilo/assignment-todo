import { deleteTodo } from "../api/todosAPI";
import { Button } from "@nextui-org/react";

export default function DeleteButton({ id }: { id: number }) {
  const deleteTodoWithId = deleteTodo.bind(null, id);
  return (
    <form action={deleteTodoWithId}>
      <Button type="submit" color="danger" variant="bordered">
        Delete
      </Button>
    </form>
  );
}
