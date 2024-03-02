const Header = () => {
    return (
        <div className="relative">
            <header className="px-4 py-5 bg-white border-b-0 shadow-lg fixed w-full z-50">
                <div className="md:flex md:justify-between">
                    <div className="relative z-0">
                        <div className="container mx-auto p-4">
                            {/* Contenido específico del encabezado */}
                        </div>
                        <div className="">
                            <h2 className="text-3xl text-sky-600 font-black text-center mb-5 md:mb-0">Compara</h2>
                            <span className="text-3xl text-orange-600 font-black text-center mb-5 ml-20 md:mb-0"> Compras </span>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        {/* Otro contenido del encabezado si es necesario */}
                    </div>
                </div>
            </header>
            {/* Contenido principal */}
        </div>
    );
};

export default Header;
