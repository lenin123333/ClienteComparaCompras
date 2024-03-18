
const Compras = ({compras}) => {
  return (
    <div>
      {compras._id}
      {compras.totalAmount}
      {compras.totalPrice}
    </div>
  )
}

export default Compras
