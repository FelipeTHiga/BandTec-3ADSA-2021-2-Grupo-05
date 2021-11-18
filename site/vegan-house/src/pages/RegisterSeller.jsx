import { Title } from '../components/Title';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Submenu } from '../components/Submenu';
import { Button } from '../components/Button';
import '../styles/registerSeller.scss';
import '../styles/global.scss';
import { getUser } from '../services/crud-user';
import  serviceSeller  from '../services/crud-seller';
import React, { Component, useState, useEffect } from "react";
import { useHistory } from "react-router";
import api from '../services/api';



export function RegisterSeller() {
    const [commercialName, setCommercialName] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [commercialEmail, setCommercialEmail] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();

    function registerSeller(e) {
        e.preventDefault();
        api.post(`/sellers`,{
            commercialName: commercialName,
            cnpj: cnpj,
            commercialEmail: commercialEmail,
        })
        .then((res) => {
            if (res.status === 201) {
                console.log("Cadastro realizado - " + res.statusText);
                let parseDados = JSON.stringify(res.data);
                sessionStorage.setItem("user", parseDados);
                history.push(`/login`);
            } else {
                setError("Ocorreu um erro no cadastro!" + res.statusText);
            }
            console.log(res.status);
        }).catch((err) => {
            console.log(err);
            setError("Ocorreu um erro no cadastro!")
        })
    }
    return (
        <>
            <Navbar isLogged={getUser} />
            <Submenu />
            <section className="register">
                <div className="container-register">
                    <Title title="Cadastro" />

                    <div className="register-content-seller">
                        <h2>Dados comerciais</h2>
                        <form>
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
                                    <input id="cnpj" onChange={e => setCnpj(e.target.value)} type="text" placeholder="Ex. 11222333444455" />
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
                                <input type="checkbox" />
                                <p class="phrase">Li e concordo com os <a class="term" href="">termos do regulamento</a>.</p>
                            </div>
                            <button type={registerSeller}>Enviar</button>
                            {error && <p className="sucess">{error}</p>}
                            {/* <span onClick={serviceSeller.submitSeller}>Enviar</span> */}
                            {/* <Button onClick={submitSeller}  text="Enviar" /> */}
                        </form>
                    </div>
                </div>

            </section>
            <Footer />
        </>


    )
}