import Image from "next/image";
import styles from "./user.module.css";
import { fetchUser } from "@/utils/data";
import { NextPage } from "next";
import { ParamsIdProps } from "@/types";
import { updateUser } from "@/utils/actions";

const SingleUserPage: NextPage<ParamsIdProps> = async ({ params }) => {
  const user = await fetchUser(params.id);
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={user.img || "/noavatar.png"} alt="" fill />
        </div>
        {user.username}
      </div>
      <div className={styles.formContainer}>
        <form action={updateUser} className={styles.form}>
          <input type="hidden" name="id" value={user.id} />
          <label htmlFor="username">Username</label>
          <input type="text" name="username" placeholder={user.username} />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder={user.email} />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder={user.password} />
          <label htmlFor="phone">Phone</label>
          <input type="phone" name="phone" placeholder={user.phone} />
          <label htmlFor="address">Address</label>
          <input type="phone" name="address" placeholder={user.address} />
          <label htmlFor="isAdmin">Is admin?</label>
          <select name="isAdmin" id="isAdmin">
            <option value="true" selected={user.isAdmin === true}>
              Yes
            </option>
            <option value="false" selected={user.isAdmin === false}>
              No
            </option>
          </select>
          <label htmlFor="isActive">Is active?</label>
          <select name="isActive" id="isActive">
            <option value="true" selected={user.isActive === true}>
              Yes
            </option>
            <option value="false" selected={user.isActive === false}>
              No
            </option>
          </select>

          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;
