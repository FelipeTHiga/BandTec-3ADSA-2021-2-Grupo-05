import '../styles/buyCard.scss';
import shoppingCart from '../assets/images/shopping-cart.png';
import { ShowStars } from '../scripts/showScore';
import loginService from '../services/login';
import { subscribe } from '../services/crud-user';
import React, { useState } from 'react';
import Modal from './Modal';

export function BuyCard(props) {

    var isAvailable = (props.product.inventory <= 0) ? false : true;
    let user = loginService.getSession();
    var isLogged = (user == null) ? false : true;
    const [isModalVisible, setIsModalVisible] = useState(false);

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
                            <div className="container-buy-btn">
                                <button className="buy-btn" onclick="buy()">
                                    <img src={shoppingCart} alt="" />
                                    <h2>Comprar</h2>
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