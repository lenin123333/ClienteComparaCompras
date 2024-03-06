import { createContext, useState } from "react";
import clienteAxios from "../config/axios";
import useProduct from "../hooks/useProduct";

const ShoopingCartContext = createContext();


// eslint-disable-next-line react/prop-types
const ShoopingCartProvider = ({ children }) => {
    const [shoopingCarts, setShoopingCarts] = useState([])

    const [totalProductState, setaTotalProductState] = useState(0)
    const [totalPriceState, setTotalPriceState] = useState(0)
    const{setTotalCart}=useProduct();
    const [alerta, setAlerta] = useState({})
    const[ubiStore,setUbiStore]= useState([])
    

  

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
            const { data } = await clienteAxios.post('/shopping/amount', { id }, config);
            
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
            setTotalCart(data[0].totalAmount)




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

    const handleRemoveProduct = async id => {
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
            const { data } = await clienteAxios.post('/shopping/descount', { id }, config);

            const updatedCarts = shoopingCarts.map(store => {
                const newArreglo = store.products.find(product =>
                    product._id.toString() === id.toString()
                );

                if (newArreglo) {
                    newArreglo.amount = newArreglo.amount - 1;

                    const newArregloMut = store.products.map(product =>
                        product._id.toString() === id.toString() ? newArreglo : product
                    );

                    store.products = newArregloMut;
                }

                return store;
            });

           

            setaTotalProductState(data[0].totalAmount)
            setTotalPriceState(data[0].totalPrice)
            setShoopingCarts(updatedCarts)
            setTotalCart(data[0].totalAmount)





            setAlerta({
                msg: "Producto Removido",
                type: 'success'
            })

            setTimeout(() => {
                setAlerta({})
            }, 3000)
        } catch (error) {
            console.log(error)
        }

    }


    const handleDeleteProduct = async id => {
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
            const { data } = await clienteAxios.post('/shopping/detele', { id }, config);


            const updatedCarts = shoopingCarts.map((store) => {
                const newProducts = store.products.filter((product) => product._id.toString() !== id.toString());
                store.products = newProducts;
                return store;
            });
            setShoopingCarts(updatedCarts)
            setaTotalProductState(data[0]?.totalAmount ? data[0]?.totalAmount :0)
            setTotalPriceState(data[0]?.totalPrice ? data[0]?.totalPrice :0 )
            setTotalCart(data[0]?.totalAmount ? data[0]?.totalAmount  :0)





            setAlerta({
                msg: "Producto Removido",
                type: 'success'
            })

            setTimeout(() => {
                setAlerta({})
            }, 3000)
        } catch (error) {
            console.log(error)
        }


    }

    const handleSaveShoopingCart = async () => {
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
            const { data } = await clienteAxios('/shopping/save', config);
            setUbiStore(data)
            setShoopingCarts([])
            setaTotalProductState(0)
            setTotalPriceState(0)
            setTotalCart(0)




            setAlerta({
                msg: "Carrito Guardado",
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
                totalProductState, 
                totalPriceState,
                setaTotalProductState, 
                setTotalPriceState, 
                handleRemoveProduct,
                handleDeleteProduct,
                handleSaveShoopingCart,
                ubiStore,setShoopingCarts
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