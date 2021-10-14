import shoe from '../assets/images/shoe.png'
import star from '../assets/images/star.png'
import '../styles/card.scss'

import { newsProducts } from '../scripts/vetor.js';

const creatCard = (card, index) => {
    return (
        <div className="card-product line-up" key={index}>
        <img src={shoe} />
        <div className="container-evaluation-card line-up">
            <div className="container-stars line-up">
                <img src={star} />
                <img src={star} />
                <img src={star} />
                <img src={star} />
                <img src={star} />
                <div>{card.note}</div>
                <div className="container-note line-up">
                    <p>5</p>
                </div>
            </div>
       </div>
       <div className="container-description-product">
            <p className="description">{card.description}</p>
            <p className="price">R${card.price}</p>
            <button><i className="fa fa-shopping-cart"></i>Comprar</button>
       </div>
    </div>
    )
}


 export function Card() {
    return (
        newsProducts.map(creatCard)
    )
}