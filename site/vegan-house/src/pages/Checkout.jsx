import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Submenu } from '../components/Submenu';
import { OrderItem } from '../components/OrderItem';
import { SectionTitle } from '../components/SectionTitle';
import loginService from '../services/login';
import api from "../services/api";
import { useParams, useHistory } from "react-router";
import React, { Component, useEffect, useState } from 'react';

import "../styles/checkout.css";


export function Checkout(props) {
    const history = useHistory();
    const [order, setOrder] = React.useState({});
    let userLogged = loginService.getSession();
    const [orderItems, setOrderItem] = React.useState([]);
    const publicKey = "TEST-622fb91c-f16d-4a94-a027-1feaaa7fb422";
    const mercadopago="";

    useEffect(() => {
        
        const script = document.createElement('script')
        script.src = "https://sdk.mercadopago.com/js/v2";
        document.body.appendChild(script);
        mercadopago  = new MercadoPago("TEST-622fb91c-f16d-4a94-a027-1feaaa7fb422");
        if (userLogged) {
            function getOrder() {
                api.get(`orders/checkout/lastOrder/${userLogged.id}`)
                    .then((res) => {
                        if (res.status === 200) {
                            console.log(res);
                            setOrder(res.data);
                            setOrderItem(res.data.orderItems)

                        }

                    }).catch((err) => {
                        console.log(err);
                    })
            }

            getOrder();
        }
        else {
            history.push(`/login`);
        }
    }, [])

    function finishOrder() {
        history.push("/perfil/meus-pedidos");
    }

   

    return (
        <>
            <input type="hidden" id="mercado-pago-public-key" value="TEST-622fb91c-f16d-4a94-a027-1feaaa7fb422" />
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
            <script src="https://sdk.mercadopago.com/js/v2"></script>
            <script type="text/javascript" src="@{/js/index.js}" defer></script>
            <Navbar />
            <Submenu />

            <input type="hidden" id="mercado-pago-public-key" value="TEST-622fb91c-f16d-4a94-a027-1feaaa7fb422" />
            <div className="main-container">
                <div className="title-cart-main">
                    <h1>Meu carrinho / Checkout</h1>
                </div>

                <div className="flex-row-container">
                    <div className="order-detail">
                        <SectionTitle text="Informações do pedido" />

                        <label><b>Endereço:</b> {order.adress}</label>
                        <label><b>Itens do pedido:</b></label>

                        <div className="order-itens-container">
                            {orderItems.map(orderItem => <OrderItem productName={orderItem.product.name} quantity={orderItem.quantity} subTotal={orderItem.subTotal} />)}
                        </div>

                        <SectionTitle text=" " />

                        <h3 className="margin-top-20">Total: R${order.total}</h3>
                    </div>


                    <div className="payment-options">
                        <SectionTitle text="Forma de pagamento" />

                        <form id="form-checkout" className="payment-form">

                            <div className="payment-data-container">
                                <div className="payment-form-data">
                                    <label htmlFor="">E-mail: </label>
                                    <input placeholder="E-mail" id="form-checkout__cardholderEmail" name="cardholderEmail" type="email" class="form-control" />
                                </div>

                                <div className="payment-form-data">
                                    <label htmlFor="">CPF</label>
                                    <input placeholder="CPF" id="form-checkout__identificationNumber" name="docNumber" type="text" class="form-control" />
                                </div>

                                <div className="payment-form-data">
                                    <label htmlFor="">Nome completo</label>
                                    <input placeholder="Nome no cartão" id="form-checkout__cardholderName" name="cardholderName" type="text" class="form-control" />
                                </div>

                                <div className="payment-form-data">
                                    <label htmlFor="">Data de validade</label>

                                    <div className="display-row">
                                        <input placeholder="MM" id="form-checkout__cardExpirationMonth" name="cardExpirationMonth" type="text" class="form-control" />
                                        <span class="date-separator">/</span>
                                        <input placeholder="AA" id="form-checkout__cardExpirationYear" name="cardExpirationYear" type="text" class="form-control" />
                                    </div>
                                </div>

                                <div className="payment-form-data">
                                    <label htmlFor="">Número do cartão</label>
                                    <input placeholder="Num cartão" id="form-checkout__cardNumber" name="cardNumber" type="text" class="form-control" />
                                </div>

                                <div className="payment-form-data">
                                    <label htmlFor="">Código de segurança</label>
                                    <input placeholder="PIN" id="form-checkout__securityCode" name="securityCode" type="text" class="form-control" />
                                </div>

                                <input type="hidden" id="amount" />
                                <input type="hidden" id="description" />
                                <div className="container-button">
                                    <button id="form-checkout__submit" type="submit" class="btn btn-primary btn-block" onClick={finishOrder}>Finalizar compra</button>
                                </div>
                            </div>
                        </form>

                        {/* 
                        <div className="payment-buttons-container">
                            <PayPalButton
                                amount="0.01"
                                // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                onSuccess={(details, data) => {
                                    alert("Transaction completed by " + details.payer.name.given_name);

                                    // OPTIONAL: Call your server to save the transaction
                                    return fetch("/paypal-transaction-complete", {
                                        method: "post",
                                        body: JSON.stringify({
                                            orderId: data.orderID
                                        })
                                    });
                                }}
                                options={{
                                    clientId: "ASApBtQfYBHLQyMkyKTrmxenXwwnrNLJWh7yE5mDJUqu3pAEbfrx7EB-lwaZyfDprGOfKejCpwSBQIkM"
                                }}
                            />
                        </div> */}

                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}
