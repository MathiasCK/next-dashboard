"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import styles from "./Pagination.module.css";
import { FC } from "react";

interface Props {
  count: number;
}

const Pagination: FC<Props> = ({ count }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);
  const page = searchParams.get("page") || "1";

  const itemsPerPage = parseInt(
    process.env.NEXT_PUBLIC_ITEMS_PER_PAGE as string,
  );

  const hasPrev = itemsPerPage * (parseInt(page) - 1) > 0;
  const hasNext = itemsPerPage * (parseInt(page) - 1) + itemsPerPage < count;

  const handleChangePage = (type: "prev" | "next") => {
    type === "prev"
      ? params.set("page", `${parseInt(page) - 1}`)
      : params.set("page", `${parseInt(page) + 1}`);

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPrev}
        onClick={() => handleChangePage("prev")}
      >
        Previous
      </button>
      <button
        className={styles.button}
        disabled={!hasNext}
        onClick={() => handleChangePage("next")}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
