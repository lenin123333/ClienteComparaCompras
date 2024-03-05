import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import clienteAxios from "../config/axios";

const ShoopingCartContext = createContext();


// eslint-disable-next-line react/prop-types
const ShoopingCartProvider = ({ children }) => {
    const [shoopingCarts, setShoopingCarts] = useState([])
    
    const [totalProductState,setaTotalProductState]=useState(0)
    const [totalPriceState,setTotalPriceState]=useState(0)

    const [alerta, setAlerta] = useState({})

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
                console.log(data)
                setShoopingCarts(data)
            } catch (error) {
                navigate('/productos');
            }
        };



        getData();





    }, []);

    const showAlerta = alerta => {
        setAlerta(alerta)
        setTimeout(() => {
            setAlerta({})
        }, 2000)
    }

    const handleAddProduct = async id => {

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
            const {data}=await clienteAxios.post('/shopping/amount', {id}, config);
            var totalProd=0;
            var totalCant=0;
            const updatedCarts = shoopingCarts.map(store => {
                const newArreglo = store.products.find(product =>
                    product._id.toString() === id.toString()
                );
        
                if (newArreglo) {
                    newArreglo.amount = newArreglo.amount + 1;
        
                    const newArregloMut = store.products.map(product =>
                        product._id.toString() === id.toString() ? newArreglo : product
                    );
        
                    store.products = newArregloMut;
                }
                
                return store;
            });

           console.log(data)
            
           setaTotalProductState(data[0].totalAmount)
           setTotalPriceState(data[0].totalPrice)
            setShoopingCarts(updatedCarts)





            setAlerta({
                msg: "Producto Agregado",
                type: 'success'
            })

            setTimeout(() => {
                setAlerta({})
            }, 3000)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <ShoopingCartContext.Provider
            value={{
                shoopingCarts,
                handleAddProduct,
                showAlerta,
                alerta,
                totalProductState, totalPriceState, 
                setaTotalProductState, setTotalPriceState 

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