import Image from "next/image";
import styles from "./products.module.css";
import Link from "next/link";
import { Pagination, Search } from "@/app/components/dashboard";
const ProductsPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a product ..." />
        <Link href="/dashboard/products/add">
          <button className={styles.addButton}>Add new</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Description</td>
            <td>Price</td>
            <td>Created at</td>
            <td>Stock</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noproduct.jpg"
                  width={40}
                  height={40}
                  className={styles.productImage}
                  alt=""
                />
                iPhone
              </div>
            </td>
            <td>Description</td>
            <td>$999</td>
            <td>12.12.2021</td>
            <td>12</td>
            <td>
              <Link href="/dashboard/products/1">
                <button className={`${styles.button} ${styles.view}`}>
                  View
                </button>
              </Link>
              <button className={`${styles.button} ${styles.delete}`}>
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default ProductsPage;
