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
    const [error, setError] = useState([]);
    const [errorName, setErrorName] = useState("");
    const [errorSurName, setErrorSurName] = useState("");
    const [errorCpf, setErrorCpf] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const history = useHistory();
    const [user, setUser] = useState({});

    
    function warmings(errors) {
        console.log(errors)
        for(var i = 0; i < errors.length; i++) {
           if(errors[i].field == 'passwordUser') {
                setErrorPassword(errors[i].defaultMessage)
            } else if(errors[i].field == 'cpf') {
                setErrorCpf(errors[i].defaultMessage)
            } else if(errors[i].field == 'surName') {
                setErrorSurName(errors[i].defaultMessage)
            } else if(errors[i].field == 'nameUser') {
                setErrorName(errors[i].defaultMessage)
            } else if(errors[i] == 'email') {
                setErrorEmail(errors[i].defaultMessage)
            }
        }

    }

    function singin(e) {
        e.preventDefault();
        setErrorName("");
        setErrorSurName("");
        setErrorCpf("");
        setErrorEmail("");
        setErrorPassword("");

        if (passwordUser != passwordUserConfirm) {
            setError("As senhas informadas não conhecidem!")
        } else {
            api.post(`/users`, {
                nameUser: nameUser,
                surName: surName,
                cpf: cpf.replace(/\D/g, ''),
                email: email,
                passwordUser: passwordUser
            })
                .then((res) => {
                    if (res.status === 201) {
                        console.log("Cadastro realizado - " + res.statusText);
                        history.push(`/login`);
                    } else {
                        warmings(res.data.errors);
                    }
                    console.log(res.status);
                }).catch((err) => {
                    var errorC = [];
                    err.response.data.errors.forEach(erro => errorC.push(erro.defaultMessage))
                    warmings(err.response.data.errors);
                })
        }

    }

    return (
        <>
            <Navbar />
            <Submenu />
            <section className="register-user">
                <div className="container-register">
                    <Title title="Cadastro" />

                    <div className="register-content">
                        <h2>Dados de Usuário</h2>
                        <form onSubmit={singin}>
                            <div className="name">
                                <label>Nome</label>
                                <div className="name-content">
                                    <i className="fas fa-user"></i>
                                    <input value={nameUser}  id="name" onChange={e => setNameUser(e.target.value.replace(/[^a-zA-Z áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]/g, ""))} type="text" placeholder="Ex. João" />
                                    <p>*</p>
                                </div>
                                {errorName && <p className="error">{errorName}</p>}
                            </div>

                            <div className="last-name">
                                <label>Sobrenome</label>
                                <div className="last-name-content">
                                    <i className="fas fa-user"></i>
                                    <input value={surName} id="surname" onChange={e => setSurName(e.target.value.replace(/[^a-zA-Z áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]/g, ""))} type="text" placeholder="Ex. Silva" />
                                    <p>*</p>
                                </div>
                               {errorSurName && <p className="error">{errorSurName}</p>}
                            </div>

                            <div className="cpf">
                                <label>CPF</label>
                                <div className="cpf-content">
                                    <i className="fas fa-id-card"></i>

                                    <InputMask mask="999.999.999-99" id="cpf" type="text" onChange={e => setCpf(e.target.value)} placeholder="Ex. 111.222.333-44" />

                                    <p>*</p>
                                </div>
                                <label className="instructions">Digite apenas números</label>
                                {errorCpf && <p className="error">{errorCpf}</p>}
                            </div>

                            <div className="email">
                                <label>E-mail</label>
                                <div className="email-content">
                                    <i className="far fa-envelope"></i>
                                    <input id="email" onChange={e => setEmail(e.target.value)} type="email" placeholder="Ex. joao.silva@email.com" />
                                    <p>*</p>
                                </div>
                                {errorEmail && <p className="error">{errorEmail}</p>}
                            </div>

                            <div className="password">
                                <label>Senha</label>
                                <div className="password-content">
                                    <i className="fas fa-lock"></i>
                                    <input id="password" onChange={e => setPasswordUser(e.target.value)} type="password" />
                                    <p>*</p>
                                </div>
                                <label className="instructions">Use de 6 a 20 caracteres</label>
                                {errorPassword && <p className="error">{errorPassword}</p>}
                            </div>

                            <div className="password">
                                <label>Confirme a senha</label>
                                <div className="password-content">
                                    <i className="fas fa-lock"></i>
                                    <input onChange={e => setPasswordUserConfirm(e.target.value)} type="password" />
                                    <p>*</p>
                                </div>
                            </div>

                            <button type="submit" >Enviar</button>

                            {/* <Button path="/home" text="Enviar" type="submit"/> */}
                        </form>
                    </div>
                </div>

            </section>
            <Footer />
        </>


    )
}