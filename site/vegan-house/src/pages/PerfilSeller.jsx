
import { Footer } from '../components/Footer';
import { Navbar } from "../components/Navbar";
import { UserGreeting } from '../components/UserGreeting';
import { Title } from '../components/Title';
import { AccountMenu } from '../components/AccountMenu';
import { SellerMenu } from '../components/SellerMenu';
import { SectionTitle } from '../components/SectionTitle';
import loginService from "../services/login";


import '../styles/perfilSeller.scss';
import '../styles/perfil.scss';
import '../styles/global.scss';
import '../styles/reset.css';
import api from '../services/api';

import Selo_1 from '../assets/images/certifications/Selo-1.png';
import Selo_2 from '../assets/images/certifications/Selo-2.png';
import Selo_3 from '../assets/images/certifications/Selo-3.png';
import Selo_4 from '../assets/images/certifications/Selo-4.png';
import Selo_5 from '../assets/images/certifications/Selo-5.png';



export function PerfilSeller() {

    let user = loginService.getSession();

    async function updateSeller() {

        const certification1 = document.getElementById("checkCertifications1")
        const certification2 = document.getElementById("checkCertifications2")
        const certification3 = document.getElementById("checkCertifications3")
        const certification4 = document.getElementById("checkCertifications4")
        const certification5 = document.getElementById("checkCertifications5")
        document.getElementById("checkCertifications1").checked = true;
        document.getElementById("checkCertifications2").checked = true;

        let certificationAr = [certification1, certification2, certification3, certification4, certification5];

        let certificationChecked = certificationAr.filter(certification => certification.checked === true);

        let certificationPost = await certificationChecked.map((certification) => {
            const sellerCertified = {
                fkCertification: certification.value,
                fkSeller: user.id
            } 
            //hasCertification: 1
            return sellerCertified
        })

        await api({
            method: 'post',
            url: '/certifieds',
            data: certificationPost,
        })
            .then(function (response) {
                console.log(response.status);
            });
    }

    return (
        <>
            <Navbar />

            <div className="page-container">
                <UserGreeting username={user.nameUser} isSeller={user.isSeller} />
            </div>

            <div className="line-up">
                <Title title="Seu perfil" />
            </div>
            <div className="page-container">
                <div className="container-menu-and-seller">
                    <div className="section-menus">
                        <AccountMenu isSeller={true} />
                        <SellerMenu isSeller={true} />
                    </div>
                    <div className="container-data-user container-data-user-seller">
                        <SectionTitle text="Dados comerciais" />
                        <form>
                            <div className="container-input">
                                <label for="nameCommercial">Nome Comercial</label>
                                <div>
                                    <i className="fas fa-user line-up icon-left-radius"></i>
                                    <input className="input-default " type="text" placeholder="" name="" id="nameCommercial" />
                                </div>
                            </div>
                            <div className="container-input">
                                <label for="cnpj">CNPJ</label>
                                <div>
                                    <i className="far fa-id-card line-up icon-left-radius"></i>
                                    <input className="input-default " type="text" placeholder="" name="" id="cnpj" />
                                </div>
                            </div>
                            <div className="container-input">
                                <label for="email">Email Comercial</label>
                                <div>
                                    <i className="far fa-envelope line-up icon-left-radius"></i>
                                    <input className="input-default " type="text" placeholder="" name="" id="email" />
                                </div>
                            </div>
                        </form>
                        <SectionTitle text="Contato & Redes Sociais" />
                        <form>
                            <div className="container-input">
                                <label for="whatsapp">WhatsApp</label>
                                <div>
                                    <i className="fab fa-whatsapp line-up icon-left-radius"></i>
                                    <input className="input-default " type="text" placeholder="" name="" id="whatsapp" />
                                </div>
                            </div>
                            <div className="container-input">
                                <label for="Instagram">Instagram</label>
                                <div>
                                    <i className="fab fa-instagram line-up icon-left-radius"></i>
                                    <input className="input-default " type="text" placeholder="" name="" id="Instagram" />
                                </div>
                            </div>
                            <div className="container-input">
                                <label for="facebook">Facebook</label>
                                <div>
                                    <i className="fab fa-facebook-square line-up icon-left-radius"></i>
                                    <input className="input-default " type="text" placeholder="" name="" id="facebook" />
                                </div>
                            </div>
                        </form>
                        <SectionTitle text="Certificações" />
                        <form action="">
                            <div className="container-title-certification">
                                <p>Nome</p>
                                <div>
                                    <p>Possui</p>
                                </div>
                            </div>

                            <div className="container-input-certification">
                                <div className="container-label-certification">
                                    <img src={Selo_1} alt="" />
                                    <label for="checkCertifications1">Selo da Sociedade Vegetariana Brasileira</label>
                                </div>
                                <div className="container-checkbox">
                                    <input value="1" className="input-checkbox" type="checkbox" placeholder="" name="" id="checkCertifications1" />
                                </div>
                            </div>

                            <div className="container-input-certification">
                                <div className="container-label-certification">
                                    <img src={Selo_2} alt="" />
                                    <label for="checkCertifications2">Selo The Leaping Bunny</label>
                                </div>
                                <div className="container-checkbox">
                                    <input value="2" className="input-checkbox" type="checkbox" placeholder="" name="" id="checkCertifications2" />
                                </div>
                            </div>

                            <div className="container-input-certification">
                                <div className="container-label-certification">
                                    <img src={Selo_3} alt="" />
                                    <label for="checkCertifications3">Selo Escolha sem Crueldade</label>
                                </div>
                                <div className="container-checkbox">
                                    <input value="3" className="input-checkbox" type="checkbox" placeholder="" name="" id="checkCertifications3" />
                                </div>
                            </div>

                            <div className="container-input-certification">
                                <div className="container-label-certification">
                                    <img src={Selo_4} alt="" />
                                    <label for="checkCertifications4">Certificado Vegano da Organização Veganismo Brasi</label>
                                </div>
                                <div className="container-checkbox">
                                    <input value="4" className="input-checkbox" type="checkbox" placeholder="" name="" id="checkCertifications4" />
                                </div>
                            </div>

                            <div className="container-input-certification">
                                <div className="container-label-certification">
                                    <img src={Selo_5} alt="" />
                                    <label for="checkCertifications5">Selo da Vegan Societ</label>
                                </div>
                                <div className="container-checkbox">
                                    <input value="5" className="input-checkbox" type="checkbox" placeholder="" name="" id="checkCertifications5" />
                                </div>
                            </div>

                        </form>
                        <div className="container-button-update-user line-up">
                            <button onClick={updateSeller}>Atualizar</button>
                        </div>



                    </div>



                </div>
            </div>
            <Footer/>


        </>

    );
}