import '../styles/buyCard.scss';
import shoppingCart from '../assets/images/shopping-cart.png';
import stars from "../assets/images/stars.png";
import { ShowStars } from '../scripts/showScore';
import loginService from '../services/login';
import { subscribe } from '../services/crud-user';

export function BuyCard2(props) {

    var isAvailable = (props.product.inventory <= 0) ? false : true;
    let user = loginService.getSession();
    var isLogged = (user == null) ? false : true;

    return (
        <>
            <div className="container-buy-card">

                <div className="buy-card-info">
                    <div className="product-title">
                        <h1>{props.product.name}</h1>
                    </div>
                    <div className="product-score">
                        {/* <div className="container-stars teste">{ShowStars(product.score)}</div> */}
                        {/* <img src={ShowStars(product.score)} alt="" /> */}
                        <h6>2.3</h6>
                    </div>
                    <div className="product-seller">
                        <h4>Vendido por <u>joao</u></h4>
                    </div>
                </div>
                <hr />
                <div className="product-price">
                    <h1>R${(props.product.price)}</h1>
                    {/* .toFixed(2) */}
                </div>

                <div className="btn">
                    {
                        isAvailable ? (
                            <div className="container-buy-btn">
                                <button className="buy-btn" onclick="buy()">
                                    <img src={shoppingCart} alt="" />
                                    <h2>Comprar</h2>
                                </button>
                            </div>
                        ) : (
                            <div className="container-unavailable-btn">
                                <button className="btn-unavailable">
                                    <h1>Indisponível</h1>
                                </button>

                                {
                                    isLogged ? (
                                        <h3 onClick={()=> {subscribe(props.product.id)}}>Avise-me quando chegar</h3>
                                    ) : (
                                        <h3>Não</h3>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
}