import '../styles/productCart.scss'

export function ProductCart(props) {

    return (
        <>
            <div className="products">
                <img src={`http://174.129.13.249:8080/products/image/${props.id}/1`} alt="" />
                <h1>{props.text}</h1>
            </div>
        </>
    )
}