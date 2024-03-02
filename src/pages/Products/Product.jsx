import { useState } from "react";

const Product = ({ item }) => {

    const [quantities, setQuantities] = useState({});

    const handleIncrement = (store) => {
        console.log(store);
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [store]: (prevQuantities[store] || 0) + 1,
        }));
    };

    const handleDecrement = (store) => {
        if (quantities[store] > 1) {
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
            <h3 className='p-2 text-xl font-bold'>{item.name}</h3>
            <h4 className='pl-2 text-sm'>{item.category.name}</h4>

            <form className="flex flex-col items-center justify-between ">

                {item.prices.map((price, i) => (
                    <div key={i} className="flex flex-row items-center space-x-4"> {/* Añade la clase space-x-4 para un espacio horizontal entre los elementos */}

                        <span>{price.store.name}: ${price.price}.00</span>
                        {(
                            <>
                                <button type="button" onClick={() => handleDecrement(price.store._id)} className="p-2 font-bold text-white m-1 bg-sky-500">
                                    -
                                </button>
                                <input className="p-2 w-10 text-center m-1" type="number" value={quantities[price.store._id] || 0} readOnly />
                                <button type="button" onClick={() => handleIncrement(price.store._id)} className="p-2 font-bold text-white m-1 bg-sky-500">
                                    +
                                </button>
                            </>
                        )}

                    </div>
                ))}

                <button className="p-2 bg-sky-500 w-3/6 text-white mt-4 rounded-sm">Agregar Carrito</button>

            </form>

        </div>




    )
}

export default Product
