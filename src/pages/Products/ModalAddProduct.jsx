import { Fragment, useState } from 'react'
import { Dialog, Transition, Combobox } from '@headlessui/react'
import useProduct from '../../hooks/useProduct';
import Alerta from '../../components/Alerta';
import Spiner from '../../components/Spiner';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const ModalAddProduct = () => {
    const {
        handleModalProduct,
        modalProduct, categorys, stores,
        alerta, showAlerta,
        handleSubmitProduct, loading } = useProduct();

    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState()
    const [showCategory, setShowCategory] = useState('')
    const cateforysFilter = showCategory === '' ? [] : categorys.filter(category =>
        category.name.toLowerCase().includes(showCategory.toLowerCase()));
    const [selectedStore, setSelectedStore] = useState()
    const [showStore, setShowStore] = useState('')
    const storesFilter = showStore === '' ? [] : stores.filter(store =>
        store.name.toLowerCase().includes(showStore.toLowerCase()));
    const [price, setPrice] = useState('')
    const [name, setName] = useState('')


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        if ([price, name].includes('') || !selectedCategory || !selectedStore || selectedImage === null) {
            return showAlerta({
                msg: 'Todos los campos son obligatorios',
                type: 'error'
            })
        }
        const categoryObject = cateforysFilter.find(category => category.name === selectedCategory);
        const storesObject = storesFilter.find(store => store.name === selectedStore);

        const formdata = new FormData()
        formdata.append('name', name)
        formdata.append('category', categoryObject._id)
        formdata.append('prices[0][store]', storesObject._id)
        formdata.append('prices[0][price]', price)
        formdata.append('creator', '')
        formdata.append('imagen', selectedImage)
        handleSubmitProduct(formdata)
        setPrice('')
        setName('')
        setSelectedCategory('')
        setSelectedImage('')
        setSelectedStore('')


    }

    const { msg } = alerta

    return (
        <Transition.Root show={modalProduct} as={Fragment}>
            <Dialog as="div" className="fixed z-20 inset-0 overflow-y-auto"
                onClose={handleModalProduct}>
                <div className="flex items-end  justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                        />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
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
                            {loading && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Spiner />
                                </div>
                            )}

                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={handleModalProduct}
                                >
                                    <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>


                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h3" className=" m-3 text-lg leading-6 font-bold text-gray-900">
                                        Agregar Producto
                                    </Dialog.Title>
                                    {msg && <Alerta alerta={alerta} />}
                                   
                                    <form onSubmit={handleSubmit}>
                                    <input type="text" className="mx-auto max-w-xl mt-4  text-sm transform divide-y border-transparent
                                                       overflow-hidden rounded-xl bg-white shadow-2xl ring-1 w-full placeholder-gray-400
                                                      ring-opacity-5 transition-all p-3.5"  name="" placeholder='Ingresa Nombre Producto' id=""
                                        onChange={e => setName(e.target.value)} value={name}
                                    />
                                        <div className='m-3'>
                                            {/* Input de archivo para seleccionar la imagen */}
                                            <input type="file" onChange={handleImageChange} />

                                            <div className='shadow-sm' style={{ width: '354px', height: '341px', overflow: 'hidden' }}>
                                                {selectedImage && (
                                                    <>
                                                        <p>Imagen seleccionada:</p>
                                                        <img
                                                            src={URL.createObjectURL(selectedImage)}
                                                            alt="Selected"
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                        />
                                                    </>
                                                )}
                                            </div>

                                        </div>

                                        <Combobox as="div"
                                            className="mx-auto mt-4 max-w-xl transform divide-y border-transparent
                                                       overflow-hidden rounded-xl bg-white shadow-2xl ring-1 
                                                      ring-opacity-5 transition-all"  value={selectedCategory} onChange={(category) => setSelectedCategory(category)}>
                                            <Combobox.Input onChange={(event) => setShowCategory(event.target.value)}
                                                placeholder='Busca tu categoria'
                                                className="h-12 w-full  pl-4 pr-4 text-gray-800 l placeholder-gray-400 focus:ring-0 sm:text-sm" />
                                            <Combobox.Options>
                                                {cateforysFilter.map(category => (
                                                    <Combobox.Option
                                                        key={category._id}
                                                        value={category.name}
                                                        className={({ active }) =>
                                                            classNames('cursor-pointer  select-none px-4 py-2 ',
                                                                active && ' bg-sky-600 text-white')}
                                                    >
                                                        {category.name}
                                                    </Combobox.Option>
                                                ))}
                                            </Combobox.Options>
                                        </Combobox>

                                        <Combobox as="div"
                                            className="mx-auto max-w-xl mt-4  transform divide-y border-transparent
                                                       overflow-hidden rounded-xl bg-white shadow-2xl ring-1 
                                                      ring-opacity-5 transition-all"  value={selectedStore} onChange={(store) => setSelectedStore(store)}>
                                            <Combobox.Input onChange={(event) => setShowStore(event.target.value)}
                                                placeholder='Busca tu tienda'
                                                className="h-12 w-full  pl-4 pr-4 text-gray-800 l placeholder-gray-400 focus:ring-0 sm:text-sm" />
                                            <Combobox.Options>
                                                {storesFilter.map(store => (
                                                    <Combobox.Option
                                                        key={store._id}
                                                        value={store.name}
                                                        className={({ active }) =>
                                                            classNames('cursor-pointer  select-none px-4 py-2 ',
                                                                active && ' bg-sky-600 text-white')}
                                                    >
                                                        {store.name}
                                                    </Combobox.Option>
                                                ))}
                                            </Combobox.Options>
                                        </Combobox>

                                        <input type="number" className="mx-auto max-w-xl mt-4  text-sm transform divide-y border-transparent
                                                       overflow-hidden rounded-xl bg-white shadow-2xl ring-1 w-full placeholder-gray-400
                                                      ring-opacity-5 transition-all p-3.5"  name="" placeholder='Ingresa Precio' id=""
                                            onChange={e => setPrice(e.target.value)}
                                            value={price}
                                        />

                                        <button type="submit" className="mt-4 rounded-lg text-white p-3 bg-sky-500 float-end hover:bg-sky-600">Guardar Producto</button>

                                    </form>



                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ModalAddProduct