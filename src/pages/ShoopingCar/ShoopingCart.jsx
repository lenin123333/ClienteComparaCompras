import { useEffect, useState } from 'react'
import useShoopingCart from '../../hooks/useShoopingCart'
import Cart from './Cart';
import { useNavigate } from 'react-router-dom'
import clienteAxios from "../../config/axios";
import { Link } from 'react-router-dom';
import useProduct from '../../hooks/useProduct';
import Spiner from '../../components/Spiner';

const ShoopingCart = () => {
   const { shoopingCarts, totalProductState, totalPriceState,
      setaTotalProductState, setTotalPriceState, handleSaveShoopingCart, setShoopingCarts } = useShoopingCart();
   const [loading,setLoading]=useState(false)
   const { totalCart } = useProduct();
    
   const navigate = useNavigate()

   useEffect(() => {
      const getData = async () => {
         setLoading(true)
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
            console.log(data);
            setShoopingCarts(data.existOrder);

            
   
            // Actualizar el estado con los totales si es necesario
            
            setaTotalProductState(data.totalGeneral.totalProductsCount);
            setTotalPriceState(data.totalGeneral.totalCartPrice);
            
         } catch (error) {
            navigate('/productos');
         }finally{
         setLoading(false)

         }
      };

      getData();

   }, []); // Dependencia vacía para ejecutar solo una vez al montar el componente

   const [isOpen, setIsOpen] = useState(false);
   const toggleSidebar = () => {
      setIsOpen(!isOpen);
   };

   return (

      <main className="flex justify-center lg:mt-52 md:mt-64 sm:mt-52">
         {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
               <Spiner />
            </div>
         )}
         <div className="w-2/4 md:w-3/4 sm:w-full lg:mr-8">
            <h2 className='text-4xl mb-4 font-serif'>Resumen Carrito</h2>
            {shoopingCarts.map((store, index) => (
               <Cart key={index} store={store} />
            ))}
         </div>

         <div className={`${isOpen ? 'sm:w-1/2' : 'sm:w-10'} transition-all fixed flex flex-col justify-between top-2/2 right-0 mt-36 min-h-screen w-1/5 md:w-1/6 md:mt-64   p-8 bg-white shadow-lg transform -translate-y-1/2`}>
            <button onClick={toggleSidebar} className={`lg:hidden md:hidden sm:block mt-56 ${isOpen ? 'float-end' : 'float-start'}`}>
               {isOpen ?
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className=" h-6 w-6 ">
                     <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                  </svg>
                  : <svg className=" h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                     <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                  </svg>
               }
            </button>
            <div className={`mt-40  md:block lg:block ${isOpen ? 'sm:block sm:mb-40 ' : 'sm:hidden'}`}>
               <p className='text-3xl font-bold mb-4 '>Totales</p>
               <p className='mt-10 text-xl font-bold'>Total de productos: <span className=' font-normal'>{totalProductState}</span></p>
               <p className='mt-2 text-xl font-bold'>Total a pagar: <span className=' font-normal'>$ {totalPriceState}.00</span></p>
            </div>

            <Link to={'/Map-Shooping'} onClick={handleSaveShoopingCart} className={`p-2 lg:mb-20 md:mb-60 ${isOpen ? 'sm:block' : 'sm:hidden'} md:block lg:block bg-sky-600 hover:bg-sky-700 rounded-lg text-xl text-white`}>Generar Ruta</Link>


         </div>
      </main>




   )
}

export default ShoopingCart
