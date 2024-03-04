import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import clienteAxios from "../config/axios";

const ShoopingCartContext = createContext();


// eslint-disable-next-line react/prop-types
const ShoopingCartProvider = ({ children }) => {
    const [shoopingCarts, setShoopingCarts] = useState([])
    const [totalProduct,setTotalProduc]=useState(0)
    const [totalPrice,setTotalPrice]=useState(0)

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
            await clienteAxios.post('/shopping/amount', {id}, config);
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

           // console.log(updatedCarts)
            

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
                totalProduct,setTotalProduc,
                totalPrice,setTotalPrice

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