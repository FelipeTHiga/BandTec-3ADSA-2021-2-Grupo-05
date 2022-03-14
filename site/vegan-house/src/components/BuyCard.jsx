import '../styles/buyCard.scss';
import shoppingCart from '../assets/images/shopping-cart.png';
import { ShowStars } from '../scripts/showScore';
import loginService from '../services/login';
import React, { useState } from 'react';
import ModalRedirect from './ModalRedirect';
import ModalMessage from '../components/ModalMessage';
import { useHistory } from "react-router";
import api from "../services/api";


export function BuyCard(props) {

    // function addCartItem(e) {

    //     e.preventDefault();

    //     const cart = {
    //         commercialName: document.getElementById("name").value,
    //         cnpj: document.getElementById("cnpj").value,
    //         commercialEmail: document.getElementById("email").value,
    //     }
    //     api({
    //         method: 'post',
    //         url: '/sellers',
    //         data: user,
    //     })
    //         .then(function (response) {
    //             console.log(response)
    //             console.log(response.data)
    //             console.log(response.config)
    //             console.log(response.status);
    //             console.log(response.request);
    //             console.log(response.statusText);
    //             history.push('/');
    //         })
    // }

    const history = useHistory();
    const buyProduct = (event) => {
        history.push(`/carrinho/`);
    }

    const [isModalMessageVisible, setIsModalMessageVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalTitle, setModalTitle] = useState("");

    var isAvailable = (props.product.inventory <= 0) ? false : true;
    let user = loginService.getSession();
    var isLogged = (user == null) ? false : true;
    const [isModalVisible, setIsModalVisible] = useState(false);
    let authenticatedUser = null;
    let userLogged = loginService.getSession() ?? authenticatedUser;

    function postCartItem(e){
        if (!userLogged) {
            history.push("/login")
        } else {
            api.post(`/cartItems/${userLogged.id}`, {
                product: {
                    id: props.product.id,
                    price:props.product.price
                },
                quantity: 1,
            })
            .then((res) => {
                if (res.status === 201) {
                    console.log("Item de carrinho adicionado - " + res.statusText);
                    history.push(`/carrinho`);
                } else {
                    
                }
                console.log(res.status);
            }).catch((err) => {
                console.log(err);
            
            })
        }

    }

    async function subscribe(fkProduct, fkUser) {

        await api({
            method: 'post',
            url: '/restock-subscribe',
            data: {
                fkProduct: fkProduct,
                fkUser: fkUser
            }
        }).then((res) => {
            setModalTitle("Notificação via e-mail");
            setModalMessage("Quando chegarem novos produtos, notificaremos via e-mail.");
            window.location.href = '#top';
            setIsModalMessageVisible(true);
        })
    }


    return (
        <>
            <div className="container-buy-card">

                <div className="buy-card-info">
                    <div className="product-title">
                        <h1>{props.product.name}</h1>
                    </div>
                    <div className="product-score">
                        <div className="container-stars teste">{ShowStars(3.5)}</div>
                        <h6>3.5</h6>
                    </div>
                    <div className="product-seller">
                        <h4>Vendido por <u>{props.seller.commercialName}</u></h4>
                    </div>
                </div>
                <hr />
                <div className="product-price">
                    <h1>R${Number(props.product.price).toFixed(2) }</h1>
                </div>

                <div className="btn">
                    {
                        isAvailable ? (

                            <div className="container-buy-btn" onclick={postCartItem}>
                                <button className="buy-btn" onclick={postCartItem}>
                                    <img src={shoppingCart} alt="" />
                                    {
                                        isLogged ? (
                                            <h2 onClick={() => { postCartItem() }}>Comprar</h2>
                                        ) : (
                                            <h2 onClick={() => { setIsModalVisible(true) }}>Comprar</h2>
                                        )
                                    }
                                </button>
                            </div>
                        ) : (
                            <div className="container-unavailable-btn">
                                <button className="btn-unavailable">
                                    <h1>Indisponível</h1>
                                </button>
                                {
                                    isLogged ? (
                                        <h3 onClick={() => { subscribe(props.product.id, user.id) }}>Avise-me quando chegar</h3>
                                    ) : (
                                        <h3 onClick={() => { setIsModalVisible(true) }}>Avise-me quando chegar</h3>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            </div>
            {
                isModalVisible ?
                    <ModalRedirect
                        onClose={() => setIsModalVisible(false)}
                        height={document.body.scrollHeight}
                        title="Atenção"
                        message="Para acessar a funcionalidade, você precisa estar logado"
                        link="/login"
                        btnTitle="Ir para Login!" />
                    : null
            }
             {
                isModalMessageVisible ?
                    <ModalMessage
                        onClose={() => setIsModalMessageVisible(false)}
                        height={document.body.scrollHeight}
                        title={modalTitle}
                        message={modalMessage}
                        function={() => setIsModalMessageVisible(false)}
                    />
                    : null
            }
        </>
    );
}