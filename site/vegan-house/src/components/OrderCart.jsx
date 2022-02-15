import { ProductCart } from "./ProductCart";
import "../styles/orderCart.scss";
import api from "../services/api";
import React from "react";
import { useHistory } from 'react-router';

// let totalAmount = function total(number, price) {
//     return number * price;
// }


export function OrderCart(props) {
    const history = useHistory();
    const [number, setNumber] = React.useState(props.quantity);

    function sum() {
        if(number >= 1) {
            document.getElementById(`button-amount-subtract${props.cardId}`).disabled = false;
        }
        setNumber(number + 1);
        props.setTotal((prevState) => ({ ...prevState, total: prevState.total + props.price}));
        console.log(number);

        api.patch(`/cartItems/increment/${props.cardId}`)
                    .then((res) => {
                        console.log("Sucesso");
                        console.log(res.data);
                    }).catch((err) => {
                        console.log(err);
                    })
             
    }

    function subtract() {
        if(number <=1) {
            document.getElementById(`button-amount-subtract${props.cardId}`).disabled = true;
        } else {
            document.getElementById(`button-amount-subtract${props.cardId}`).disabled = false;
            setNumber(number - 1);
            props.setTotal((prevState) => ({ ...prevState, total: prevState.total - props.price}));
       
            api.patch(`/cartItems/decrement/${props.cardId}`)
            .then((res) => {
                console.log("Sucesso");
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
            })
    
        }
    }

    function deleteCartItem(){
        api.delete(`/cartItems/${props.cardId}`)
        .then((res) => {
            console.log("Sucesso");
            console.log(res.data);
            history.go(0);
        }).catch((err) => {
            console.log(err);
        })
    }
 
    React.useEffect(() => {
        props.setTotal((prevState) => ({ ...prevState, total: prevState.total + (props.price * props.quantity)}));
    }, []);

    return (
        <>
            <div className="order" id={props.cardId} value={number * props.price.toFixed(2)}>
                <ProductCart id={props.productId} text={props.productName} />
                <div className="order-props">
                    <div className="amount">
                        <button id={"button-amount-subtract"+props.cardId} onClick={subtract}>-</button>
                        <label>{number}</label>
                        <button id={"button-amount-sum"+props.cardId} onClick={sum}>+</button>
                    </div>

                    <h3>R${props.price.toFixed(2)}</h3>
                    <h3>R${(number * props.price).toFixed(2)}</h3>
                    <i class="fas fa-times-circle" onClick={deleteCartItem}></i>
                </div>
            </div>

        </>
    )
}

