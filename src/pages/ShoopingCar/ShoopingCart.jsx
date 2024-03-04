import React from 'react'
import useShoopingCart from '../../hooks/useShoopingCart'
import Cart from './Cart';

const ShoopingCart = () => {
   const { shoopingCarts,totalProduct,totalPrice } = useShoopingCart();

   return (
      <main className=" mt-40 md:mt-52">
         <h2 className=' text-4xl m-10 font-bold'>Carrito Compras</h2>
         {shoopingCarts.map((store, index) => (
               <Cart key={index} store={store}  />
         ))}

         <div className='m-10 '>{totalProduct}</div>   
         <div className='m-10 '>{totalPrice}</div>   


        

      </main>

   )
}

export default ShoopingCart
