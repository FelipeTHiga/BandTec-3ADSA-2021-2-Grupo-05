import { Title } from '../components/Title';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Submenu } from '../components/Submenu';
import { useState } from 'react';
import { useHistory } from 'react-router';

import InputMask from 'react-input-mask';
import api from '../services/api';

import '../styles/register.scss';
import '../styles/global.scss';

export function Register() {
    const [nameUser, setNameUser] = useState("");
    const [surName, setSurName] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [passwordUser, setPasswordUser] = useState("");
    const [passwordUserConfirm, setPasswordUserConfirm] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();

    function singin(e) {
        e.preventDefault();
        if (passwordUser.length < 6 || passwordUser.length > 20) {
            setError("A senha possui um número de caracteres inválido!")
        } else if ((passwordUser != passwordUserConfirm)) {
            setError("As senhas informadas não coincidem!")
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
                        sessionStorage.setItem("sucess", "Seu cadastro foi realizado com sucesso!")
                        history.push(`/login`);
                    } else {
                        setError("Ocorreu um erro no cadastro - " + res.statusText);
                    }
                }).catch((err) => {
                    setError("Ocorreu um ao tentar realizar o cadastro!")
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
                        <form onSubmit={singin}>
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
                            <button type="submit">Enviar</button>
                            {error && <p className="error">{error}</p>}
                        </form>
                    </div>
                </div>

            </section>
            <Footer />
        </>
    )
}