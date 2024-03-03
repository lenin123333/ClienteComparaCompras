import { useContext } from "react";

import ShoopingCartContext from "../context/ShoopingCartProvider";

const useShoopingCart=()=>{
    //Obtenemos acceso a todos los valores del AuthContext
    return useContext(ShoopingCartContext)
}

export default useShoopingCart;