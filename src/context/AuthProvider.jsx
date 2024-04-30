import { useState,useEffect, createContext } from "react";
import {useNavigate} from 'react-router-dom'
import clienteAxios from "../config/axios";
import axios from "axios";

const AuthContext = createContext();


// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) =>{

    const [auth,setAuth]= useState({})
    const [cargando,setCargando]= useState(true)
     const navigate= useNavigate()
    
	const getUser = async () => {
		try {
			const url = `${import.meta.env.VITE_APP_API_URL}/api/users/login/success`;
			const { data } = await axios.get(url, { withCredentials: true });
            localStorage.setItem('token', data.user.token)
		} catch (err) {
			console.log(err);
		}
	};
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
        getUser()
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