import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../../components/Alerta"
import clienteAxios from "../../config/axios"

const Registrar = () => {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  const handleSubmit = async e => {
    e.preventDefault();
    if ([name, email, password, repetirPassword,lastName].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        type: 'error'
      })
      return
    }

    if (password !== repetirPassword) {
      setAlerta({
        msg: 'Las contraseñas no son iguales',
        type: 'error'
      })
      return
    }
    if (password.length < 6) {
      setAlerta({
        msg: 'La contraseña es muy corta, agrega minimo 6 caracteres',
        type: 'error'
      })
      return
    }
    setAlerta({})
    //Crear el usario en la API
    try {
      const {data} = await clienteAxios.post(`/users`,{
        name,
        lastName,
        password,
        email
      })
     
      setAlerta({
        msg: data.msg,
        type: 'info'
      })
      setEmail('')
      setName('')
      setPassword('')
      setLastName('')
      setRepetirPassword('')
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        type: 'error'
      })
     
    }
  }

  const googleAuth = () => {
		window.open(
			`${import.meta.env.VITE_APP_API_URL}/auth/google/callback`,
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
            htmlFor="nombre">Nombre</label>
          <input
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
            type="text"
            name=""
            id="nombre"
            placeholder="Ingresa tu Nombre"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="my-5 ">
          <label
            className=" uppercase text-gray-600 block text-xl font-bold"
            htmlFor="lastName">Apellido</label>
          <input
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
            type="text"
            name=""
            id="lastName"
            placeholder="Ingresa tu Apellido"
            value={lastName}
            onChange={e => setLastName(e.target.value)} />
        </div>
        <div className="my-5 ">
          <label
            className=" uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email">Correo</label>
          <input
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
            type="email"
            name=""
            id="email"
            placeholder="Correo de Registro"
            value={email}
            onChange={e => setEmail(e.target.value)} />
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
            placeholder="Contraseña de Registro"
            value={password}
            onChange={e => setPassword(e.target.value)} />
        </div>
        <div className="my-5 ">
          <label
            className=" uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password2">Repetir Contraseña</label>
          <input
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
            type="password"
            name=""
            id="password2"
            placeholder="Repetir tu Contraseña de Registro"
            value={repetirPassword}
            onChange={e => setRepetirPassword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Crear Cuenta"
          className="  mb-5 bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
        <button className=' flex flex-row justify-center items-center w-full text-center mb-5 py-3 uppercase  rounded shadow'  onClick={googleAuth}>
						<img className=" w-8 " src="./images/google.png" alt="google icon" />
						<span>Inicia Sesion con Google</span>
					</button>
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link to="/" className="block text-center my-5 text-slate-500 uppercase text-sm">¿Ya tienes una cuenta? Inicia Sesión</Link>
        <Link to="/olvide-password" className="block text-center my-5 text-slate-500 uppercase text-sm">Olvidaste tu Contraseña</Link>


      </nav>
    </>
  )
}

export default Registrar
