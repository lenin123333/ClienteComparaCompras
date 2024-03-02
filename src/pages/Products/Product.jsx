/* eslint-disable react/prop-types */
import { useState } from "react";
import useProduct from "../../hooks/useProduct";
import Alerta from "../../components/Alerta";
import Spiner from "../../components/Spiner";

// eslint-disable-next-line react/prop-types
const Product = ({ item }) => {

    const [quantities, setQuantities] = useState([]);
    const [product, setProdct] = useState([])
    const { handleSubmitShoopinCart,alerta, showAlerta } = useProduct();
    const [loadingProduct, setLoadingProduct] = useState(false); // Estado de carga individual para el producto actual

    const handleIncrement = (store) => {
        const data = {
            'product': store[2],
            'store': store[0]._id,
            'amount': 1,
            'price': store[1]
        }
        if (product.length > 0) {
            const producSearch = product.find(itemNew =>
                itemNew.store.toString() === data.store.toString() && itemNew.product.toString() === data.product.toString()
            )
            const producNew = product.filter(itemNew =>
                itemNew.store.toString() !== data.store.toString() || itemNew.product.toString() !== data.product.toString()
            )
            if (producSearch) {
                producSearch.amount += 1
                setProdct([...producNew, producSearch])
            } else {
                setProdct([...product, data])
            }

        } else {
            setProdct([data])
        }

        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [store[0]._id]: (prevQuantities[store[0]._id] || 0) + 1,
          }));


         


    };

    const handleDecrement = (store) => {
      
        if (quantities[store[0]._id] > 0) {
            setQuantities((prevQuantities) => ({
                ...prevQuantities,
                [store[0]._id]: prevQuantities[store[0]._id] - 1,
            }));

            const data = {
                'product': store[2],
                'store': store[0]._id,
                'amount': 1,
                'price': store[1]
            }
            if (product.length > 0) {
                const producSearch = product.find(itemNew =>
                    itemNew.store.toString() === data.store.toString() && itemNew.product.toString() === data.product.toString()
                )
                const producNew = product.filter(itemNew =>
                    itemNew.store.toString() !== data.store.toString() || itemNew.product.toString() !== data.product.toString()
                )
                if (producSearch) {
                    producSearch.amount -= 1
                    setProdct([...producNew, producSearch])
                } else {
                    setProdct([...product, data])
                }
    
            } else {
                setProdct([data])
            }
           
        }else{
            setProdct([])
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if(product.length < 1){
            return showAlerta({
                msg: 'No Se Han Seleccionado Productos',
                type: 'error'
            })
        }
        setLoadingProduct(true);
        await  handleSubmitShoopinCart({
            'cart': product
        })
        setLoadingProduct(false);
        setProdct([])
        setQuantities([])
    }
    const { msg } = alerta
    return (
        <div className='xl:w-1/4 lg:w-1/3  rounded-lg shadow-lg m-2 p-2 flex flex-col items-center '>
            {msg && <Alerta alerta={alerta} />}


            <div className="rounded-lg overflow-hidden " >
                <img
                    src={`${import.meta.env.VITE_CLOUD_URL}/${item.imagen}`}
                    alt={`Imagen ${item.name}`}
                    className="w-full h-48 object-cover"
                />
            </div>
            <h3 className='p-2 text-2xl font-bold'>{item.name}</h3>
            <h4 className='pl-2 text-xs'>{item.category.name}</h4>
            <form onSubmit={handleSubmit} className="flex flex-col items-center mt-auto relative">
                {loadingProduct &&(
                    <div className="absolute inset-0 flex items-center justify-center m-auto bg-white bg-opacity-70 z-5">
                        <Spiner />
                    </div>
                )}
                <table>
                    <tbody>
                        {item.prices.map((price, i) => (
                            <tr key={i}>
                                <td>
                                    <h5 className="text-lg">
                                        {price.store.name}: <span className="font-bold">$ {price.price}.00</span>
                                    </h5>
                                </td>
                                <td className="flex items-center space-x-2">
                                    <button type="button" onClick={() => handleDecrement([price.store, price.price, item._id])} className="p-2 font-bold text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 448 512">
                                            <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                                        </svg>
                                    </button>
                                    <input className="p-2 w-14 text-xl text-center m-1 bg-transparent" type="number" value={quantities[price.store._id] || 0} readOnly />
                                    <button type="button" onClick={() => handleIncrement([price.store, price.price, item._id])} className="p-2 font-bold text-white">
                                        <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button type="submit" className="p-2 bg-sky-500 text-white rounded-sm mt-4 hover:bg-sky-600">
                    Agregar Carrito
                </button>
            </form>








        </div>




    )
}

export default Product
