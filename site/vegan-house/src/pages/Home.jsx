import { Navbar } from "../components/Navbar";
import { Submenu } from "../components/Submenu";
import { Footer } from "../components/Footer";
import { Button } from '../components/Button';
import { Card } from "../components/Card";
import '../styles/home.scss';

export function Home() {
    return(
        <>
        <Navbar isLogged={false}/>
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
                <i className="fas fa-caret-left arrow"></i>
                    <div className="container-cards-products line-up">
                        <Card />
                    
                    </div>
                <i className="fas fa-caret-right arrow"></i>
            </div>

              <div className="line-great"></div>
    </section>

        <Footer/>
        </>
    )
}