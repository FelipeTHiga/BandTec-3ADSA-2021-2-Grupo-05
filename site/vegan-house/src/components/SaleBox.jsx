import "../styles/saleBox.scss"
import { SaleUnit } from "./SaleUnit"

export function SaleBox() {
    return (
        <>
            <div className="sale-box">
                <div className="sale-box-container">
                    <div className="props-sale">
                        <div className="sale-desc">
                            <h1>Pedido <span>#2321</span></h1>
                            <h4 className="h4-customer">Cliente:</h4>
                            <h4>Endereço:</h4>
                        </div>
                        <div className="date-sale">
                            <h2>Data</h2>
                            <p>23/10/2021</p>
                        </div>
                        <div className="total-sale">
                            <h2>Total</h2>
                            <p>R$ 200,00</p>
                        </div>
                        <div className="status-sale">
                            <h2>Status</h2>
                            <p className="p-status">PAGO</p>
                        </div>
                        </div>

                        <div className="sale-desc-order">
                            <h3>ID</h3>
                            <h3>Descrição</h3>
                            <h3>Qtd.</h3>
                            <h3>Valor</h3>
                            <h3>Subtotal</h3>
                        </div>
                        <SaleUnit />

                </div>
            </div>
        </>
    )
}