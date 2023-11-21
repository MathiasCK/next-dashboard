import { Pagination, Search } from "@/app/components/dashboard";
import styles from "./products.module.css";
import Link from "next/link";
import Image from "next/image";
import { fetchProducts } from "@/utils/data";
import { NextPage } from "next";
import { PageProps, ProductResponse } from "@/types";
import { deleteProduct } from "@/utils/actions";

const ProductsPage: NextPage<PageProps> = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || "1";
  const { products, count }: ProductResponse = await fetchProducts(q, page);

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
          {products.map(product => (
            <tr key={product._id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={product.img || "/noavatar.png"}
                    width={40}
                    height={40}
                    className={styles.productImage}
                    alt=""
                  />
                  {product.title}
                </div>
              </td>
              <td>{product.desc}</td>
              <td>${product.price}</td>
              <td>{product.createdAt.toString().slice(4, 16)}</td>
              <td>{product.stock}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/products/${product.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteProduct}>
                    <input type="hidden" name="id" value={product.id} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default ProductsPage;
