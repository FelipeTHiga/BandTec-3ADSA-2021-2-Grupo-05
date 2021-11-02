import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { Submenu } from "../components/Submenu";
import { Title2 } from "../components/Title2";
import { SectionTitle } from "../components/SectionTitle";
import { SubTitle } from "../components/SubTitle";
import { SmallImage } from "../components/SmallImage";
import { SocialMidia } from "../components/SocialMidia";
import { BuyCard } from "../components/BuyCard";
import { BigImage } from "../components/BigImage";
import { Certification } from "../components/Certification";
import { ProductTextDescription } from "../components/ProductTextDescription";
import shoppingCart from "../assets/images/shopping-cart.png";
import logoInstagram from "../assets/images/social-midias/logo-instagram.png";
import logoFacebook from "../assets/images/social-midias/logo-facebook.png";
import logoWhatsapp from "../assets/images/social-midias/logo-whatsapp.png";
import '../styles/global.scss';
import '../styles/reset.css';
import '../styles/productPage.css';
import selo1 from "../assets/images/certifications/Selo-1.png";
import selo2 from "../assets/images/certifications/Selo-2.png";
import selo3 from "../assets/images/certifications/Selo-3.png";
import selo4 from "../assets/images/certifications/Selo-4.png";
import selo5 from "../assets/images/certifications/Selo-5.png";
import image1 from "../assets/images/pants-1.png";
import image2 from "../assets/images/pants-2.png";
import image3 from "../assets/images/pants-3.png";
import image4 from "../assets/images/pants-4.png";
import productService from '../services/crud-product';
import React, { Component, useState } from 'react';
import { BuyCard2 } from "../components/BuyCard2";

class ProductPageClass extends Component {
    state = {
        error: "",
        productById: {}
    };

    getProd() {
        // productService.getProductByIdAndSeller(1).then(list => {
        //     console.log(list)
        //     this.setState({ productById: list.data })
        //     console.log(this.state.productById.description)
        // })
        productService.getProductById(11).then(list => {
            console.log(list)
            this.setState({ productById: list.data })
            console.log(this.state.productById.description)
        })
    }

    componentDidMount() {
        this.getProd()
    }

    render() {
        return (
            <>
                <Navbar isLogged={true} />
                <Submenu />

                <section className="section-title">
                    <div className="line-up">
                        <Title2 title2="Todos os resultados /" />
                    </div>
                </section>

                <section className="section-product">
                    <div className=" line-up">
                        <div className="container-products-product-page">

                            <section className="section-product-info">
                                <div className="div-images">
                                    <div className="small-images">
                                        <SmallImage src={image1} />
                                        <SmallImage src={image2} />
                                        <SmallImage src={image3} />
                                    </div>
                                    <BigImage src={image4} />
                                </div>
                                {/* <BuyCard/> */}
                                <BuyCard2 product={this.state.productById} />
                            </section>

                            <section className="section-product-description">
                                <div className="container-product-description">
                                    <SubTitle subTitle="Descrição do produto" />
                                    <ProductTextDescription description={this.state.productById.description} />
                                </div>
                            </section>
                            <section className="section-product-seller">

                                <SubTitle subTitle="Sobre o vendedor" />
                                <div className="container-product-seller">

                                    <div className="container-contacts">

                                        <SectionTitle text="Contato & Redes Sociais" />
                                        <div className="container-social-midias">
                                            <SocialMidia data="@joaaoRoupas" src={logoInstagram} />
                                            <SocialMidia data="@joaaoRoupas" src={logoFacebook} />
                                            <SocialMidia data="(11)95877-5674" src={logoWhatsapp} />
                                        </div>
                                    </div>
                                    <div className="container-certifications">

                                        <SectionTitle text="Certificações" />

                                        <div className="certifications">
                                            <Certification src={selo2} name="Selo da Sociedade Vegetariana Brasileira" />
                                            <Certification src={selo3} name="Selo da Vegan Societ" />
                                            <Certification src={selo5} name="Certificado Vegano da Organização Veganismo Brasil" />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
                <Footer />
            </>
        );
    }
}

export function ProductPage(params) {
    return (
        new ProductPageClass()
    )
}


{/* A Calça de algodão é a escolha certa para criar looks com muito estilo! Confeccionada em jeans color, a calça apresenta modelagem paper bag, a queridinha do momento! Perfeita para ocasiões especiais, encontros com os amigos e com o crush, aposte!
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
                                    A cor do produto nas fotos reproduzidas com modelos, pode sofrer alteração em decorrência do uso do flash." */}
                                                                    // isAvailable={true}
                                // description="Calça de algodão marrom"
                                // src={stars}
                                // score="4.99"
                                // seller=" joaao"
                                // price="47,00" 

//                                 A Calça de algodão é a escolha certa para criar looks com muito estilo! Confeccionada em jeans color, a calça apresenta modelagem paper bag, a queridinha do momento! Perfeita para ocasiões especiais, encontros com os amigos e com o crush, aposte!

//      Características: 
//      Modelo paper bag 
//      Cós elástico
//      Cós com passantes 
//      Braguilha com zíper e botões 
//      Bolsos frontais tipo faca 
//      Bolsos posteriores 
//      Barra simples 


// A cor do produto nas fotos reproduzidas com modelos, pode sofrer alteração em decorrência do uso do flash.