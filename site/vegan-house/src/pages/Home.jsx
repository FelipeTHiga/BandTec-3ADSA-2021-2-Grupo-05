import { Navbar } from "../components/Navbar";
import { Submenu } from "../components/Submenu";
import { Footer } from "../components/Footer";
import { Button } from '../components/Button';
import { Card } from "../components/Card";
import { CardSeller } from "../components/CardSellers";
import '../styles/carousel.scss'

import '../styles/home.scss';
import { getUser } from "../scripts/crud-user";

export function Home() {
    return(
        <>
        <Navbar isLogged={getUser()}/>
        <Submenu/>
        <section className="container-main-banner line-up">
           
           <div className="container-main-phrase line-up">
                   <div className="container-phrase line-up">
                       <h1 className="title-banner">Seja bem vinde!</h1>
                           <p>Vegan house, o lar de produtos 100% veganos.</p>
                           <Button text="Explorar"/>
                   </div>
           </div>
   
                   <div className="container-img-banner"></div>
                   
       </section>



       <section className="container-pattern container-products">
            <div className="container-title-pattern line-up">
                <div className="line-average"></div>
                <p>Novidades</p>
                <div className="line-average"></div>
            </div>

            
            <div className="container-products-and-arrow line-up">
                <i  className="fas fa-caret-left arrow"></i>
                    <div  className="container-cards-products line-up">
                        <Card />
                        
                    </div>
                <i className="fas fa-caret-right arrow"></i>
            </div>

              <div className="line-great"></div>
    </section>



    {/* <!-- incio container de vendedores --> */}
    <section class="container-pattern container-sellers-pop line-up">
        <div class="container-title-pattern line-up">
            <div class="line-average"></div>
                <div class="container-title-sellers-pop">
                    <p>Vendedores</p> <p> Populares</p>
                </div>
            
            <div class="line-average"></div>
        </div>

        <div class="container-cards-sellers line-up">
            <CardSeller />
        </div>

        <div class="line-great"></div>
    </section>
    {/* <!-- fim container de vendedores --> */}




    {/* <!-- inicio container de produtos 2--> */}
    <section class="container-pattern container-products line-up">
        <div class="container-title-pattern line-up">
            <div class="line-average"></div>
                <p>Destaques</p>
            <div class="line-average"></div>
        </div>

        <div class="container-products-and-arrow line-up">
            <i class="fas fa-caret-left arrow"></i>
                <div class="container-cards-products products-highlights line-up">
                <Card />
                </div>
            <i class="fas fa-caret-right arrow"><a href="./"></a></i>
        </div>

              <div class="line-great"></div>
    </section>
    {/* <!-- fim container de produtos 2--> */}

        <Footer/>
        </>
    )
}
