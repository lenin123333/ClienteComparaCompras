import React, { useState } from 'react'

const Product = ({ item }) => {
    const [quantity, setQuantity] = useState(0);

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    return (
        <div className=' shadow-lg m-2 p-2'>
            <div className='shadow-sm' style={{ width: '354px', height: '341px', overflow: 'hidden' }}>
                <img
                    src={`${import.meta.env.VITE_CLOUD_URL}/${item.imagen}`}
                    alt={`Imagen ${item.name}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>
            <h3 className='p-2 text-xl font-bold'>{item.name}</h3>
            <h4 className='pl-2 text-sm'>{item.category.name}</h4>


            
               
                    {item.prices.map((price, i) => (
                        <div key={i} className="flex items-center">
                            <span>{price.store.name}: ${price.price}.00</span>
                            {(
                                <form>
                                    <button type="button" onClick={handleDecrement} className="p-2 font-bold text-white m-1 bg-sky-500">
                                        -
                                    </button>
                                    <input className="p-2 w-10 text-center m-1" type="number" value={quantity} readOnly />
                                    <button type="button" onClick={handleIncrement} className="p-2 font-bold text-white m-1 bg-sky-500">
                                        +
                                    </button>
                                </form>
                            )}
                        </div>
                    ))}
                </div>
            

        
    )
}

export default Product
