import { useState,useEffect, createContext } from "react";
import {useNavigate} from 'react-router-dom'
import clienteAxios from "../config/axios";

const AuthContext = createContext();


const AuthProvider = ({children}) =>{

    const [auth,setAuth]= useState({})
    const [cargando,setCargando]= useState(true)
     const navigate= useNavigate()
    useEffect(() =>{
        const autenticarUusario = async() =>{
            const token= localStorage.getItem('token');
            if(!token){
                setCargando(false)
                return
            } 


            const config= {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization:`Bearer ${token}`  
                }
            }
            try {
                const {data} = await clienteAxios('/users/profile',config)
                setAuth(data);
                navigate('/Productos')
            } catch (error) {
                setAuth({})
            }finally{
                setCargando(false); //
            }
            
            
        }
        autenticarUusario()
    },[])

    const cerrarSesionAuth=()=>{
        setAuth({})
        localStorage.setItem('token','')
    }

    return(
        <AuthContext.Provider 
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesionAuth

            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;