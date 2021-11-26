import '../styles/productCart.scss'

export function ProductCart(props) {
    return (
        <>
        <div className="products">
            <img src={props.url} alt="" />
            <h1>{props.text}</h1>
        </div>
        </>
    )
}