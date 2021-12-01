import { Title } from '../components/Title';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Submenu } from '../components/Submenu';
import { useState } from "react";
import { useHistory } from "react-router";

import api from '../services/api';
import InputMask  from 'react-input-mask'
import loginService from '../services/login';

import '../styles/registerSeller.scss';
import '../styles/global.scss';

export function RegisterSeller() {

    const [commercialName, setCommercialName] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [commercialEmail, setCommercialEmail] = useState("");
    const [error, setError] = useState("");
    let user = loginService.getSession();
    const history = useHistory();

    function registerSeller(e) {
        e.preventDefault();
        if (!document.getElementById("checkbox").checked) {
            setError("Você precisa aceitar nossos termos para poder continuar.")
        } else {
            api.post(`/sellers/${user.id}`,{
                commercialName: commercialName,
                cnpj: cnpj.replace(/\D/g, ''),
                commercialEmail: commercialEmail,
            })
            .then((res) => {
                if (res.status === 201) {
                    console.log("Cadastro realizado - " + res.statusText);
                    let parseDados = JSON.stringify(res.data);
                    sessionStorage.setItem("user", parseDados);
                    history.push(`/perfil/seller`);
                } else {
                    setError("Ocorreu um erro no cadastro!" + res.statusText);
                }
                console.log(res.status);
            }).catch((err) => {
                console.log(err);
                setError("Ocorreu um erro no cadastro!")
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
                                    <input id="name" onChange={e => setCommercialName(e.target.value)} type="text" placeholder="Ex. Doces do João" />
                                    <p>*</p>
                                </div>
                            </div>

                            <div className="cnpj-seller">
                                <label for="cnpj">CNPJ</label>
                                <div className="cnpj-content-seller">
                                    <i className="fas fa-id-card"></i>
                                    <InputMask mask="99.999.999/9999-99" id="cnpj" onChange={e => setCnpj(e.target.value)} type="text"/>
                                    <p>*</p>
                                </div>
                                <label className="instructions">Digite apenas números</label>
                            </div>

                            <div className="email-seller">
                                <label for="email">E-mail comercial</label>
                                <div className="email-content-seller">
                                    <i className="far fa-envelope"></i>
                                    <input id="email" onChange={e => setCommercialEmail(e.target.value)} type="email" placeholder="Ex. DocesJ@email.com" />
                                    <p>*</p>
                                </div>
                            </div>
                            <div class="term-area">
                                <input type="checkbox" id="checkbox"/>
                                <p class="phrase">Li e concordo com os <a class="term" href="">termos do regulamento</a>.</p>
                            </div>
                            <button className="button" type="submit">Enviar</button>
                            {error && <p className="error">{error}</p>}
                        </form>
                    </div>
                </div>

            </section>
            <Footer />
        </>

    )
}