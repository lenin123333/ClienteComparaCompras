import { Link, useNavigate } from "react-router-dom"
import Alerta from "../../components/Alerta"
import { useState } from "react"
import clienteAxios from "../../config/axios"
import useAuth from "../../hooks/useAuth"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState('')
  const { setAuth } = useAuth();
  const navigate = useNavigate()
  const handleSubmit = async e => {
    e.preventDefault();

    if ([email, password].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        type: 'error'
      })
      return
    }
    try {
      const { data } = await clienteAxios.post('/users/login', { email, password })
      localStorage.setItem('token', data.token)
      setAuth(data)
      navigate('/productos')
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        type: 'error'
      })
    }
  }
  const googleAuth = () => {
    window.open(
      `${import.meta.env.VITE_APP_API_URL}/api/users/google/callback`,
      "_self"
    );
  };
  const { msg } = alerta
  return (
    <>
      <h1 className=" text-sky-600 font-black text-6xl capitalize ml-8 ">Compara</h1>
      <span className=" text-orange-600 font-black text-6xl capitalize float-end mr-10 "> Compras </span>
      {msg && <Alerta alerta={alerta} />}
      <form onSubmit={handleSubmit} className=" bg-white my-10 shadow rounded-lg px-10 py-10">
        <div className="my-5 ">
          <label
            className=" uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email">Correo</label>
          <input
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
            type="email"
            name=""
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Correo de Registro" />
        </div>
        <div className="my-5 ">
          <label
            className=" uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password">Contraseña</label>
          <input
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
            type="password"
            name=""
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Contraseña de Registro" />
        </div>
        <input
          type="submit"
          value="Iniciar sesión"
          className="  mb-5 bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
        <button className=' bg-orange-500 text-white font-bold flex flex-row justify-center items-center w-full text-center mb-5 py-1 uppercase  rounded shadow' onClick={googleAuth}>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
          </svg>
          <span>Inicia Sesion con Google</span>
        </button>
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link to="/registrar" className="block text-center my-5 text-slate-500 uppercase text-sm">¿No tienes una cuenta? Registrate</Link>
        <Link to="/olvide-password" className="block text-center my-5 text-slate-500 uppercase text-sm">Olvidaste tu Contraseña</Link>


      </nav>
    </>
  )
}

export default Login
