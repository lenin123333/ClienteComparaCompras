import { useState,useEffect, createContext } from "react";
import {useNavigate} from 'react-router-dom'
import clienteAxios from "../config/axios";

const ProductContext = createContext();


// eslint-disable-next-line react/prop-types
const ProductProvider = ({children}) =>{
    const [modalCategory, setModalCategory] = useState(false)
    const [modalProduct, setModalProduct] = useState(false)
    const [modalProfile, setModalProfile] = useState(false)
    const [modalStore, setModalStore] = useState(false)
    const [alerta, setAlerta] = useState({})
    
    const handleModalCategory = () => {
        setAlerta({})
        setModalCategory(!modalCategory)
        
    }
    const handleModalProduct = () => {
        setAlerta({})
        setModalProduct(!modalProduct)
        
    }
    const handleModalProfile = () => {
        setAlerta({})
        setModalProfile(!modalProfile)
        
    }
    const handleModalStore = () => {
        setAlerta({})
        setModalStore(!modalStore)
        
    }

    return(
        <ProductContext.Provider 
            value={{
              handleModalCategory,
              modalCategory,
              alerta,
              handleModalProduct,
              modalProduct,
              handleModalProfile,
              modalProfile,
              handleModalStore,
              modalStore

            }}
        >
            {children}
        </ProductContext.Provider>
    )
}

export {
    ProductProvider
}

export default ProductContext;