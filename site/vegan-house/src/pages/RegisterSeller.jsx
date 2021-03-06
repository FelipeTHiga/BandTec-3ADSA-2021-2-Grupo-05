import { Title } from '../components/Title';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Submenu } from '../components/Submenu';
import { useState } from 'react';
import { useHistory } from 'react-router';
import Loading from '../assets/images/loading.gif'


import InputMask from 'react-input-mask'
import api from '../services/api';
import loginService from '../services/login';

import '../styles/registerSeller.scss';
import '../styles/global.scss';


export function RegisterSeller() {

    let user = loginService.getSession();
    const history = useHistory();
    const [commercialName, setCommercialName] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [commercialEmail, setCommercialEmail] = useState("");
    const [error, setError] = useState("");
    const [errorCommercialName, setErrorCommercialName] = useState("");
    const [errorCnpj, setErrorCnpj] = useState("");
    const [errorCommercialEmail, setErrorCommercialEmail] = useState("");
    const [loading, setLoading] = useState(false);


    function warmings(errors) {
        console.log(errors)
        if (errors.commercialEmail) {
            setErrorCommercialEmail(errors.commercialEmail)
        }
        if (errors.commercialName) {
            setErrorCommercialName(errors.commercialName)
        }
        if (errors.cnpj) {
            setErrorCnpj(errors.cnpj)
        }


    }


    // function submitSeller(e) {

    //     e.preventDefault();

    //     setError("");
    //     setErrorCommercialName("");
    //     setErrorCnpj("");
    //     setErrorCommercialEmail("");

    //     const user = {
    //         commercialName: document.getElementById("name").value,
    //         cnpj: document.getElementById("cnpj").value.replace(/\D/g, ''),
    //         commercialEmail: document.getElementById("email").value,
    //     }
    //     api({
    //         method: 'post',
    //         url: '/sellers',
    //         data: user,
    //     })
    //         .then(function (response) {
    //             console.log(response)
    //             console.log(response.data)
    //             console.log(response.config)
    //             console.log(response.status);
    //             console.log(response.request);
    //             console.log(response.statusText);
    //             history.push('/');
    //         })
    // }

    function registerSeller(e) {
        e.preventDefault();

        setError("");
        setErrorCommercialName("");
        setErrorCnpj("");
        setErrorCommercialEmail("");
      
        if (!document.getElementById("checkbox").checked) {
            setError("Voc?? precisa aceitar nossos termos para poder continuar.")
        } else {
            setLoading(true);
            api.post(`/sellers/${user.id}`, {
                commercialName: commercialName,
                cnpj: cnpj.replace(/\D/g, ''),
                commercialEmail: commercialEmail,
            })
                .then((res) => {
                    setLoading(false);
                    if (res.status === 201) {
                        let parseDados = JSON.stringify(res.data);
                        sessionStorage.setItem("user", parseDados);
                        history.push(`/perfil/seller`);
                    
                    } else if (res.status === 400){
                        console.log(res)
                        setError("Ocorreu um erro no cadastro!" + res.statusText);

                    }
                }, err => {
                    setLoading(false);
                     if(err.response.status === 409) {
                        setError("Ocorreu um erro no cadastro!");
                    } else {
                        warmings(err.response.data);
                    }

                })

        }
    }


    return (
        <>
            <Navbar />
            <Submenu />
            <section className="register">
                <div className="container-register">
                    <Title title="Cadastro" />

                    <div className="register-content-seller">
                        <h2>Dados comerciais</h2>
                        <form onSubmit={registerSeller}>
                            <div className="name-seller">
                                <label for="name">Nome comercial</label>
                                <div className="name-content-seller">
                                    <i className="fas fa-user"></i>
                                    <input id="name" onChange={e => setCommercialName(e.target.value)} type="text" placeholder="Ex. Doces do Jo??o" />
                                    <p>*</p>
                                </div>
                                {errorCommercialName && <p className="error">{errorCommercialName}</p>}
                            </div>

                            <div className="cnpj-seller">
                                <label for="cnpj">CNPJ</label>
                                <div className="cnpj-content-seller">
                                    <i className="fas fa-id-card"></i>
                                    <InputMask mask="99.999.999/9999-99" id="cnpj" onChange={e => setCnpj(e.target.value)} type="text" />
                                    <p>*</p>
                                </div>
                                <label className="instructions">Digite apenas n??meros</label>
                                {errorCnpj && <p className="error">{errorCnpj}</p>}
                            </div>

                            <div className="email-seller">
                                <label for="email">E-mail comercial</label>
                                <div className="email-content-seller">
                                    <i className="far fa-envelope"></i>
                                    <input id="email" onChange={e => setCommercialEmail(e.target.value)} type="email" placeholder="Ex. DocesJ@email.com" />
                                    <p>*</p>
                                </div>
                                {errorCommercialEmail && <p className="error">{errorCommercialEmail}</p>}
                            </div>
                            <div class="term-area">
                                <input type="checkbox" id="checkbox" />
                                <p class="phrase">Li e concordo com os <a class="term" href="">termos do regulamento</a>.</p>
                            </div>

                            <button className="button" type="submit">Enviar</button>
                            {error && <p className="error">{error}</p>}
                            {loading && <img className="loading-gif" src={Loading} alt="loading..." />}
                        </form>
                    </div>
                </div>

            </section>
            <Footer />
        </>

    )
}
