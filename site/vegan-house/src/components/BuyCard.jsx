import '../styles/buyCard.scss';
import shoppingCart from '../assets/images/shopping-cart.png';

export function BuyCard(props) {
    return (
        <div className="container-buy-card">

            <div className="buy-card-info">
                <div className="product-title">
                    <h1>{props.description}</h1>
                </div>
                <div className="product-note">
                    <img src={props.src} alt="" />
                    <h6>{props.note}</h6>
                </div>
                <div className="product-seller">
                    <h4>Vendido por <u>{props.seller}</u></h4>
                </div>
            </div>
            <hr />
            <div className="product-price">
                <h1>R${props.price}</h1>
            </div>

            <div className="btn">
                {
                    props.isAvailable ? (
                        <>
                            <div className="container-buy-btn">
                                <button className="buy-btn" onclick="buy()">
                                    {/* <i class="fas fa-shopping-cart"></i> */}
                                    <img src={shoppingCart} alt="" />
                                    <h2>Comprar</h2>
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="container-unavailable-btn">
                                <button className="btn-unavailable">
                                    <h1>Indisponível</h1>
                                </button>
                                <h3>Avise-me quando chegar</h3>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    );
}