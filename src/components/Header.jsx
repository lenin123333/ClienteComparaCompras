import { Link } from "react-router-dom";
import useProduct from "../hooks/useProduct";

const Header = () => {

    const { totalCart } = useProduct();
    

    return (
        <div className="relative z-20">
            <header className="px-4 py-5 bg-white border-b-0 shadow-lg fixed top-0 w-full ">
                <div className="flex lg:flex-row lg:justify-between   sm:flex-col sm:items-center">
                    <div className="relative ">
                    <Link to={'/productos'}>
                        <div className=" m-3">
                            <h2 className="text-4xl text-sky-600 font-black sm:text-center   ">Compara</h2>
                            <h2 className="text-4xl text-orange-600 font-black sm:text-center ml-10  "> Compras </h2>
                        </div>
                        </Link>
                    </div>
                    <div className="flex flex-col  lg:flex-row items-center gap-4 md:mt-6 ">
                        <Link to={'/Carrito'}>
                            <div className="relative">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mr-10" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" /></svg>
                                <span className="absolute top-0 right-0 mr-10 p-1 bg-sky-500 text-white text-xs rounded-full">
                                    {totalCart}
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </header>
            {/* Contenido principal */}
        </div>
    );
};

export default Header;
