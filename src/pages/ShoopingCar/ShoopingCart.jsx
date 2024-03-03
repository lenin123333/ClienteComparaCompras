import React from 'react'
import useShoopingCart from '../../hooks/useShoopingCart'

const ShoopingCart = () => {
    const{shoopingCarts} = useShoopingCart();
  return (
    <main className="flex flex-wrap m-3 flex-row justify-center mt-40 md:mt-52">
     {shoopingCarts.map(cart=>(
        <p key={cart._id}>{cart.totalAmount}</p>
     )
           
        )}
     250920


  </main>
   
  )
}

export default ShoopingCart
