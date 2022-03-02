import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import "../styles/shoppingCart.scss"
import { OrderCart } from '../components/OrderCart';
import loginService from '../services/login';
import api from "../services/api";
import { useHistory } from "react-router";
import React, { useState, useEffect } from 'react';



export function ShoppingCart(props) {

    const history = useHistory();
    const [cartItems, setCartItems] = React.useState([]);
    const [defaultMessage, setDefaultMessage] = useState("");
    let total = 0;
    let userLogged = loginService.getSession();

    function getTotal(cartItemsL) {
        for (var i = 0; i < cartItemsL.length; i++) {
            total += parseFloat(cartItemsL[i].subTotal);
        }
    }

    useEffect(() => {
        if (userLogged) {
            function getCartItems() {
                api.get(`/cartItems/${userLogged.id}`)
                    .then((res) => {
                        if (res.status === 201) {
                            setCartItems(res.data)
                            getTotal(res.data);
                            setDefaultMessage("");
                        } else if (res.status === 204) {
                            setDefaultMessage("Seu carrinho está vazio.");
                        }
                    }).catch((err) => {
                    })
            }

            getCartItems();
        }
        else {
            history.push(`/login`);
        }
    }, [])



    let [totalAmount, setNumber] = React.useState({ total: total });

    function finishOrder() {
        api.post(`/orders/`, userLogged)
            .then((res) => {
                if (res.status === 201) {
                    history.push("/checkout")
                    sessionStorage.setItem("amountOrder", totalAmount.total)

                }
            }).catch((err) => {
            })
    }


    return (
        <>
            <Navbar />
            <section className="shopping-cart-section">
                <div className="container-cart">
                    <div className="title-cart-main">
                        <h1>Meu carrinho</h1>
                    </div>
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
                        {cartItems.map(cartItem => (<OrderCart price={cartItem.product.price} setTotal={setNumber} cardId={cartItem.idCartItem} productName={cartItem.product.name} productId={cartItem.product.id} quantity={cartItem.quantity} />))}
                        <div className='defaultMessage'>{defaultMessage}</div>
                    </div>
                    <div className="cart-final">
                        <h1>Total: <span id="totalLabel">R${totalAmount.total.toFixed(2)}</span></h1>
                        <button onClick={finishOrder}>Continuar</button>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}