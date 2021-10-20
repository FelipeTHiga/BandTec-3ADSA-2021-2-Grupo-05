import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Title2 } from '../components/Title2';
import "../styles/shoppingCart.scss"
import { OrderCart } from '../components/OrderCart';
export function ShoppingCart() {
    return(
        <>
        <Navbar isLogged={true} />
        <section className="shopping-cart-section">
            <div className="container-cart">
            <Title2 title2="Meu carrinho" />
                <div className="cart-content">
                    <div className="title-cart">
                        <div className="product-title">
                        <h3>Produto</h3>
                        </div>
                        <div className="title-order-props">
                        <h3 className="title-amount">Quantidade</h3>
                        <h3>Valor</h3>
                        <h3>Subtotal</h3>
                        <h3>Remover</h3>
                        </div>
                    </div>
                    <OrderCart price={20.00}/>

                </div>
                <div className="cart-final">
                    <h1>Total: <span>R$145,00</span></h1>
                    <button>Continuar</button>
                </div>
            </div>
        </section>
        <Footer/>
        </>
    )
}