import '../styles/productCart.scss'

export function ProductCart(props) {
    return (
        <>
        <div className="products">
            <img src={props.src} alt="" />
            <h1>{props.text}</h1>
        </div>
        </>
    )
}