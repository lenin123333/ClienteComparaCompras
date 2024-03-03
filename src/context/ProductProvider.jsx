import { useState, createContext, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import clienteAxios from "../config/axios";

const ProductContext = createContext();


// eslint-disable-next-line react/prop-types
const ProductProvider = ({children}) =>{
    const[products,setProducts] = useState([])
    const [modalCategory, setModalCategory] = useState(false)
    const [categorys,setCategorys] = useState([])
    const [modalProduct, setModalProduct] = useState(false)
    const [modalProfile, setModalProfile] = useState(false)
    const [modalStore, setModalStore] = useState(false)
    const[totalCart,setTotalCart] = useState(0)
    const [stores,setStores] = useState([])
    const [alerta, setAlerta] = useState({})
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const getData = async () => {
           const token = localStorage.getItem('token');
           if (!token) {
              console.log("error");
           }
           const config = {
              headers: {
                 'Content-Type': 'application/json',
                 Authorization: `Bearer ${token}`
              }
           };
  
           try {
              const { data } = await clienteAxios('/products', config);
              setProducts(data[0]);
              setTotalCart(data[1][0].totalAmount)
              
           } catch (error) {
              navigate('/productos');
           }
        };
  

        if (products.length === 0) {
            getData();
         }
        
  
        
     
     }, [products]);
  

    const getCategory = async()=>{
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

    const getStore = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
           console.log("error");
        }
        const config = {
           headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
           }
        };

        try {
           const { data } = await clienteAxios('/products/store', config);
           setStores(data);
        } catch (error) {
           navigate('/productos');
        }
     };
    const handleModalCategory = async () => {
        setAlerta({})
        setModalCategory(!modalCategory)
        getCategory()
       
    }

    const handleModalProduct = () => {
        setAlerta({})
        setModalProduct(!modalProduct)
        getCategory()
        getStore()
        
    }
    const handleModalProfile = () => {
        setAlerta({})
        setModalProfile(!modalProfile)
        
    }
    const handleModalStore = async () => {
        setAlerta({})
        setModalStore(!modalStore)
        
        
    }
    const showAlerta = alerta => {
        setAlerta(alerta)
        setTimeout(() => {
            setAlerta({})
        }, 2000)
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



    const handleSubmitSotre= async objetStore =>{
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
            const { data } = await clienteAxios.post(`/products/store`, objetStore, config)
            setStores([...stores,data])
            setAlerta({
                msg: "Tienda Agregada",
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


    const handleSubmitProduct= async producto =>{
        setLoading(true)
        const token = localStorage.getItem('token');
        if (!token) {
            console.log("error")
        }
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const { data } = await clienteAxios.post(`/products`, producto, config)

           setProducts([...products,data])
            setAlerta({
                msg: "Producto Agregado",
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
        setLoading(false)
    }

    const handleSubmitShoopinCart= async shoopingCart =>{
        setLoading(true)
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
            const { data } = await clienteAxios.post(`/shopping`, shoopingCart, config)
            setTotalCart(data[0].totalAmount)
            setAlerta({
                msg: "Producto Agregado Al Carrito",
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
        setTimeout(() => {
            setAlerta({})
        }, 2000)
        setLoading(false)
    }

    return(
        <ProductContext.Provider 
            value={{
              alerta,
              handleModalCategory,
              modalCategory,
              handleSubmitCategory,
              categorys,
              handleModalProduct,
              modalProduct,
              handleSubmitProduct,
              stores,
              setStores,
              handleSubmitSotre,
              handleModalProfile,
              modalProfile,
              handleModalStore,
              modalStore,
              showAlerta,
              loading,
              products,
              handleSubmitShoopinCart,
              totalCart

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