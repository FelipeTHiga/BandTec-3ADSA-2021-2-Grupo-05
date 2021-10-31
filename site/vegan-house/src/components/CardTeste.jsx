import shoe from '../assets/images/shoe.png'
import pants from '../assets/images/pants-1.png'
import polish from '../assets/images/polish.png'
import tea from '../assets/images/tea.png'
import { ShowStars } from "../scripts/showScore";
import { newsProducts } from "../scripts/vetor";
import '../styles/card.scss'
import { getProducts } from '../scripts/crud-product';

//var products = [];
getProducts().then(resultado => console.log("getProducts " + resultado))
var products = getProducts();
console.log(products)
console.log(typeof(products))
console.log(newsProducts)
console.log("NewProducts: " + typeof(newsProducts))

//var products = getProducts();
//Array.from(products[mapFn[produto]]);
// Array.from(products)
//console.log(products)
//console.log(typeof(products))
// console.log(productsArr)

export function CardTeste() {
    return (
        newsProducts.map((produto, index) => {
            const { score, price, description, category } = produto;
            //const {category, description, fkUser, id, inventory, name, price, subCategory}
            return (
                <>
                    <div className="card-product line-up" key={index}>
                        <img src={shoe} />
                        <div className="container-evaluation-card line-up">
                            <div className="container-stars line-up">
                                {ShowStars(score)}
                                <div className="container-score line-up">
                                    <div>{score}</div>
                                </div>
                            </div>
                        </div>
                        <div className="container-description-product">
                            <p className="description">{description}</p>
                            <p className="price">R${price}</p>
                            <button><i className="fa fa-shopping-cart"></i>Comprar</button>
                        </div>
                    </div>
                </>
            );
        })
    );  

}
