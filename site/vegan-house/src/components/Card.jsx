import shoe from '../assets/images/shoe.png'
import star from '../assets/images/star.png'
import halfStar from '../assets/images/half-star.png'
import '../styles/card.scss'

import { newsProducts } from '../scripts/vetor.js';

function ShowStars(note) {

    if (note <= 0.5) {
        return (
            <>
                <img src={halfStar} />
            </>
        )

    } else if (note <= 1) {
        return (
            <>
                <img src={star} />
            </>
        )

    } else if (note <= 1.5) {
        return (
            <>
                <img src={star} />
                <img src={halfStar} />
            </>
        )

    }
    else if (note <= 2) {
        return (
            <>
                <img src={star} />
                <img src={star} />
            </>
        )

    } else if (note <= 2.5) {
        return (
            <>
                <img src={star} />
                <img src={star} />
                <img src={halfStar} />
            </>
        )
    } else if (note <= 3) {
        return (
            <>
                <img src={star} />
                <img src={star} />
                <img src={star} />
            </>
        )
    } else if (note <= 3.5) {
        return (
            <>
                <img src={star} />
                <img src={star} />
                <img src={star} />
                <img src={halfStar} />
            </>
        )
    } else if (note <= 4) {
        return (
            <>
                <img src={star} />
                <img src={star} />
                <img src={star} />
                <img src={star} />
            </>
        )
    } else if (note <= 4.5) {
        return (
            <>
                <img src={star} />
                <img src={star} />
                <img src={star} />
                <img src={star} />
                <img src={halfStar} />
            </>
        )
    } else {
        return (
            <>
                <img src={star} />
                <img src={star} />
                <img src={star} />
                <img src={star} />
                <img src={star} />
            </>
        )
    }
}


const creatCard = (card, index) => {
    return (
        <div className="card-product line-up" key={index}>
            <img src={shoe} />
            <div className="container-evaluation-card line-up">
                <div className="container-stars line-up">
                    {ShowStars(card.note)}
                    <div>{card.note}</div>
                    <div className="container-note line-up">
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