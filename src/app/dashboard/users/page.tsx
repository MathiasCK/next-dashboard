import { Pagination, Search } from "@/app/components/dashboard";
import styles from "./users.module.css";
import Link from "next/link";
import Image from "next/image";
import { fetchUsers } from "@/utils/data";
import { NextPage } from "next";
import { UserResponse } from "@/types";

interface Props {
  searchParams: {
    q?: string;
    page?: string;
  };
}
const UsersPage: NextPage<Props> = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || "1";
  const { users, count }: UserResponse = await fetchUsers(q, page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user ..." />
        <Link href="/dashboard/users/add">
          <button className={styles.addButton}>Add new</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Created at</td>
            <td>Role</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={user.img || "/noavatar.png"}
                    width={40}
                    height={40}
                    className={styles.userImage}
                    alt=""
                  />
                  {user.username}
                </div>
              </td>
              <td>{user.email}</td>
              <td>{user.createdAt.toString().slice(4, 16)}</td>
              <td>{user.isAdmin ? "Admin" : "Client"}</td>
              <td>{user.isActive ? "Active" : "Passive"}</td>
              <td>
                <Link href={`/dashboard/users/${user.id}`}>
                  <button className={`${styles.button} ${styles.view}`}>
                    View
                  </button>
                </Link>
                <button className={`${styles.button} ${styles.delete}`}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default UsersPage;
