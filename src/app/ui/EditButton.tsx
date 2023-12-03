import { Link, Button } from "@nextui-org/react";

export default function EditButton({ id }: { id: number }) {
  return (
    <Button
      href={`/todos/${id}/edit`}
      as={Link}
      color="primary"
      variant="bordered"
    >
      Edit
    </Button>
  );
}
