
import useProduct from "../../hooks/useProduct";

import Product from "./Product";

const Products = () => {
  const {
    products
  } = useProduct();

  

  return (
    <main className="flex flex-wrap  m-3 flex-row justify-center mt-40 md:mt-64 ">
      {
        products.map(item => (
          <Product key={item._id} item={item} />
        ))
      }


    </main>
  )
}

export default Products
