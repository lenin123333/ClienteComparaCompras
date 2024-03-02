const Header = () => {
    return (
        <div className="relative">
            <header className="px-4 py-5 bg-white border-b-0 shadow-lg fixed top-0 w-full z-0">
                <div className="lg:flex lg:justify-between"> 
                    <div className="relative z-0">
                        <div className="container mx-auto p-4">
                            {/* Contenido específico del encabezado */}
                        </div>
                        <div className="">
                            <h2 className="text-3xl text-sky-600 font-black sm:text-center   ">Compara</h2>
                            <h2 className="text-3xl text-orange-600 font-black sm:text-center ml-10  "> Compras </h2>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center gap-4">
                        {/* Otro contenido del encabezado si es necesario */}
                    </div>
                </div>
            </header>
            {/* Contenido principal */}
        </div>
    );
};

export default Header;
