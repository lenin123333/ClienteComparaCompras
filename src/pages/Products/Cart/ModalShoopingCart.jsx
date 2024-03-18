import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import useProduct from '../../../hooks/useProduct';
import clienteAxios from '../../../config/axios';
import Compras from './Shooping';
import PaginationMenu from './PaginationMenu';

const ModalShoopingCart = () => {
  const { handleModalShoopingCart, modalShoopingCart } = useProduct();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3; // Siempre mostramos 5 compras por página
  const [shoopingCart, setShoopingCart] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getShoopingCart = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clienteAxios.post(`/shopping/show?page=${currentPage}&perPage=${itemsPerPage}`, {}, config);
        setShoopingCart(data.shoppingCart);
        console.log(data)
        setTotalPages(data.totalPages-1);
      } catch (error) {
        console.log(error);
      }
    };

    getShoopingCart();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Transition.Root show={modalShoopingCart} as={Fragment}>
      <Dialog as="div" className="fixed z-20 inset-0 overflow-y-auto" onClose={handleModalShoopingCart}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleModalShoopingCart}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-gray-900">
                    Compras
                  </Dialog.Title>
                  {shoopingCart.map((compras) => (
                    <Compras key={compras._id} compras={compras} handleModalShoopingCart={handleModalShoopingCart} />
                  ))}
                  <PaginationMenu
                    currentPage={currentPage}
                    totalPages={totalPages} // Se pasa totalPages aquí
                    onPageChange={handlePageChange}
                  />
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalShoopingCart;
