import { Fragment, useState,} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useProduct from '../../hooks/useProduct';
import Alerta from '../../components/Alerta';


const ModalAddCategory = () => {

    const [category,setCategory] = useState('');
    const {handleModalCategory,modalCategory,alerta,mostrarAlerta,handleSubmitCategory,categorys } = useProduct();

    const handleSubmit =e=>{
        e.preventDefault();

        if([category].includes('')){
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                type: 'error'
            })
        }
        setCategory('')
        handleSubmitCategory({name:category})
        
    }
    

    const { msg } = alerta
    return (
        <Transition.Root show={ modalCategory } as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={ handleModalCategory}>
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


                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={ handleModalCategory  }
                                >
                                <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>


                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-gray-900">
                                        Agregar Una Categoria
                                    </Dialog.Title>
                                    {msg && <Alerta alerta={alerta} />}
                                    <form className=' m-4' onSubmit={handleSubmit}>
                                        <label htmlFor="nameCategory" className=' m-2'>Nombre Categoria</label>   
                                        <input type="text" value={category} onChange={e=>setCategory(e.target.value)} id="nameCategory" placeholder='Ejem: Electricista'  className='p-2 border-2 m-2 placeholder-gray-400 rounded-lg'/>
                                        <button type="submit" className=' p-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-white float-end ml-5'>Agregar</button>
                                    </form>

                                    <div className=' flex flex-row overflow-y-auto'>
                                       { categorys.map(categoryState => (
                                           <p className=' bg-white font-bold m-1 mt-10 border-2  transition-all shadow-lg rounded-lg p-2 hover:text-lg' key={categoryState._id} >{categoryState.name}</p>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ModalAddCategory