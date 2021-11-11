import biomare from '../assets/images/logo-biomare.png';
import donatotta from '../assets/images/logo-donatotta.png';
import kerai from '../assets/images/logo-kerai.png';

import { newsProducts, sellersPop } from '../scripts/vetor.js';


const CreatCardSeller = (card, index)=>{
    return(
        <>
            <img src={kerai} key={index} />
        </>
    )
};

export function CardSeller(){
    return (
    sellersPop.map(CreatCardSeller)
    )
}
