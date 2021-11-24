import "../styles/checkout.css";


export function OrderItem(props) {
    return (
        <>
            <div className="order-item">
                <h4>{props.quantity}</h4>
                <h4 className="order-item-name">{props.productName}</h4>                
                <h4><b>R$ {props.subTotal}</b></h4>
            </div>
        </>
    )
}