import '../styles/productOrder.scss'

export function ProductOrder(props) {
    return (
        <>
        <div className="products-order">
            <img src={props.src} alt="" />
            <h3>{props.text}</h3>
        </div>
        </>
    )
}