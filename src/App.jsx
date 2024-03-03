
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RutaProtegida from './layouts/RutaProtegida'
import { AuthProvider } from './context/AuthProvider'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Auth/Login'
import Registrar from './pages/Auth/Registrar'
import OlvidePassword from './pages/Auth/OlvidePassword'
import NuevoPassword from './pages/Auth/NuevoPassword'
import ConfirmarCuenta from './pages/Auth/ConfirmarCuenta'
import { ProductProvider } from './context/ProductProvider'
import Products from './pages/Products/Products'
import ShoopingCart from './pages/ShoopingCar/ShoopingCart'
import { ShoopingCartProvider } from './context/ShoopingCartProvider'


const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <ShoopingCartProvider>
            <Routes>
              <Route path='/' element={<AuthLayout />}>
                <Route index element={<Login />} />
                <Route path='registrar' element={<Registrar />} />
                <Route path='olvide-password' element={<OlvidePassword />} />
                <Route path='olvide-password/:token' element={<NuevoPassword />} />
                <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
              </Route>
              <Route path='/productos' element={<RutaProtegida />}>
                <Route index element={<Products />} />
                
              </Route>
              <Route path='/carrito' element={<RutaProtegida />}>
                <Route index element={<ShoopingCart />} />
              </Route>
            </Routes>
          </ShoopingCartProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}


export default App
