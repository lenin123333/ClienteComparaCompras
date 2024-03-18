/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom';

const Shooping = ({ compras,handleModalShoopingCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <Link onClick={handleModalShoopingCart} to={`/Carrito/${compras._id}`}>
      <div className="font-bold text-lg mb-2">{compras._id}</div>
      <div className="text-gray-700 mb-2">
        <p>Cantidad: {compras.totalAmount}</p>
        <p>Precio total: ${compras.totalPrice}</p>
      </div>
      {/* Aquí puedes agregar más detalles de la compra si los tienes */}
      {/* Por ejemplo: descripción del producto, imagen, etc. */}
      </Link>
    </div>
  );
};

export default Shooping;
