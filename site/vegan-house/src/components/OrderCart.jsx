import React from 'react';
import pants from "../assets/images/pants.png"
import { ProductCart } from "./ProductCart"
import "../styles/orderCart.scss"
export function OrderCart(props) {

    const [number, setNumber] = React.useState(1);

    function sum() {
        setNumber(number + 1);
        console.log(number);
    }

    function subtract() {
        setNumber(number - 1);
        console.log(number);
    }


    return (
        <>
            <div className="order">
                <ProductCart src={pants} text="Calça de Algodão marrom" />
                <div className="order-props">
                    <div className="amount">
                        <button onClick={subtract}>-</button>
                        <label>{number}</label>
                        <button onClick={sum}>+</button>
                    </div>

                    <h3>R${props.price.toFixed(2)}</h3>
                    <h3>R${(number * props.price).toFixed(2)}</h3>
                    <i class="fas fa-times-circle"></i>
                </div>
            </div>

        </>
    )
}