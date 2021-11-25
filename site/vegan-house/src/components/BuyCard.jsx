import '../styles/buyCard.scss';
import shoppingCart from '../assets/images/shopping-cart.png';
import { ShowStars } from '../scripts/showScore';
import loginService from '../services/login';
import { subscribe } from '../services/crud-user';
import React, { useState } from 'react';
import Modal from './Modal';
import { useParams, useHistory } from "react-router";
import api from "../services/api";

export function BuyCard(props) {

    var isAvailable = (props.product.inventory <= 0) ? false : true;
    let user = loginService.getSession();
    var isLogged = (user == null) ? false : true;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const history = useHistory();
    let authenticatedUser = {
        authenticated: false
    }
    let userLogged = loginService.getSession() ?? authenticatedUser;

    function postCartItem(e){
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
                    alert("Sucesso")
                    history.push(`/carrinho`);
                } else {
                    
                }
                console.log(res.status);
            }).catch((err) => {
                console.log(err);
            
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
                    <h1>R${(props.product.price)}</h1>
                    {/* .toFixed(2) */}
                </div>

                <div className="btn">
                    {
                        isAvailable ? (
                            <div className="container-buy-btn" onclick={postCartItem}>
                                <button className="buy-btn" onclick={postCartItem}>
                                    <img src={shoppingCart} alt="" />
                                    <h2 onClick={() => { postCartItem() }}>Comprar</h2>
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
                    <Modal 
                    onClose={() => setIsModalVisible(false)} 
                    height={document.body.scrollHeight}
                    title="Modal" 
                    message="Para acessar a funcionalidade, você precisa estar logado"
                    btnTitle="Ir para Login!" />
                    : null
            }
        </>
    );
}