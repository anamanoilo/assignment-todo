import { Link, Button } from "@nextui-org/react";
import { PencilIcon } from "@heroicons/react/24/outline";

export default function EditButton({ id }: { id: number }) {
  return (
    <Button
      href={`/todos/${id}/edit`}
      as={Link}
      color="primary"
      variant="bordered"
      isIconOnly
      aria-label="Edit"
      className="p-2"
    >
      <PencilIcon />
    </Button>
  );
}
