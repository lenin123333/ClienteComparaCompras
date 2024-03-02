import { useState } from "react";

const Product = ({ item }) => {

    const [quantities, setQuantities] = useState({});

    const handleIncrement = (store) => {

        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [store]: (prevQuantities[store] || 0) + 1,
        }));
    };

    const handleDecrement = (store) => {
        if (quantities[store] > 0) {
            setQuantities((prevQuantities) => ({
                ...prevQuantities,
                [store]: prevQuantities[store] - 1,
            }));
        }
    };

    return (
        <div className='w-1/4 rounded-lg shadow-lg m-2 p-2 flex flex-col items-center'>
            <div className="rounded-lg overflow-hidden">
                <img
                    src={`${import.meta.env.VITE_CLOUD_URL}/${item.imagen}`}
                    alt={`Imagen ${item.name}`}
                    className="w-full h-48 object-cover"
                />
            </div>
            <h3 className='p-2 text-2xl font-bold'>{item.name}</h3>
            <h4 className='pl-2 text-xs'>{item.category.name}</h4>
            <form className="flex flex-col items-center mt-auto">

                <table>
                    <tbody>
                        {item.prices.map((price, i) => (
                            <tr key={i}>
                                <td>
                                    <h5 className=" text-lg ">{price.store.name}: <span className=" font-bold">$ {price.price}.00</span></h5>
                                </td>
                                <td className="flex items-center space-x-2">
                                    <button type="button" onClick={() => handleDecrement(price.store._id)} className="p-2 font-bold text-white m-1 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" className=" h-7 w-7" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" /></svg>
                                    </button>
                                    <input className="p-2 w-14 text-xl text-center m-1 bg-transparent" type="number" value={quantities[price.store._id] || 0} readOnly />
                                    <button type="button" onClick={() => handleIncrement(price.store._id)} className="p-2 font-bold text-white m-1 ">
                                        <svg className=" h-7 w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" /></svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button className="p-2 bg-sky-500 text-white rounded-sm mt-4 hover:bg-sky-600">
                    Agregar Carrito
                </button>

            </form>







        </div>




    )
}

export default Product
