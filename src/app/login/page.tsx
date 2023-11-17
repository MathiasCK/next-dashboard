import styles from "./login.module.css";
import { Loginform } from "../components/login";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <Loginform />
    </div>
  );
};

export default LoginPage;
