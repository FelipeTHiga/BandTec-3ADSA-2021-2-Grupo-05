import React from 'react';
import pants from "../assets/images/pants-1.png"
import { ProductCart } from "./ProductCart"
import "../styles/orderCart.scss"

// let totalAmount = function total(number, price) {
//     return number * price;
// }


export function OrderCart(props) {

    const [number, setNumber] = React.useState(1);

    function sum() {
        if(number >= 1) {
            document.getElementById('button-amount').disabled = false;
        }
        setNumber(number + 1);
        props.setTotal((prevState) => ({ ...prevState, total: prevState.total + props.price}));
        console.log(number);
             
    }

    function subtract() {
        if(number <=1) {
            document.getElementById('button-amount').disabled = true;
        } else {
            document.getElementById('button-amount').disabled = false;
            setNumber(number - 1);
            props.setTotal((prevState) => ({ ...prevState, total: prevState.total - props.price}));
            console.log(number); 
        }
         
      
    }
 
    React.useEffect(() => {
        props.setTotal((prevState) => ({ ...prevState, total: prevState.total + props.price}));
    }, []);

    return (
        <>
            <div className="order" id={props.cardId} value={number * props.price.toFixed(2)}>
                <ProductCart src={pants} text="Calça de Algodão marrom" />
                <div className="order-props">
                    <div className="amount">
                        <button id="button-amount" onClick={subtract}>-</button>
                        <label>{number}</label>
                        <button onClick={sum}>+</button>
                    </div>

                    <h3>R${props.price.toFixed(2)}</h3>
                    <h3>R${number * props.price.toFixed(2)}</h3>
                    <i class="fas fa-times-circle"></i>
                </div>
            </div>

        </>
    )
}

