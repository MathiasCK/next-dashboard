import styles from "./add-user.module.css";
const AddUserPage = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <input type="text" placeholder="username" name="username" required />
        <input type="email" placeholder="email" name="email" required />
        <input
          type="password"
          placeholder="password"
          name="password"
          required
        />
        <input type="phone" placeholder="phone" name="phone" />
        <select name="isAdmin" id="isAdmin">
          <option value="false" selected>
            Is Admin?
          </option>
          <option value="false">Yes</option>
          <option value="false">No</option>
        </select>
        <select name="isActive" id="isActive">
          <option value="false" selected>
            Is Active?
          </option>
          <option value="false">Yes</option>
          <option value="false">No</option>
        </select>
        <textarea
          required
          name="address"
          id="address"
          rows={16}
          placeholder="Address"
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUserPage;
