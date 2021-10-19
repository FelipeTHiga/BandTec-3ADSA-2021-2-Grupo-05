import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Submenu } from '../components/Submenu';
import "../styles/shoppingCart.scss"
import { OrderCart, totalAmount } from '../components/OrderCart';
import React from 'react';
export function ShoppingCart(props) {




    let [totalAmount, setNumber] = React.useState(0);

    totalAmount = () => {
        const totalLabel = document.querySelector(`#${totalLabel}`),
            orderCart1 = document.querySelector(`#${orderCart1}`)

        orderCart1.addEventListener("change", function () {
            totalLabel.value = setNumber;
        });
        
        alert("");
    }

    return (
        <>
            <Navbar isLogged={true} />
            <Submenu />
            <section className="shopping-cart-section">
                <div className="container-cart">
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
                        <OrderCart price={20.00} cardId="orderCart1" />

                    </div>
                    <div className="cart-final">
                        <h1>Total: <span id="totalLabel">R${totalAmount}</span></h1>
                        <button>Continuar</button>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}