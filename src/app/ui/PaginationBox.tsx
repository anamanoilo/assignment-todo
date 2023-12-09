"use client";
import { Pagination } from "@nextui-org/pagination";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Todo } from "../page";

export default function PaginationBox({
  totalPages,
  page,
}: {
  totalPages: number;
  page: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const onChange = (pageToGo: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageToGo.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination
      showControls
      total={totalPages}
      initialPage={page}
      onChange={onChange}
      page={page}
      variant="faded"
    />
  );
}
