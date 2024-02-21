import { useContext } from "react";
import ProductContext from "../context/ProductProvider";

const useProduct=()=>{
    //Obtenemos acceso a todos los valores del AuthContext
    return useContext(ProductContext)
}

export default useProduct;