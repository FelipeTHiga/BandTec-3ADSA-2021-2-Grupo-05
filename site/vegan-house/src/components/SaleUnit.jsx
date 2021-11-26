import "../styles/saleBox.scss";

export function SaleUnit(props) {
    return (
        <>
            <div className="sale-desc-order-unit" key={props.id}>
                <p>{props.product.id}</p>
                <p>{props.product.name}</p>
                <p>{props.quantity}</p>
                <p>{props.product.price}</p>
                <p>{props.total}</p>
            </div>
        </>
    )
}