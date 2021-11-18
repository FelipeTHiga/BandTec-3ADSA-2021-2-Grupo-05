import "../styles/orderBox.scss"
import { ProductOrder } from "./ProductOrder"
import pants from "../assets/images/pants-1.png"

export function OrderBox() {
    return (
        <>
            <div className="order-box">
                <div className="order-box-container">
                    <div className="order-desc">
                        <h1>Pedido <span>#2321</span></h1>
                        <ProductOrder text="Calça" src={pants} />
                    </div>
                    <div className="date-order">
                        <h2>Data</h2>
                        <p>23/10/2021</p>
                    </div>
                    <div className="total-order">
                        <h2>Total</h2>
                        <p>R$ 200,00</p>
                    </div>
                    <div className="status-order">
                        <h2>Status</h2>
                        <p className="p-status">PAGO</p>
                    </div>
                </div>
            </div>
        </>
    )
}