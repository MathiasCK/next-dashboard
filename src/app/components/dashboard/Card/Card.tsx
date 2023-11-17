import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./Card.module.css";
const Card = () => {
  return (
    <div className={styles.container}>
      <MdSupervisedUserCircle size={34} />
      <div className={styles.texts}>
        <span>Total users</span>
        <span>10</span>
        <span>
          <span className={styles.positive}>12%</span> more than previous week
        </span>
      </div>
    </div>
  );
};

export default Card;
