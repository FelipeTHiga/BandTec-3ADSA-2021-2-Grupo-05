import shoe from '../assets/images/shoe.png'
import star from '../assets/images/star.png'
import '../styles/card.scss'
import newsProducts from '../scripts/vetor.js';

export function Card() {
    return (
        <div className="card-product line-up">
            <img src={shoe} />
            <div className="container-evaluation-card line-up">
                <div className="container-stars line-up">
                    <img src={star} />
                    <img src={star} />
                    <img src={star} />
                    <img src={star} />
                    <img src={star} />
                    <div className="container-note line-up">
                        <p>5</p>
                    </div>
                </div>
           </div>
           <div className="container-description-product">
                <p className="description">Descrição de alguma coisa</p>
                <p className="price">R$50,00</p>
                <button><i className="fa fa-shopping-cart"></i>Comprar</button>
           </div>
        </div>
    )
}