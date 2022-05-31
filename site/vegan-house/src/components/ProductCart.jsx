import '../styles/productCart.scss'

export function ProductCart(props) {

    return (
        <>
            <div className="products">
                <img src={`http://34.205.210.155:8080/products/image/${props.id}/1`} alt="" />
                <h1>{props.text}</h1>
            </div>
        </>
    )
}