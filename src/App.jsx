
import Header from './Components/Header'
import Guitarra from './Components/Guitarra'
import { useCart } from './Hooks/useCart';

function App() {

  const { 
    data,
    cart,
    isEmpty,
    carTotal,
    adddToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    cleanCart } = useCart();
    
  return (
    <>
      <Header cart={cart} removeFromCart={removeFromCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} cleanCart={cleanCart} isEmpty={isEmpty} carTotal={carTotal} />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitarra) => (
            <Guitarra key={guitarra.id} guitarra={guitarra} adddToCart={adddToCart} />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>

    </>
  )
}

export default App
