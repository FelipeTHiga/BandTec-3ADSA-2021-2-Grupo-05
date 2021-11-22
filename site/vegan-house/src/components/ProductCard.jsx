import shoe from '../assets/images/shoe.png'
import pants from '../assets/images/pants-1.png'
import polish from '../assets/images/polish.png'
import tea from '../assets/images/tea.png'
import withoutImage from '../assets/images/product-without-image.jpg'
import { ShowStars } from "../scripts/showScore";
import { newsProducts } from "../scripts/vetor";
import '../styles/card.scss'
import productService from '../services/crud-product';
import React, { Component, useState } from 'react';
import { useHistory } from 'react-router';


export function ProductCard(props) {

    const history = useHistory();

    const buyProduct = (event) => {
        history.push(`/todos-os-resultados/${props.category}/${props.id}`);
    }

    return (
        <>
            <div className="card-product line-up" key={props.id}>
                <div className="div-product-image">
                    <img src={props.image_url1} />
                </div>

                <div className="container-evaluation-card line-up">
                    <div className="container-stars line-up">
                        {ShowStars(3.5)}
                        <div className="container-score line-up">
                            <div>{3.5}</div>
                        </div>
                    </div>
                </div>
                <div className="container-description-product">
                    <p className="description">{props.name}</p>
                    <p className="price">R${(props.price)}</p>
                    <button onClick={buyProduct}><i className="fa fa-shopping-cart"></i>Comprar</button>
                </div>
            </div>
        </>
    );
}

// toFixed(2)