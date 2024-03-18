import useAuth from "../hooks/useAuth"
import { useState } from "react";
import imgPerfil from '../img/usuario-de-perfil.png'
import ModalAddCategory from "../pages/Products/ModalAddCategory";
import useProduct from "../hooks/useProduct";
import ModalAddProduct from "../pages/Products/ModalAddProduct";
import ModalAddStore from "../pages/Products/Store/ModalAddStore";
import ModalProfile from "../pages/Products/ModalProfile";
import ModalShoopingCart from "../pages/Products/ModalShoopingCart";

const Sidebar = () => {
    const { auth, cerrarSesionAuth } = useAuth()

    const handleCerrarSesion = () => {
        cerrarSesionAuth()
    }
    const {
        handleModalCategory,
        handleModalProduct,
        handleModalProfile,
        handleModalShoopingCart,
        handleModalStore,
    } = useProduct();

    

    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    return (
        <aside className={`px-5 py-10 ${isOpen ? 'sm:w-full sm:mt-24  lg:mt-36 md:mt-48  lg:w-1/5 xl:w-1/6 fixed lg:min-h-screen ' : ' md:mt-48 sm:mt-24 lg:mt-36   sm:w-full sm:overflow-hidden sm:h-2  md:w-full lg:min-h-screen  lg:w-16 xl:w-16 '}  shadow-lg  fixed bg-sky-400  transition-all flex flex-col justify-between z-20   `}  >
            <div>
                <button onClick={toggleSidebar} className={`p-1 mr-3  mb-4 ${isOpen ? 'float-end' : 'float-start'}`}>
                    {isOpen ?
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className=" h-6 w-6 ">
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                        </svg>
                        : <svg className=" h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                        </svg>
                    }
                </button>

{/* 
                <button to="/proyectos"
                    className={`hover:bg-white w-full  ${isOpen ? 'p-2' : ''}    uppercase font-bold flex mt-5 text-center rounded-lg`}
                    onClick={handleModalProfile}
                >
                    <img src={auth.nombre ? auth.img : imgPerfil} alt="" className="h-6 w-6 mr-2" />   {
                        isOpen
                            ?
                            "Ver Perfil"
                            :
                            ""

                    }
                </button>

*/}

                <button to="crear-proyecto"
                    className={`hover:bg-white w-full  ${isOpen ? 'p-2' : ''}    uppercase font-bold flex mt-5 text-center rounded-lg`}
                    onClick={handleModalStore}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-0.5" viewBox="0 0 576 512"><path d="M547.6 103.8L490.3 13.1C485.2 5 476.1 0 466.4 0H109.6C99.9 0 90.8 5 85.7 13.1L28.3 103.8c-29.6 46.8-3.4 111.9 51.9 119.4c4 .5 8.1 .8 12.1 .8c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.2 0 49.3-11.4 65.2-29c16 17.6 39.1 29 65.2 29c4.1 0 8.1-.3 12.1-.8c55.5-7.4 81.8-72.5 52.1-119.4zM499.7 254.9l-.1 0c-5.3 .7-10.7 1.1-16.2 1.1c-12.4 0-24.3-1.9-35.4-5.3V384H128V250.6c-11.2 3.5-23.2 5.4-35.6 5.4c-5.5 0-11-.4-16.3-1.1l-.1 0c-4.1-.6-8.1-1.3-12-2.3V384v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V384 252.6c-4 1-8 1.8-12.3 2.3z" /></svg>
                    {
                        isOpen ?
                            "Agregar Tienda"
                            :
                            ""
                    }
                </button>

                <button to="crear-proyecto"
                    className={`hover:bg-white w-full  ${isOpen ? 'p-2' : ''}    uppercase font-bold flex mt-5 text-center rounded-lg`}
                    onClick={handleModalCategory}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-0.5" viewBox="0 0 576 512"><path d="M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2zM476.9 209.6l53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 277.8C37.4 273.8 32 265.3 32 256s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2zm-152 198.2l152-70.2 53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 405.8C37.4 401.8 32 393.3 32 384s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0z" /></svg>
                    {
                        isOpen ?
                            "Agregar Categoria"
                            :
                            ""
                    }
                </button>

                <button
                    className={`hover:bg-white w-full  ${isOpen ? 'p-2' : ''}    uppercase font-bold flex mt-5 text-center rounded-lg`}
                    onClick={handleModalProduct}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-0.5" viewBox="0 0 512 512"><path d="M326.3 218.8c0 20.5-16.7 37.2-37.2 37.2h-70.3v-74.4h70.3c20.5 0 37.2 16.7 37.2 37.2zM504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-128.1-37.2c0-47.9-38.9-86.8-86.8-86.8H169.2v248h49.6v-74.4h70.3c47.9 0 86.8-38.9 86.8-86.8z" /></svg>
                    {
                        isOpen ?
                            "Agregar Productos"
                            :
                            ""
                    }
                </button>
                <button to="crear-proyecto"
                    className={`hover:bg-white w-full  ${isOpen ? 'p-2' : ''}    uppercase font-bold flex mt-5 text-center rounded-lg`}
                    onClick={handleModalShoopingCart}
                >
                     <svg xmlns="http://www.w3.org/2000/svg" className=" h-6 w-6" viewBox="0 0 640 512"><path d="M256 48c0-26.5 21.5-48 48-48H592c26.5 0 48 21.5 48 48V464c0 26.5-21.5 48-48 48H381.3c1.8-5 2.7-10.4 2.7-16V253.3c18.6-6.6 32-24.4 32-45.3V176c0-26.5-21.5-48-48-48H256V48zM571.3 347.3c6.2-6.2 6.2-16.4 0-22.6l-64-64c-6.2-6.2-16.4-6.2-22.6 0l-64 64c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L480 310.6V432c0 8.8 7.2 16 16 16s16-7.2 16-16V310.6l36.7 36.7c6.2 6.2 16.4 6.2 22.6 0zM0 176c0-8.8 7.2-16 16-16H368c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H16c-8.8 0-16-7.2-16-16V176zm352 80V480c0 17.7-14.3 32-32 32H64c-17.7 0-32-14.3-32-32V256H352zM144 320c-8.8 0-16 7.2-16 16s7.2 16 16 16h96c8.8 0 16-7.2 16-16s-7.2-16-16-16H144z"/></svg>
                    {
                        isOpen ?
                            "Mostrar Compras"
                            :
                            ""
                    }
                </button>

            </div>
            <div className=" mb-32">
                <button
                    className={`hover:bg-white w-full  ${isOpen ? 'p-2' : ''}    uppercase font-bold flex mt-5 text-center rounded-lg`}
                    onClick={handleCerrarSesion}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-0.5" viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" /></svg>
                    {
                        isOpen ?
                            "Cerrar Sesión"
                            :
                            ""
                    }
                </button>
            </div>



            <ModalAddCategory />
            <ModalAddProduct />
            <ModalAddStore />
            <ModalShoopingCart />
        {/*  <ModalProfile /> */ }
        </aside>
    )
}

export default Sidebar
