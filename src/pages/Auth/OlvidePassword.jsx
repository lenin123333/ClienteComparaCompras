import { Link } from "react-router-dom"
import { useState } from 'react'
import Alerta from "../../components/Alerta"
import clienteAxios from "../../config/axios"

const OlvidePassword = () => {
  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useState('')
  const handleSubmit = async e => {
    e.preventDefault();

    if (email === '') {
      setAlerta({
        msg: 'El Correo no puede ir vacio',
        type: 'error'
      })
      return
    }

    try {
      const {data} = await clienteAxios.post('/users/forgot-password',{email})
      setAlerta({
        msg: data.msg,
        type: 'info'
      })
      setEmail('')
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        type: 'error'
      })
    }

  }

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


        <input
          type="submit"
          value="Enviar Instrucciones"
          className="  mb-5 bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link to="/" className="block text-center my-5 text-slate-500 uppercase text-sm">¿Ya tienes una cuenta? Inicia Sesión</Link>
        <Link to="registrar" className="block text-center my-5 text-slate-500 uppercase text-sm">¿No tienes una cuenta? Registrate</Link>


      </nav>
    </>
  )
}

export default OlvidePassword
