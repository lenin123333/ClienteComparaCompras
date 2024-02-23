import { useState,useEffect, createContext } from "react";
import {useNavigate} from 'react-router-dom'
import clienteAxios from "../config/axios";

const ProductContext = createContext();


// eslint-disable-next-line react/prop-types
const ProductProvider = ({children}) =>{
    const [modalCategory, setModalCategory] = useState(false)
    const [categorys,setCategorys] = useState([])
    const [modalProduct, setModalProduct] = useState(false)
    const [modalProfile, setModalProfile] = useState(false)
    const [modalStore, setModalStore] = useState(false)
    const [alerta, setAlerta] = useState({})
    const navigate = useNavigate()

    const handleModalCategory = async () => {
        setAlerta({})
        setModalCategory(!modalCategory)
        if(!modalCategory){
            const token = localStorage.getItem('token');
            if (!token) {
                console.log("error")
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clienteAxios(`/products/category`, config)
                setCategorys(data)
            
            } catch (error) {
                navigate("/productos")
            }
        }
       
    }
    const handleModalProduct = () => {
        setAlerta({})
        setModalProduct(!modalProduct)
        
    }
    const handleModalProfile = () => {
        setAlerta({})
        setModalProfile(!modalProfile)
        
    }
    const handleModalStore = async () => {
        setAlerta({})
        setModalStore(!modalStore)
        
        
    }
    const mostrarAlerta = alerta => {
        setAlerta(alerta)

    }

    const handleSubmitCategory = async category =>{
        const token = localStorage.getItem('token');
        if (!token) {
            console.log("error")
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const { data } = await clienteAxios.post(`/products/category`, category, config)
            setCategorys([...categorys,data])
            setAlerta({
                msg: "Categoria Agregada",
                type: 'success'
            })
            
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                type: 'error'
            })
            if(error.response.status === 401){
                setTimeout(() => {
                    setAlerta({})
                }, 2000)
            }
        }

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
              modalStore,
              mostrarAlerta,
              handleSubmitCategory,
              categorys

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