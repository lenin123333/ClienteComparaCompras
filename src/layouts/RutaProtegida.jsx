import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Spiner from '../components/Spiner'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'


const RutaProtegida = () => {

    const { auth, cargando } = useAuth()


    if (cargando) return <Spiner />
    return (
        <>
            {auth._id ? (
                <div className=' bg-gray-100'>
                    <Header/>

                    <div className=' md:flex md:min-h-screen   '>
                        <Sidebar />
                        <main className='flex-1 p-10 mt-20 md:mt-0'>
                            <Outlet />
                        </main>

                    </div>
                </div>
            ) : <Navigate to="/" />}
        </>
    )
}

export default RutaProtegida
