
import useProduct from "../../hooks/useProduct";

import Product from "./Product";

const Products = () => {
  const {
    products
  } = useProduct();


  return (
    <main>
      {
        products.map(item => (
          <Product key={item._id} item={item} />
        ))
      }


    </main>
  )
}

export default Products
