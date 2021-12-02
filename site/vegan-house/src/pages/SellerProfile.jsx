
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { UserGreeting } from '../components/UserGreeting';
import { Title } from '../components/Title';
import { AccountMenu } from '../components/AccountMenu';
import { SellerMenu } from '../components/SellerMenu';
import { SectionTitle } from '../components/SectionTitle';
import { useState, useEffect } from 'react';

import api from '../services/api';
import InputMask from 'react-input-mask';
import loginService from '../services/login';
import Selo_1 from '../assets/images/certifications/Selo-1.png';
import Selo_2 from '../assets/images/certifications/Selo-2.png';
import Selo_3 from '../assets/images/certifications/Selo-3.png';
import Selo_4 from '../assets/images/certifications/Selo-4.png';
import Selo_5 from '../assets/images/certifications/Selo-5.png';

import '../styles/sellerProfile.scss';
import '../styles/perfil.scss';
import '../styles/global.scss';
import '../styles/reset.css';

export function SellerProfile() {

    let user = loginService.getSession();

    const [commercialName, setCommercialName] = useState('');
    const [idSeller, setIdSeller] = useState(0);
    const [cnpj, setCnpj] = useState('');
    const [commercialEmail, setcommercialEmail] = useState('');
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [instagramAccount, setInstagramAccount] = useState('');
    const [facebookAccount, setFacebookAccount] = useState('');
    //const [erro, setErro] = useState("");
    const [sucess, setSucess] = useState(sessionStorage.getItem("sucess"));

    const [error, setError] = useState([]);
    const [errorCommercialName, setErrorCommercialName] = useState("");
    const [errorCnpj, setErrorCnpj] = useState("");
    const [errorCommercialEmail, setErrorCommercialEmail] = useState("");

    const certification1 = document.getElementById("1")
    const certification2 = document.getElementById("2")
    const certification3 = document.getElementById("3")
    const certification4 = document.getElementById("4")
    const certification5 = document.getElementById("5")

    let certificationAr = [certification1, certification2, certification3, certification4, certification5];

    function warmings(errors) {
        console.log(errors)
        for (var i = 0; i < errors.length; i++) {
            if (errors[i].field == 'commercialEmail') {
                setErrorCommercialEmail(errors[i].defaultMessage)
            } else if (errors[i].field == 'commercialName') {
                setErrorCommercialName(errors[i].defaultMessage)
            } else if (errors[i].field == 'cnpj') {
                setErrorCnpj(errors[i].defaultMessage)
            }
        }

    }

    useEffect(() => {

        async function payLoad() {
            const res = await api.get(`/sellers/${user.id}`);
            setIdSeller(res.data.idSeller)
            setCommercialName(res.data.commercialName);
            setCnpj(res.data.cnpj);
            setcommercialEmail(res.data.commercialEmail);
            setWhatsappNumber(res.data.whatsappNumber);
            setInstagramAccount(res.data.instagramAccount);
            setFacebookAccount(res.data.facebookAccount);
        }

        async function sellerCertification() {
            const res = await api.get(`/certifieds/${user.id}`);
            var data = res.data;
            for (var i = 0; i < data.length; i++) {
                switch (data[i][2]) {
                    case 1:
                        const certification1 = document.getElementById("1")
                        certification1.checked = true;
                        break;
                    case 2:
                        const certification2 = document.getElementById("2")
                        certification2.checked = true;
                        break;
                    case 3:
                        const certification3 = document.getElementById("3")
                        certification3.checked = true;
                        break;
                    case 4:
                        const certification4 = document.getElementById("4")
                        certification4.checked = true;
                        break;
                    case 5:
                        const certification5 = document.getElementById("5")
                        certification5.checked = true;
                        break;
                    default:
                        break;
                }
            }
        }

        payLoad();
        sellerCertification();
    }, [])

    function updateCommercialData(e) {
        e.preventDefault();

        setErrorCommercialName("");
        setErrorCnpj("");
        setErrorCommercialEmail("");
        updateSeller();
        updateSellerCertified();
    }

    async function updateSeller() {
        
        const updateSeller = {
            idSeller: idSeller,
            commercialName: commercialName,
            cnpj: cnpj.replace(/\D/g, ''),
            commercialEmail: commercialEmail,
            whatsappNumber: whatsappNumber,
            instagramAccount: instagramAccount,
            facebookAccount: facebookAccount,
            fkUser: user.id
        }

        api({
            method: 'put',
            url: `/sellers/${idSeller}`,
            data: updateSeller,
        })
            .then((res) => {
                if (res.status === 200) {
                    sessionStorage.setItem("sucess", "");
                    setSucess(null)
                    alert("Dados atualizados com sucesso!");
                    window.location.reload();
                } else {
                    //setErro("Não foi possível atualizar seus dados");
                    sessionStorage.setItem("sucess", "");
                    setSucess(null);
                    console.log(res)
                }
            }).catch((err) => {
                sessionStorage.setItem("sucess", "");
                //setErro("Ocorreu um erro ao tentar atualizar seus dados! Por favor, tente novamente.");
                setSucess(null);
            
                warmings(err.response.data.errors);
                console.log(err.response.data)
              
              
            })
    }

    async function updateSellerCertified() {

        let certificationUpdate = await certificationAr.map((certification) => {
            const sellerCertified = {
                fkCertification: certification.value,
                fkSeller: user.id,
                hasCertification: certification.checked,
            }
            return sellerCertified
        })

        await api({
            method: 'patch',
            url: "/certifieds",
            data: certificationUpdate,
        })
            .then(function (response) {
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
                                    <input className="input-default " type="text" placeholder="" name="" id="nameCommercial" value={commercialName} onChange={e => { setCommercialName(e.target.value) }} />
                                </div>
                                {errorCommercialName && <p className="error err-sellerP p-name">{errorCommercialName}</p>}
                            </div>
                            <div className="container-input">
                                <label for="cnpj">CNPJ</label>
                                <div>
                                    <i className="far fa-id-card line-up icon-left-radius"></i>

                                    <InputMask mask="99.999.999/9999-99" className="input-default " type="text" placeholder="" name="" id="cnpj" value={cnpj} onChange={e => { setCnpj(e.target.value) }} />
                                </div>
                                {errorCnpj && <p className="error">{errorCnpj}</p>}
                            </div>
                            <div className="container-input">
                                <label for="email">Email Comercial</label>
                                <div>
                                    <i className="far fa-envelope line-up icon-left-radius"></i>
                                    <input className="input-default " type="text" placeholder="" name="" id="email" value={commercialEmail} onChange={e => { setcommercialEmail(e.target.value) }} />
                                </div>
                                {errorCommercialEmail && <p className="error">{errorCommercialEmail}</p>}
                            </div>
                        </form>
                        <SectionTitle text="Contato & Redes Sociais" />
                        <form>
                            <div className="container-input">
                                <label for="whatsapp">WhatsApp</label>
                                <div>
                                    <i className="fab fa-whatsapp line-up icon-left-radius"></i>
                                    <InputMask mask="(99) 99999-9999" className="input-default " type="text" placeholder="" name="" id="whatsapp" value={whatsappNumber} onChange={e => { setWhatsappNumber(e.target.value) }} />
                                </div>
                            </div>
                            <div className="container-input">
                                <label for="Instagram">Instagram</label>
                                <div>
                                    <i className="fab fa-instagram line-up icon-left-radius"></i>
                                    <input className="input-default " type="text" placeholder="" name="" id="Instagram" value={instagramAccount} onChange={e => { setInstagramAccount(e.target.value) }} />
                                </div>
                            </div>
                            <div className="container-input">
                                <label for="facebook">Facebook</label>
                                <div>
                                    <i className="fab fa-facebook-square line-up icon-left-radius"></i>
                                    <input className="input-default " type="text" placeholder="" name="" id="facebook" value={facebookAccount} onChange={e => { setFacebookAccount(e.target.value) }} />
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
                                    <label for="1">Selo Escolha sem Crueldade</label>
                                </div>
                                <div className="container-checkbox">
                                    <input value="1" className="input-checkbox" type="checkbox" placeholder="" name="" id="1" />
                                </div>
                            </div>

                            <div className="container-input-certification">
                                <div className="container-label-certification">
                                    <img src={Selo_2} alt="" />
                                    <label for="2">Selo da Sociedade Vegetariana Brasileira</label>
                                </div>
                                <div className="container-checkbox">
                                    <input value="2" className="input-checkbox" type="checkbox" placeholder="" name="" id="2" />
                                </div>
                            </div>

                            <div className="container-input-certification">
                                <div className="container-label-certification">
                                    <img src={Selo_3} alt="" />
                                    <label for="3">Selo da Vegan Societ</label>
                                </div>
                                <div className="container-checkbox">
                                    <input value="3" className="input-checkbox" type="checkbox" placeholder="" name="" id="3" />
                                </div>
                            </div>

                            <div className="container-input-certification">
                                <div className="container-label-certification">
                                    <img src={Selo_4} alt="" />
                                    <label for="4">Selo The Leaping Bunny</label>
                                </div>
                                <div className="container-checkbox">
                                    <input value="4" className="input-checkbox" type="checkbox" placeholder="" name="" id="4" />
                                </div>
                            </div>

                            <div className="container-input-certification">
                                <div className="container-label-certification">
                                    <img src={Selo_5} alt="" />
                                    <label for="5">Certificado Vegano da Organização Veganismo Brasil</label>
                                </div>
                                <div className="container-checkbox">
                                    <input value="5" className="input-checkbox" type="checkbox" placeholder="" name="" id="5" />
                                </div>
                            </div>

                        </form>
                        <div className="container-button-update-user line-up">
                            <button onClick={updateCommercialData}>Atualizar</button>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}