import { Title } from '../components/Title';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Submenu } from '../components/Submenu';
import { Button } from '../components/Button';
import '../styles/register.scss';
import '../styles/global.scss';
import { getUser, submit } from '../services/crud-user';
import InputMask from 'react-input-mask'
import React, { Component, useState, useEffect } from "react";
import { useHistory } from "react-router";
import api from '../services/api';

export function Register() {
    const [nameUser, setNameUser] = useState("");
    const [surName, setSurName] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [passwordUser, setPasswordUser] = useState("");
    const [passwordUserConfirm, setPasswordUserConfirm] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();
    const [user, setUser] = useState({});

    function singin(e) {
        e.preventDefault();
        if (passwordUser != passwordUserConfirm) {
            setError("As senhas informadas não conhecidem!")
        } else {
            api.post(`/users`, {
                nameUser: nameUser,
                surName: surName,
                cpf: cpf,
                email: email,
                passwordUser: passwordUser
            })
            .then((res) => {
                if (res.status === 201) {
                    console.log("Cadastro realizado - " + res.statusText);
                    history.push(`/login`);
                } else {
                    setError("Ocorreu um erro no cadastro - " + res.statusText);
                }
                console.log(res.status);
            }).catch((err) => {
                console.log(err);
                setError("Ocorreu um erro no cadastro - " + err)
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

                    <div className="register-content">
                        <h2>Dados de Usuário</h2>
                        <form>
                            <div className="name">
                                <label>Nome</label>
                                <div className="name-content">
                                    <i className="fas fa-user"></i>
                                    <input id="name" onChange={e => setNameUser(e.target.value)} type="text" placeholder="Ex. João" />
                                    <p>*</p>
                                </div>
                            </div>

                            <div className="last-name">
                                <label>Sobrenome</label>
                                <div className="last-name-content">
                                    <i className="fas fa-user"></i>
                                    <input id="surname" onChange={e => setSurName(e.target.value)} type="text" placeholder="Ex. Silva" />
                                    <p>*</p>
                                </div>
                            </div>

                            <div className="cpf">
                                <label>CPF</label>
                                <div className="cpf-content">
                                    <i className="fas fa-id-card"></i>

                                    <InputMask mask="999.999.999-99" id="cpf" type="text" onChange={e => setCpf(e.target.value)} placeholder="Ex. 111.222.333-44" />

                                    <p>*</p>
                                </div>
                                <label className="instructions">Digite apenas números</label>
                            </div>

                            <div className="email">
                                <label>E-mail</label>
                                <div className="email-content">
                                    <i className="far fa-envelope"></i>
                                    <input id="email" onChange={e => setEmail(e.target.value)} type="email" placeholder="Ex. joao.silva@email.com" />
                                    <p>*</p>
                                </div>
                            </div>

                            <div className="password">
                                <label>Senha</label>
                                <div className="password-content">
                                    <i className="fas fa-lock"></i>
                                    <input id="password" onChange={e => setPasswordUser(e.target.value)} type="password" />
                                    <p>*</p>
                                </div>
                                <label className="instructions">Use de 6 a 20 caracteres</label>
                            </div>

                            <div className="password">
                                <label>Confirme a senha</label>
                                <div className="password-content">
                                    <i className="fas fa-lock"></i>
                                    <input onChange={e => setPasswordUserConfirm(e.target.value)} type="password" />
                                    <p>*</p>
                                </div>
                            </div>
                            <button onClick={submit}>Enviar</button>
                            {/* <Button path="/home" text="Enviar" type="submit"/> */}
                        </form>
                    </div>
                </div>

            </section>
            <Footer />
        </>


    )
}