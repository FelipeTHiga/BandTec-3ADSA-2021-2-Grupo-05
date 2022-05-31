import { ShowStars } from "../scripts/showScore";
import '../styles/card.scss'
import { useHistory } from 'react-router';
import imgBaseUrl from "../scripts/img-base-url";


export function ProductCard(props) {

    const history = useHistory();

    const buyProduct = (event) => {
        history.push(`/todos-os-resultados/${props.category}/${props.id}/${props.fkSeller}`);
    }

    return (
        <>
            <div className="card-product line-up" key={props.id}>
                <div className="div-product-image">
                    <img className="card-img" src={`${imgBaseUrl.baseUrlDev}${props.id}/1`} />
                </div>
                <div className="container-evaluation-card line-up">
                    <div className="container-stars line-up">
                        {ShowStars(3.5)}
                        <div className="container-score line-up">
                            <div>{3.5}</div>
                        </div>
                    </div>
                </div>
                <div className="container-description-product">
                    <p className="description">{props.name}</p>
                    <p className="price">R${Number(props.price).toFixed(2)}</p>
                    <button onClick={buyProduct}><i className="fa fa-shopping-cart"></i>Comprar</button>
                </div>
            </div>
        </>
    );
}
