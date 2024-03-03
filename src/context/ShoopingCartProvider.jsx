import { createContext, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import clienteAxios from "../config/axios";

const ShoopingCartContext = createContext();


// eslint-disable-next-line react/prop-types
const ShoopingCartProvider = ({children}) =>{
    const[shoopingCarts,setShoopingCarts]=useState([])
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
              const { data } = await clienteAxios('/shopping', config);
              console.log(data[0].totalAmount)
              setShoopingCarts(data)
           } catch (error) {
              navigate('/productos');
           }
        };
  

        
            getData();
         
        
  
        
     
     }, []);

    return(
        <ShoopingCartContext.Provider 
            value={{
                shoopingCarts

            }}
        >
            {children}
        </ShoopingCartContext.Provider>
    )
}

export {
    ShoopingCartProvider
}

export default ShoopingCartContext;