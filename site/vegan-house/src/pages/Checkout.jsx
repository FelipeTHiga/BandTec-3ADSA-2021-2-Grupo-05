import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Submenu } from '../components/Submenu';
import { OrderItem } from '../components/OrderItem';
import { SectionTitle } from '../components/SectionTitle';
import loginService from '../services/login';
import api from "../services/api";
import { useParams, useHistory } from "react-router";
import React, { Component, useEffect, useState } from 'react';
import { useMercadopago } from 'react-sdk-mercadopago';

import "../styles/checkout.scss";


export function Checkout(props) {
    const history = useHistory();
    const [order, setOrder] = React.useState({});
    let userLogged = loginService.getSession();
    const [orderItems, setOrderItem] = React.useState([]);
    const mercadopago = useMercadopago.v2('TEST-622fb91c-f16d-4a94-a027-1feaaa7fb422')

    useEffect(() => {

        if (userLogged) {
            function getOrder() {
                api.get(`orders/checkout/lastOrder/${userLogged.id}`)
                    .then((res) => {
                        if (res.status === 200) {
                            console.log(res);
                            setOrder(res.data);
                            setOrderItem(res.data.orderItems)
                            
                            let parseDados = JSON.stringify(res.data)
                            sessionStorage.setItem("order", parseDados)                            
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

        loadForm()

    }, [mercadopago])


    function loadForm() {
        if (mercadopago) {
            const cardForm = mercadopago.cardForm({
                amount: sessionStorage.getItem("amountOrder"),
                autoMount: true,
                processingMode: 'aggregator',
                form: {
                    id: 'form-checkout',
                    cardholderName: {
                        id: 'form-checkout__cardholderName',
                        placeholder: 'Nome no cartão',
                    },
                    cardholderEmail: {
                        id: 'form-checkout__cardholderEmail',
                        placeholder: 'Email',
                    },
                    cardNumber: {
                        id: 'form-checkout__cardNumber',
                        placeholder: 'Número do cartão',
                    },
                    cardExpirationMonth: {
                        id: 'form-checkout__cardExpirationMonth',
                        placeholder: 'MM'
                    },
                    cardExpirationYear: {
                        id: 'form-checkout__cardExpirationYear',
                        placeholder: 'AA'
                    },
                    securityCode: {
                        id: 'form-checkout__securityCode',
                        placeholder: 'CVV',
                    },
                    installments: {
                        id: 'form-checkout__installments',
                        placeholder: 'Total de parcelas'
                    },
                    identificationType: {
                        id: 'form-checkout__identificationType',
                        placeholder: 'Document type'
                    },
                    identificationNumber: {
                        id: 'form-checkout__identificationNumber',
                        placeholder: 'CPF'
                    },
                    issuer: {
                        id: 'form-checkout__issuer',
                        placeholder: 'Bandeira'
                    }
                },
                callbacks: {
                    onFormMounted: error => {
                        if (error) return console.warn('Form Mounted handling error: ', error)
                        console.log('Form mounted')
                    },
                    onFormUnmounted: error => {
                        if (error) return console.warn('Form Unmounted handling error: ', error)
                        console.log('Form unmounted')
                    },
                    onIdentificationTypesReceived: (error, identificationTypes) => {
                        if (error) return console.warn('identificationTypes handling error: ', error)
                        console.log('Identification types available: ', identificationTypes)
                    },
                    onPaymentMethodsReceived: (error, paymentMethods) => {
                        if (error) return console.warn('paymentMethods handling error: ', error)
                        console.log('Payment Methods available: ', paymentMethods)
                    },
                    onIssuersReceived: (error, issuers) => {
                        if (error) return console.warn('issuers handling error: ', error)
                        console.log('Issuers available: ', issuers)
                    },
                    onInstallmentsReceived: (error, installments) => {
                        if (error) return console.warn('installments handling error: ', error)
                        console.log('Installments available: ', installments)
                    },
                    onCardTokenReceived: (error, token) => {
                        if (error) return console.warn('Token handling error: ', error)
                        console.log('Token available: ', token)
                    },
                    onSubmit: (event) => {
                        event.preventDefault();
                        // const cardData = cardForm.getCardFormData();
                        // console.log('CardForm data available: ', cardData)

                        const {
                            paymentMethodId,
                            issuerId,
                            cardholderEmail,
                            amount,
                            token,
                            installments,
                            identificationNumber,
                            identificationType
                        } = cardForm.getCardFormData();

                        console.log(paymentMethodId,
                            issuerId,
                            cardholderEmail,
                            amount,
                            token,
                            installments,
                            identificationNumber,
                            identificationType)

                        api.post("/process_payment", {
                            token: token,
                            paymentMethodId: paymentMethodId,
                            transactionAmount: Number(amount),
                            installments: Number(installments),
                            description: "productDescription",
                            payer: {
                                email: cardholderEmail,
                                identification: {
                                    type: identificationType,
                                    number: identificationNumber,
                                },
                            },
                        }).then(response => {
                            if (response.status === 201) {
                                history.push(`/payment-response/${response.data.id}/${response.data.status}/${response.data.detail}`);
                                updateStatus(response.data.status)
                            }
                            console.log(response.data)
                            return response.json();
                        }).catch(error => {
                        });


                    },
                    onFetching: (resource) => {
                        console.log('Fetching resource: ', resource)



                        return () => {

                        }
                    },
                }
            })
        }
    }

    function updateStatus(status) {
        var newStatus;
        var updatedOrder = JSON.parse(sessionStorage.getItem("order"));

        switch (status) {
            case "approved":
                newStatus = "Pagamento aprovado";
                break;

            case "in_process":
                newStatus = "Pagamento em processamento";
                break;

            case "rejected":
                newStatus = "Pagamento rejeitado";
                break;
        }

        console.log(updatedOrder.idOrder)

        api.patch(`orders/update-status/${newStatus}/${updatedOrder.idOrder}`)
            .then(response => {
                console.log(response)
                return response.json();
            }).catch(error => {
                console.log("Unexpected error\n" + JSON.stringify(error));
            });
    }



    return (
        <>
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

                        <h3 className="margin-top-20">Total: R${Number(order.total).toFixed(2)}</h3>
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

                                <input type="hidden" id="amount" value={order.total} />
                                <select type="hidden" id="form-checkout__installments" name="installments" value={1} />
                                <select type="hidden" id="form-checkout__issuer" name="issuer" />
                                <select type="hidden" id="form-checkout__identificationType" name="identificationType" value="CPF" className="display-none" />
                                <input id="MPHiddenInputToken" name="MPHiddenInputToken" type="hidden" />

                                <input type="hidden" id="description" />
                                <div className="container-button">
                                    <button id="form-checkout__submit" type="submit" class="btn btn-primary btn-block" >Finalizar compra</button>
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
