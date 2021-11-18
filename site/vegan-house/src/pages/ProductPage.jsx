import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { Submenu } from "../components/Submenu";
import { Title2 } from "../components/Title2";
import { SectionTitle } from "../components/SectionTitle";
import { SubTitle } from "../components/SubTitle";
import { SocialMidia } from "../components/SocialMidia";
import { Certification } from "../components/Certification";
import { ProductTextDescription } from "../components/ProductTextDescription";
import shoppingCart from "../assets/images/shopping-cart.png";
import logoInstagram from "../assets/images/social-midias/logo-instagram.png";
import logoFacebook from "../assets/images/social-midias/logo-facebook.png";
import logoWhatsapp from "../assets/images/social-midias/logo-whatsapp.png";
import '../styles/global.scss';
import '../styles/reset.css';
import '../styles/productPage.scss';
import image1 from "../assets/images/pants-1.svg";
import image2 from "../assets/images/pants-2.svg";
import image3 from "../assets/images/pants-3.svg";
import React, { Component, useEffect, useState } from 'react';
import { useParams } from "react-router";
import { BuyCard } from "../components/BuyCard";
import api from "../services/api";


function selectImage(e) {

    document.getElementById('selected-image').src = e.target.src

    if (document.querySelector('.img-active') !== null) {
        document.querySelector('.img-active').classList.remove('img-active');
    }
    document.getElementById(e.target.id).classList.add('img-active');

}

export function ProductPage() {

    let {category, id} = useParams();
    const [product, setProduct] = useState({});
    const [seller, setSeller] = useState({});
    const [sellerCertification, setSellerCertification] = useState([]);

    useEffect(() => {
        async function productById() {
            const res = await api.get(`/products/${id}`);
            setProduct(res.data);
            console.log(res.data);
        }

        // async function sellerById() {
        //     const res = await api.get(`/users/${1}`);
        //     setSeller(res.data);
        //     console.log(res.data);
        // }

        async function sellerById() {
            console.log("TESTE" + product.fkUser)
            const res = await api.get(`/sellers/${1}`);
            setSeller(res.data);
            console.log(res.data);
        }

        async function sellerCertification() {
            const res = await api.get(`/certifieds/${1}`);
            setSellerCertification(res.data);
            console.log(res.data);
        }

        productById();
        sellerById();
        sellerCertification();
    }, [], {}, [])

    return (
        <>
            <Navbar isLogged={true} />
            <Submenu />

            <section className="section-title">
                <div className="line-up">
                    <Title2 title2={`Todos os resultados / ${category}`} />
                </div>
            </section>

            <section className="section-product">
                <div className=" line-up">
                    <div className="container-products-product-page">

                        <section className="section-product-info">
                            <div className="div-images">
                                <div className="small-images">
                                    <img id="img-1" src={image1}
                                        onClick={selectImage}
                                        alt="product-img-1" className="image img-active" />
                                    <img id="img-2" src={image2}
                                        onClick={selectImage}
                                        alt="product-img-2" className="image" />
                                    <img id="img-3" src={image3}
                                        onClick={selectImage}
                                        alt="product-img-3" className="image" />
                                </div>
                                <img id="selected-image" src={image1} alt="product-img-selected" className="big-image" />
                            </div>
                            <BuyCard product={product} seller={seller} />
                        </section>

                        <section className="section-product-description">
                            <div className="container-product-description">
                                <SubTitle subTitle="Descrição do produto" />
                                <ProductTextDescription description={product.description} />
                            </div>
                        </section>
                        <section className="section-product-seller">

                            <SubTitle subTitle="Sobre o vendedor" />
                            <div className="container-product-seller">

                                <div className="container-contacts">

                                    <SectionTitle text="Contato & Redes Sociais" />
                                    <div className="container-social-midias">
                                        <SocialMidia data={seller.instagramAccount} src={logoInstagram} />
                                        <SocialMidia data={seller.facebookAccount} src={logoFacebook} />
                                        <SocialMidia data={seller.whatsappNumber} src={logoWhatsapp} />
                                    </div>
                                </div>
                                <div className="container-certifications">

                                    <SectionTitle text="Certificações" />

                                    <div className="certifications">
                                        {sellerCertification.map(certification => (
                                            <Certification name={certification[0]}
                                            src={certification[1]} />
                                        ))}
                                        
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


// await api({
//     method: 'get',
//     url: `/products/${id}`,
// })
//     .then(function (res) {
//         setProduct(res.data)
//         console.log(res.data)
//         await api({
//             method: 'get',
//             url: `/sellers/${product.fkUser}`,
//         })
//             .then(function (res) {
//                 setSeller(res.data)
//                 console.log(res.data)
//                 await api({
//                     method: 'get',
//                     url: `/certifieds/${seller.id}`,
//                 })
//                     .then(function (res) {
//                         setSeller(res.data)
//                         console.log(res.data)
//                     });
//             })
//     })