import "../styles/orderBox.scss"
import { ProductOrder } from "./ProductOrder"
export function OrderBox(props) {
    function color() {
        if(props.status === "Pagamento aprovado") {
            return "p-status-green"
        } else if(props.status === "Pagamento rejeitado") {
            return "p-status-red"
        } else {
            return "p-status-blue"
        }
    }
    return (
        <>
            <div className="order-box">
                <div className="order-box-container">
                    <div className="order-desc">
                        <h1>Pedido <span>#{props.orderId}</span></h1>
                        {props.orderItems.map(orderItems=><ProductOrder text={orderItems.product.name} src={`http://localhost:8080/products/image/${orderItems.product.id}/1`}/>)}
                    </div>
                    <div className="date-order">
                        <h2>Data</h2>
                        <p>{props.date}</p>
                    </div>
                    <div className="total-order">
                        <h2>Total</h2>
                        <p>R${Number(props.total).toFixed(2)}</p>
                    </div>
                    <div className="status-order">
                        <h2>Status</h2>
                        <p className={`p-status ${color()}`}>{props.status}</p>
                    </div>
                </div>
            </div>
        </>
    )
}