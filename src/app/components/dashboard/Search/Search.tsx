"use client";
import { FC, ChangeEvent } from "react";
import styles from "./Search.module.css";
import { MdSearch } from "react-icons/md";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  placeholder: string;
}

const Search: FC<Props> = ({ placeholder }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams);

      params.set("page", "1");

      if (e.target.value) {
        params.set("q", e.target.value);
      } else {
        params.delete("q");
      }

      replace(`${pathname}?${params.toString()}`);
    },
    300,
  );

  return (
    <div className={styles.container}>
      <MdSearch />
      <input
        type="text"
        placeholder={placeholder}
        className={styles.input}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
