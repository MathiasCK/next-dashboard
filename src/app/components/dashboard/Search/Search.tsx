import { FC } from "react";
import styles from "./search.module.css";
import { MdSearch } from "react-icons/md";

interface Props {
  placeholder: string;
}

const Search: FC<Props> = ({ placeholder }) => {
  return (
    <div className={styles.container}>
      <MdSearch />
      <input type="text" placeholder={placeholder} className={styles.input} />
    </div>
  );
};

export default Search;
