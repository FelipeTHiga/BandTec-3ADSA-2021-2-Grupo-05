import shoe from '../assets/images/shoe.png'
import pants from '../assets/images/pants-1.png'
import polish from '../assets/images/polish.png'
import tea from '../assets/images/tea.png'
import star from '../assets/images/star.png'
import halfStar from '../assets/images/half-star.png'
import '../styles/card.scss'
import { useRef } from 'react';

import { newsProducts } from '../scripts/vetor.js';


function ShowStars(note){
   
        if (note <= 0.5){
            return(
                <>
                    <img src={halfStar} />
                </>
             )

        } else if(note <= 1) {
            return (
                <>
                    <img src={star}/>
                </>
            )

        } else if (note <= 1.5){
            return (
                <>
                    <img src={star}/>
                    <img src={halfStar} />
                </>
            )

        } 
        else if (note <= 2){
            return (
                <>
                    <img src={star}/>
                    <img src={star}/>
                </>
            )

        } else if (note <= 2.5){
            return (
                <>
                    <img src={star}/>
                    <img src={star}/>
                    <img src={halfStar} />
                </>
            )
        } else if (note <= 3) {
            return (
                <>
                    <img src={star}/>
                    <img src={star}/>
                    <img src={star}/>
                </>
            )
        } else if (note <= 3.5) {
             return (
                <>
                    <img src={star}/>
                    <img src={star}/>
                    <img src={star}/>
                    <img src={halfStar} />
                </>
            )
        } else if (note <= 4) {
            return (
                <>     
                    <img src={star}/>
                    <img src={star}/>
                    <img src={star}/>
                    <img src={star}/>
                </>
            )
        } else if (note <= 4.5) {
            return (
                <>  
                    <img src={star}/>
                    <img src={star}/>
                    <img src={star}/>
                    <img src={star}/>
                    <img src={halfStar} />
                 </>
            )
        } else {
             return (
                <>
                    <img src={star}/>
                    <img src={star}/>
                    <img src={star}/>
                    <img src={star}/>
                    <img src={star}/>
                </>
            )
        }
}



function Card() {
     const carousel = useRef(null);

    
      const handleLeftClick = (e)=>{
        e.preventDefault();
        console.log(carousel.current.offsetWidth);
        carousel.current.scrollLeft -= carousel.current.offsetWidth;
    
      };
    
      const handleRigthClick = (e)=>{
        e.preventDefault();
        console.log(carousel.current.offsetWidth);
        carousel.current.scrollLeft += carousel.current.offsetWidth;
      };
    
    
      return (
          <>
           <div className="container">

            <div className="carousel" ref={carousel}>
                {newsProducts.map((produto, index)=>{
                    const {note, price, description, category} = produto;
                    return (
                        <div className="card-product line-up" key={index}>
                           <img src={shoe} />
                           <div className="container-evaluation-card line-up">
                               <div className="container-stars line-up">
                                   {ShowStars(note)}
                                   <div className="container-note line-up">
                                       <div>{note}</div>
                                   </div>
                               </div>
                          </div>
                          <div className="container-description-product">
                               <p className="description">{description}</p>
                               <p className="price">R${price}</p>
                               <button><i className="fa fa-shopping-cart"></i>Comprar</button>
                          </div>
                       </div>
                    )
                })}
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

