import '../styles/productCart.scss'

export function ProductCart(props) {

    return (
        <>
            <div className="products">
                <img src={`http://localhost:8080/products/image/${props.id}/1`} alt="" />
                <h1>{props.text}</h1>
            </div>
        </>
    )
}