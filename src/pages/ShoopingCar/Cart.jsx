import { useEffect, useState } from 'react'
import useShoopingCart from '../../hooks/useShoopingCart'
import Alerta from '../../components/Alerta'

const Cart = ({ store }) => {
    
    
    const {alerta,handleAddProduct} = useShoopingCart()
    const [totalProducts, setTotalProducts] = useState(0);
    const [subtotal, setSubtotal] = useState(0);

    useEffect(() => {
        // Calcular el total de productos y el subtotal
        const totalProductsCount = store.products.reduce((acc, product) => {
           return acc + product.amount;
        }, 0);
  
        const subtotalAmount = store.products.reduce((acc, product) => {
           return acc + (product.amount * product.price);
        }, 0);
  
        // Actualizar el estado con los totales
        setTotalProducts(totalProductsCount);
        setSubtotal(subtotalAmount);
        
     }, [store.products]);


     
    const handleAdd = (id) =>{
        handleAddProduct(id)
    }
    

    
    const { msg } = alerta
    return (
        <div className='shadow-lg m-8 p-8'>
             {msg && <Alerta alerta={alerta} />}
               
            <h3 className='text-2xl font-bold'>Tienda: <span className=' font-normal'>{store.storeName[0]}</span></h3>

            <table className="w-full mt-4">
                <thead>
                    <tr>
                        <th className='text-left'>Productos</th>
                        <th className='text-center'>Cantidad</th>
                        <th className='text-center'>Precio</th>
                        <th className='text-center'>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {store.products.map(product => (
                       
                        <tr key={product._id} className='border-b-4 text-xl border-orange-400'>
                             

                            <td className='text-left p-2 m-2'>
                                <p className=' m-2 text-2xl'>{product.productName}</p>
                                <div className="rounded-lg  " >
                                    <img
                                        src={`${import.meta.env.VITE_CLOUD_URL}/${product.image}`}
                                        alt={`Imagen ${product.productName}`}
                                        className="w-48 h-48 object-cover"
                                    />
                                </div>
                            </td>

                            <td className='text-center'>
                                <div className=' flex justify-center'>
                                    <button type="button" className="p-2 font-bold text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 448 512">
                                            <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                                        </svg>
                                    </button>
                                    <p className=' text-center m-2 p-2 text-lg'> {product.amount}</p>
                                    <button type="button" onClick={()=>handleAdd(product._id)} className="p-2 font-bold text-white">
                                        <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                                        </svg>
                                    </button>
                                </div>

                            </td>
                            <td className='text-center '>$ {product.price}.00</td>

                            <td className='text-center'>
                                <p className='font-bold'><span className='font-normal'>$ {product.price * product.amount}.00</span></p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className='flex flex-col items-end text-2xl mt-4'>
                <p className='font-bold'>Total Productos: <span className='font-normal'>{totalProducts}</span></p>
                <p className='font-bold'>Total: <span className='font-normal'>$ {subtotal}.00</span></p>
            </div>
        </div>
    )
}

export default Cart
