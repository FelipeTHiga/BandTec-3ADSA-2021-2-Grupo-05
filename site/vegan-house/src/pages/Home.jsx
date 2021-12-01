import { Navbar } from '../components/Navbar';
import { Submenu } from '../components/Submenu';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Link } from 'react-router-dom';

import loginService from '../services/login';
import kerai from '../assets/images/logos/logo-kerai.png';
import vegSeed from '../assets/images/logos/logo-vegSeed.png';
import larVegan from '../assets/images/logos/logo-larVegan.png';

import '../styles/carroussel.scss'
import '../styles/card.scss'
import '../styles/home.scss';

export function Home() {

    return (
        <>
            <Navbar />
            <Submenu />
            <section className="container-main-banner line-up">

                <div className="container-main-phrase line-up">
                    <div className="container-phrase line-up">
                        <h1 className="title-banner">Seja bem vinde!</h1>
                        <p>Vegan house, o lar de produtos 100% veganos.</p>
                        <Link to="/todos-os-resultados/Todos">
                            <Button text="Explorar" />
                        </Link>
                    </div>
                </div>
                <div className="container-img-banner"></div>

            </section>

            <section className="container-pattern container-products-home">
                <div className="container-title-pattern line-up">
                    <div className="line-average"></div>
                    <p>Novidades</p>
                    <div className="line-average"></div>
                </div>
                <div className="container-products-and-arrow">
                    <div className="container-cards-products">
                        <Card />
                    </div>
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
                    <img src={kerai}/>
                    <img src={vegSeed}/>
                    <img src={larVegan}/>
                </div>

                <div class="line-great"></div>
            </section>
            {/* <!-- fim container de vendedores --> */}

            {/* <!-- inicio container de produtos 2--> */}
            <section class="container-pattern container-products-home">
                <div class="container-title-pattern line-up">
                    <div class="line-average"></div>
                    <p>Destaques</p>
                    <div class="line-average"></div>
                </div>

                <div class="container-products-and-arrow">

                    <div class="container-cards-products ">
                        <Card />
                    </div>

                </div>

                <div class="line-great"></div>
            </section>
            {/* <!-- fim container de produtos 2--> */}

            <Footer />
        </>
    )
}




