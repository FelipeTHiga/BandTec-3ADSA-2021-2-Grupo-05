import shoe from '../assets/images/shoe.png'
import pants from '../assets/images/pants-1.png'
import polish from '../assets/images/polish.png'
import tea from '../assets/images/tea.png'
import '../styles/card.scss'
import { useRef } from 'react'
import { newsProducts } from '../scripts/vetor.js'
import { ShowStars } from '../scripts/showScore'
import { ProductCard } from '../components/ProductCard'

function Card() {
    const carousel = useRef(null);


    const handleLeftClick = (e) => {
        e.preventDefault();
        console.log(carousel.current.offsetWidth);
        carousel.current.scrollLeft -= carousel.current.offsetWidth;

    };

    const handleRigthClick = (e) => {
        e.preventDefault();
        console.log(carousel.current.offsetWidth);
        carousel.current.scrollLeft += carousel.current.offsetWidth;
    };


    return (
        <>
            <div className="container">

                <div className="carousel" ref={carousel}>
                     <ProductCard/> 
                </div>
                <div className="buttons">
                    <button onClick={handleLeftClick}>
                        <i class="arrow fas fa-arrow-left"></i>
                    </button>
                    <button onClick={handleRigthClick}>
                        <i class="arrow fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </>
    );
}

export { Card };

