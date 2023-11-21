import { ParamsIdProps } from "@/types";
import styles from "./product.module.css";
import Image from "next/image";
import { NextPage } from "next";
import { fetchProduct } from "@/utils/data";
import { updateProduct } from "@/utils/actions";

const SingleProductPage: NextPage<ParamsIdProps> = async ({ params }) => {
  const product = await fetchProduct(params.id);
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={product.img || "/noavatar.png"} alt="" fill />
        </div>
        {product.title}
      </div>
      <div className={styles.formContainer}>
        <form action={updateProduct} className={styles.form}>
          <input type="hidden" name="id" value={product.id} />
          <label>Title</label>
          <input type="text" name="title" placeholder={product.title} />
          <label>Price</label>
          <input
            type="number"
            name="price"
            placeholder={product.price.toString()}
          />
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            placeholder={product.stock.toString()}
          />
          <label>Color</label>
          <input type="text" name="color" placeholder={product.color} />
          <label>Size</label>
          <textarea name="size" placeholder={product.size} />
          <label>Cat</label>
          <select name="cat" id="cat">
            <option value="kitchen">Kitchen</option>
            <option value="phone">Phone</option>
            <option value="computers">Computers</option>
          </select>
          <label>Description</label>
          <textarea
            name="desc"
            id="desc"
            rows={10}
            value={product.desc}
          ></textarea>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleProductPage;
