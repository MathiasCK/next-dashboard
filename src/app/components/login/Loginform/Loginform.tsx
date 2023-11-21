"use client";

import { authenticate } from "@/utils/actions";
import styles from "./Loginform.module.css";
import { useFormState } from "react-dom";
const Loginform = () => {
  const [state, formAction] = useFormState(authenticate, undefined);

  return (
    <form action={formAction} className={styles.form}>
      <h1>Login</h1>
      <input type="text" placeholder="Username" name="username" />
      <input type="password" placeholder="Password" name="password" />
      <button>Login</button>
      {state && <p style={{ color: "#ff7f7f" }}>{state.error}</p>}
    </form>
  );
};

export default Loginform;
