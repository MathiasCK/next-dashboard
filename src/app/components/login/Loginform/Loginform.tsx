import styles from "./Loginform.module.css";
const Loginform = () => {
  return (
    <form action="" className={styles.form}>
      <h1>Login</h1>
      <input type="text" placeholder="Username" />
      <input type="text" placeholder="Password" />
      <button>Login</button>
    </form>
  );
};

export default Loginform;
