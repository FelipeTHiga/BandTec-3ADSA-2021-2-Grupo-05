import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { Submenu } from '../components/Submenu';
import { Title2 } from '../components/Title2';
import { SectionTitle } from '../components/SectionTitle';
import { SubTitle } from '../components/SubTitle';
import { SocialMidia } from '../components/SocialMidia';
import { Certification } from '../components/Certification';
import { ProductTextDescription } from '../components/ProductTextDescription';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import { BuyCard } from '../components/BuyCard';

import api from '../services/api';
import loginService from '../services/login';
import logoInstagram from '../assets/images/social-midias/logo-instagram.png';
import logoFacebook from '../assets/images/social-midias/logo-facebook.png';
import logoWhatsapp from '../assets/images/social-midias/logo-whatsapp.png';

import '../styles/global.scss';
import '../styles/reset.css';
import '../styles/productPage.scss';

function selectImage(e) {

    document.getElementById('selected-image').src = e.target.src

    if (document.querySelector('.img-active') !== null) {
        document.querySelector('.img-active').classList.remove('img-active');
    }
    document.getElementById(e.target.id).classList.add('img-active');

}

export function ProductPage() {

    let { category, id, fkSeller } = useParams();
    const [product, setProduct] = useState({});
    const [seller, setSeller] = useState({});
    const [sellerCertification, setSellerCertification] = useState([]);
    const history = useHistory();
    let authenticatedUser = {
        authenticated: false
    }
    let userLogged = loginService.getSession() ?? authenticatedUser;

    useEffect(() => {

        async function productById() {
            const res = await api.get(`/products/${id}`);
            setProduct(res.data);
            console.log(res.data);
        }

        async function sellerById() {
            const res = await api.get(`/sellers/${fkSeller}`);
            setSeller(res.data);
            console.log(res.data);
        }

        async function sellerCertification() {
            const res = await api.get(`/certifieds/${fkSeller}`);
            setSellerCertification(res.data);
            console.log(res.data);
        }

        productById();
        sellerById();
        sellerCertification();
    }, [], {}, [])

    function postCartItem(e) {
        e.preventDefault();
        debugger;
        api.post(`/cartItems/${userLogged.id}`, {
            product: {
                id: product.id
            },
            quantity: 1,
            fkUser: userLogged.id
        })
            .then((res) => {
                if (res.status === 201) {
                    console.log("Item de carrinho adicionado - " + res.statusText);
                    alert("Sucesso")
                    history.push(``);
                } else {

                }
                console.log(res.status);
            }).catch((err) => {
                console.log(err);

            })

    }

    return (
        <>
            <Navbar />
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
                                    <img id="img-1" src={`http://localhost:8080/products/image/${id}/1`}
                                        onClick={selectImage}
                                        className="image img-active" />
                                    <img id="img-2" src={`http://localhost:8080/products/image/${id}/2`}
                                        onClick={selectImage}
                                        className="image" />
                                    <img id="img-3" src={`http://localhost:8080/products/image/${id}/3`}
                                        onClick={selectImage}
                                        className="image" />
                                </div>
                                <img id="selected-image" src={`http://localhost:8080/products/image/${id}/1`} className="big-image" />
                            </div>
                            <BuyCard product={product} seller={seller} addCartItem={postCartItem} />
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
                                        {sellerCertification.length > 0 ?

                                            sellerCertification.map(certification => (
                                                <Certification name={certification[0]}
                                                    src={certification[1]} />
                                            ))
                                            : null
                                        }
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

