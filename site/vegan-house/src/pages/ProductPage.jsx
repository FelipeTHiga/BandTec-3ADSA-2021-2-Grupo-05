import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { Submenu } from "../components/Submenu";
import { Title } from "../components/Title";
import shoppingCart from "../assets/images/shopping-cart.png";
import logoInstagram from "../assets/images/social-midias/logo-instagram.png";
import logoFacebook from "../assets/images/social-midias/logo-facebook.png";
import logoWhatsapp from "../assets/images/social-midias/logo-whatsapp.png";
import selo1 from "../assets/images/certifications/Selo-1.png";
import selo2 from "../assets/images/certifications/Selo-2.png";
import selo3 from "../assets/images/certifications/Selo-3.png";
import selo4 from "../assets/images/certifications/Selo-4.png";
import selo5 from "../assets/images/certifications/Selo-5.png";
import '../styles/global.scss';
import '../styles/reset.css';
import '../styles/productPage.css';
import { SectionTitle } from "../components/SectionTitle";


export function ProductPage() {
    return (
        <>
            <Navbar isLogged={true} />
            <Submenu />

            <section className="section-title">
                <div className="line-up">
                    <Title title="Todos os resultados /" />
                </div>
            </section>

            <section className="section-product">
                <div className=" line-up">
                    <div className="div-products">

                        <div className="product-info">
                            <div className="div-images">
                                <div className="small-images">
                                    <div className="image"><img src="" alt="" /></div>
                                    <div className="image"><img src="" alt="" /></div>
                                    <div className="image"><img src="" alt="" /></div>
                                </div>
                                <div className="big-image">
                                    <img src="" alt="" />
                                </div>
                            </div>
                            <div className="buy-card">
                                <div className="product-infos">
                                    <div className="product-title">
                                        <h1>props.description</h1>
                                    </div>
                                    <div className="product-note">
                                        <div className="starts">
                                            <img src="" alt="" />
                                        </div>
                                        <div className="note">
                                            <h5>props.note</h5>
                                        </div>
                                        <div className="product-seller">
                                            <h4>Vendido por props.seller</h4>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="product-price">
                                    <h1>R$props.price</h1>
                                </div>
                                <div className="">
                                    <button className="buy-btn" onclick="buy()">
                                        {/* <i class="fas fa-shopping-cart"></i> */}
                                        <img src={shoppingCart} alt="" />
                                        <h2>Comprar</h2>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="product-description">
                            <div className="container-product-description">
                                <div className="sub-title">Descrição do produto</div>
                                <div className="text-description">
                                    <p>
                                        A Calça de algodão é a escolha certa para criar looks com muito estilo! Confeccionada em jeans color, a calça apresenta modelagem paper bag, a queridinha do momento! Perfeita para ocasiões especiais, encontros com os amigos e com o crush, aposte!
                                        <br />
                                        <br />
                                        Características: <br />
                                        Modelo paper bag <br />
                                        Cós elástico <br />
                                        Cós com passantes <br />
                                        Braguilha com zíper e botões <br />
                                        Bolsos frontais tipo faca <br />
                                        Bolsos posteriores <br />
                                        Barra simples <br />
                                        <br />
                                        <br />
                                        A cor do produto nas fotos reproduzidas com modelos, pode sofrer alteração em decorrência do uso do flash.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="product-seller">

                            <div className="sub-title">Sobre o vendedor</div>
                            <div className="container-product-seller">

                                <div className="container-contacts">

                                    <SectionTitle text="Contato & Redes Sociais" />
                                    <div className="social-midias">
                                        <div className="instagram">
                                            <img src={logoInstagram} alt="" />
                                            <h4>@</h4>
                                        </div>
                                        <div className="facebook">
                                            <img src={logoFacebook} alt="" />
                                            <h4>@</h4>
                                        </div>
                                        <div className="whatsapp">
                                            <img src={logoWhatsapp} alt="" />
                                            <h4>()</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="container-certifications">

                                        <SectionTitle text="Certificações" />

                                    <div className="certifications">
                                        <div className="certification">
                                            <img src={selo1} alt="" />
                                            <h3>Selo 1</h3>
                                        </div>
                                        <div className="certification">
                                            <img src={selo2} alt="" />
                                            <h3>Selo 2</h3>
                                        </div>
                                        <div className="certification">
                                            <img src={selo3} alt="" />
                                            <h3>Selo 3</h3>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>






            {/* <Footer/> */}
        </>

    );
}