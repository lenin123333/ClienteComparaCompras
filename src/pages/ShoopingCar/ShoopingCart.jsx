import React, { useEffect } from 'react'
import useShoopingCart from '../../hooks/useShoopingCart'
import Cart from './Cart';

const ShoopingCart = () => {
   const { shoopingCarts, totalProductState, totalPriceState, 
      setaTotalProductState, setTotalPriceState } = useShoopingCart();

   useEffect(() => {
      // Calcular el total de productos y el subtotal
      const totalProductsCount = shoopingCarts.reduce((acc, store) => {
         return acc + store.totalAmount;
      }, 0);

      const subtotalAmount = shoopingCarts.reduce((acc, store) => {
         return acc + (store.totalPrice);
      }, 0);

      // Actualizar el estado con los totales
      setaTotalProductState(totalProductsCount);
      setTotalPriceState(subtotalAmount);

   }, []);

   return (
      <main className=" mt-40 md:mt-52">
         <h2 className=' text-4xl m-10 font-bold'>Carrito Compras</h2>
         {shoopingCarts.map((store, index) => (
            <Cart key={index} store={store} />
         ))}

         <div className='m-10 '>{totalProductState}</div>
         <div className='m-10 '>{totalPriceState}</div>




      </main>

   )
}

export default ShoopingCart
