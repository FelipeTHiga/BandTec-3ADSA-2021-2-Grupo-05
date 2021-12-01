import biomare from '../assets/images/logos/logo-biomare.png';
import donatotta from '../assets/images/logos/logo-donatotta.png';
import kerai from '../assets/images/logos/logo-kerai.png';
import vegSeed from '../assets/images/logos/logo-vegSeed.png';
import larVegan from '../assets/images/logos/logo-larVegan.png';

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
