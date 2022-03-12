import kerai from '../assets/images/logos/logo-kerai.png';


import { sellersPop } from '../scripts/vetor.js';


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
