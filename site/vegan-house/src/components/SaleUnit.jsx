import "../styles/saleBox.scss";

export function SaleUnit(props) {
    return (
        <>
            <div className="sale-desc-order-unit" key={props.id}>
                <p>{props.product.id}</p>
                <p>{props.product.name}</p>
                <p>{props.quantity}</p>
                <p>R$ {Number(props.product.price).toFixed(2)}</p>
                <p>R$ {Number(props.total).toFixed(2)}</p>
            </div>
        </>
    )
}