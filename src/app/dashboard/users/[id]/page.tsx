import Image from "next/image";
import styles from "./user.module.css";

const SingleUserPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src="/noavatar.png" alt="" fill />
        </div>
        John Doe
      </div>
      <div className={styles.formContainer}>
        <form action="" className={styles.form}>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" placeholder="John Doe" />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="John@gmail.com" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="John Doe" />
          <label htmlFor="phone">Phone</label>
          <input type="phone" name="phone" placeholder="12345678" />
          <label htmlFor="address">Address</label>
          <input type="phone" name="address" placeholder="Address" />
          <label htmlFor="isAdmin">Is admin?</label>
          <select name="isAdmin" id="isAdmin">
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <label htmlFor="isActive">Is active?</label>
          <select name="isActive" id="isActive">
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;
