import {useEffect,useState} from "react"
import {useParams,Link} from 'react-router-dom'
import Alerta from "../../components/Alerta"
import clienteAxios from "../../config/axios"




const ConfirmarCuenta = () => {
  const {id}= useParams()
  const [alerta, setAlerta] = useState({})
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  useEffect(()=>{
    const confrimarCuenta = async () => {
      try {
        const url = `/users/confirm/${id}`
        const {data} = await clienteAxios(url)
        setAlerta({
          msg: data.msg,
          type: 'info'
        })
        setCuentaConfirmada(true)
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          type: 'error'
        })
      }
    }
    confrimarCuenta();
  },[])  

   const {msg}= alerta

  return (
    <>
    {msg && <Alerta alerta={alerta} />}
    <h1 className=" text-sky-600 font-black text-6xl capitalize ml-8 ">Compara</h1>
      <span className=" text-orange-600 font-black text-6xl capitalize float-end mr-10 "> Compras </span>
      <div>
        {cuentaConfirmada && (
           <Link to="/" className="mt-40 block text-center my-5 text-slate-500 uppercase text-lg">Inicia Sesión</Link>
        )}
      </div>
      
    </>
  )
}

export default ConfirmarCuenta
