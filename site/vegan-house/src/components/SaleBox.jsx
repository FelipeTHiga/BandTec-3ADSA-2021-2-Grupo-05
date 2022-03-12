import "../styles/saleBox.scss"
import { SaleUnit } from "./SaleUnit"

export function SaleBox(props) {

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
        <input type="hidden" id="mercado-pago-public-key" value="TEST-622fb91c-f16d-4a94-a027-1feaaa7fb422" />
            <div className="sale-box" key={props.idOrder}>
                <div className="sale-box-container">
                    <div className="props-sale">
                        <div className="sale-desc">
                            <h1><b>Pedido</b> <span>{props.id}</span></h1>
                            <h4 className="h4-customer"><b>Cliente:</b> {props.user.nameUser}</h4>
                            <h4><b>Endereço:</b> {props.adress}</h4>
                        </div>
                        <div className="date-sale">
                            <h2>Data</h2>
                            <p>{props.date}</p>
                        </div>
                        <div className="total-sale">
                            <h2>Total</h2>
                            <p>R$ {Number(props.total).toFixed(2)}</p>
                        </div>
                        <div className="status-sale">
                            <h2>Status</h2>
                            <p className={`p-status ${color()}`}>{props.status}</p>
                        </div>
                        </div>

                        <div className="sale-desc-order">
                            <h3>ID</h3>
                            <h3>Descrição</h3>
                            <h3>Qtd.</h3>
                            <h3>Valor</h3>
                            <h3>Subtotal</h3>
                        </div>
                        {props.orderItems.map(orderItem => (<SaleUnit id={orderItem.idCartItem} quantity={orderItem.quantity} total={orderItem.subTotal} product={orderItem.product}/>))}
                </div>
            </div>
        </>
    )
}