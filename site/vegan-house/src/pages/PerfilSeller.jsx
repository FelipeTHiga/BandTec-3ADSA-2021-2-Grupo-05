
import { Footer } from '../components/Footer';
import { Navbar } from "../components/Navbar";
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
            {/* //  Inicio header  */}
            <Navbar isLogged={user} />
            {/* //  fim header  */}

            {/* //  inicio nome usuario  */}
            <div className="container-name-user line-up">
                <div className="line-up">
                    <div className="name-user">João Silva</div>
                    <p>
                        Sua conta pessoal & comercial
                    </p>
                </div>
            </div>
            {/* //    fim nome usuario  */}

            {/* //  inicio titulo perfil  */}
            <div className="container-title-perfil line-up">
                <div className="line-up">
                    <p>Seu pefil</p>
                </div>
            </div>
            {/* //   fim titulo perfil  */}


            {/* //     inicio container menu e dados do usuario  */}
            <div className="container-menu-and-data-user line-up container-menu-and-data-user-commercial">

                {/* //  inicio container que alinha card do menu e dados do usuario  */}
                <div className="line-up ">

                    {/* //    inicio menu pefil usuario    */}
                    <div className="container-menus">
                        <div className="container-menu-perfil menu-seller">
                            <section>
                                <ul>
                                    <li className="radius-top-left-right">
                                        <p className="line-up">Minha conta</p>
                                    </li>
                                    <li className="active">
                                        <a href="#">Dados pessoais</a>
                                    </li>
                                    <li>
                                        <a href="#">Endereço</a>
                                    </li>
                                    <li>
                                        <a href="#">Segurança</a>
                                    </li>
                                    <li>
                                        <a href="#">Pedidos</a>
                                    </li>
                                    <li className="radius-bottom-left-right">
                                        <a href="#">Trabalhe conosco</a>
                                    </li>
                                </ul>
                            </section>
                        </div>

                        <div className="container-menu-perfil-seller">
                            <section>
                                <ul>
                                    <li className="title-menu-commercial radius-top-left-right">
                                        <p className="line-up">Comercial</p>
                                    </li>
                                    <li className="active">
                                        <a href="#">Produtos</a>
                                    </li>
                                    <li className="radius-bottom-left-right-seller">
                                        <a href="#">Vendas</a>
                                    </li>
                                </ul>
                            </section>
                        </div>

                    </div>


                    {/* //   fim menu pefil usuario    */}

                    {/* //   inicio container de dados do usuario comercial */}
                    <div className="container-data-user container-data-user-seller">

                        {/* //   inicio formulario de dados pessoais do usuario comercial */}
                        <div className="title-data-user">Dados comerciais</div>
                        <form action="" method="POST">
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
                        {/* //   fim formulario de dados pessoais do usuario comercial */}


                        {/* //    inicio formulario de dados de contato do usuario comercial */}
                        <div className="title-data-user">Contato & Redes Sociais</div>
                        <form action="POST">
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
                        {/* //  fim formulario de dados de contato do usuario comercial */}


                        {/* //  inicio formulario de certificações do seller  */}
                        <div className="title-data-user">Certificações</div>
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
                        {/* //  fim formulario de certificações do seller  */}



                        <div className="container-button-update-user line-up">
                            <button onClick={updateSeller}>Atualizar</button>
                        </div>
                        {/* //    fim formulario de dadaos comerciais do usuario  */}

                    </div>
                    {/* //    fim container de dados do usuario comercial */}

                </div>
                {/* //  fim container que alinha card do menu e dados do usuario  */}

            </div>
            {/* //   fim container menu e dados do usuario comercial */}


            {/* //  inicio footer  */}

            <Footer />

            {/* //  fim footer  */}
        </>

    );
}