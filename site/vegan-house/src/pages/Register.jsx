import { Title } from '../components/Title';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Submenu } from '../components/Submenu';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Loading from '../assets/images/loading.gif'
import InputMask from 'react-input-mask';
import api from '../services/api';
import { Link } from 'react-router-dom';

import '../styles/register.scss';
import '../styles/global.scss';

export function Register() {

    function showPassword() {
        var typeInput = document.getElementById("password");

        if (typeInput.type === "password") {
            typeInput.type = "text"
            setIcon(faEyeSlash)
        } else {
            typeInput.type = "password"
            setIcon(faEye)
        }
    }
    function showPasswordConfirm() {
        var typeInputConfirm = document.getElementById("password-confirm");

        if (typeInputConfirm.type === "password") {
            typeInputConfirm.type = "text"
            setIcon2(faEyeSlash)
        } else {
            typeInputConfirm.type = "password"
            setIcon2(faEye)
        }
    }

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
    const [errorPasswordConfirm, setErrorPasswordConfirm] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [icon, setIcon] = useState(faEye)
    const [icon2, setIcon2] = useState(faEye)

    function warmings(errors) {

        if (errors.cpf) {
            setErrorCpf(errors.cpf)
        }
        // if(errors.passwordUser) {
        //     setErrorPassword(errors.passwordUser)
        // }
        if (errors.surName) {
            setErrorSurName(errors.surName)
        }
        if (errors.nameUser) {
            setErrorName(errors.nameUser)
        }
        if (errors.email) {
            setErrorEmail(errors.email)
        }
        if (cpf.length === 0) {
            setErrorCpf("Erro no cadastro preencha todos os campos obrigatorios (*)")
        }

        // if ((passwordUser != passwordUserConfirm)) {
        //     setErrorPasswordConfirm("As senhas informadas não coincidem!")
        // } else if (passwordUser.length === 0) {
        //     setErrorPassword("Erro no cadastro preencha todos os campos obrigatorios (*)")
        // } else if (passwordUser.length < 6 || passwordUser.length > 20) {
        //     setErrorPassword("A senha deve ter entre 6 e 20 caracteres")
        // }


    }

    function singin(e) {

        e.preventDefault();

        setErrorName("");
        setErrorSurName("");
        setErrorCpf("");
        setErrorEmail("");
        setErrorPassword("");
        setErrorPasswordConfirm("");

		if (passwordUser.length === 0) {
            setErrorPassword("Erro no cadastro preencha todos os campos obrigatorios (*)")
        } else if (passwordUser.length < 6 || passwordUser.length > 20) {
            setErrorPassword("A senha deve ter entre 6 e 20 caracteres")
        } else if ((passwordUser != passwordUserConfirm) ) {
            setErrorPasswordConfirm("As senhas informadas não coincidem!")
        } else {
        setLoading(true);
        api.post(`/users`, {
            nameUser: nameUser,
            surName: surName,
            cpf: cpf.replace(/\D/g, ''),
            email: email,
            passwordUser: passwordUser
        })
            .then((res) => {
                setLoading(false);
                if (res.status === 201) {

                    sessionStorage.setItem("sucess", "Seu cadastro foi realizado com sucesso!")
                    history.push(`/login`);
                } else {
                    warmings(res.data);
                }
                console.log(res.status);
            }).catch((err) => {
                setLoading(false);
                console.log(err.response)
                var errC = err.response.data;
                if (errC != undefined) {
                    warmings(err.response.data);

                }

            })}
                
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
                                    <input value={nameUser} id="name" onChange={e => setNameUser(e.target.value.replace(/[^a-zA-Z áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]/g, ""))} type="text" placeholder="Ex. João" />
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
                                    <button id="btn-show-password" type="button" onClick={showPassword}>
                                        <FontAwesomeIcon className="passwordVisible" icon={icon} />
                                    </button>

                                    <p>*</p>
                                </div>
                                <label className="instructions">Use de 6 a 20 caracteres</label>
                                {errorPassword && <p className="error">{errorPassword}</p>}
                            </div>

                            <div className="password">
                                <label>Confirme a senha</label>
                                <div className="password-content">
                                    <i className="fas fa-lock"></i>
                                    <input id="password-confirm" onChange={e => setPasswordUserConfirm(e.target.value)} type="password" />
                                    <button id="btn-show-password" type="button" onClick={showPasswordConfirm}>
                                        <FontAwesomeIcon className="passwordVisible" icon={icon2} />
                                    </button>
                                    <p>*</p>
                                </div>
                                {errorPasswordConfirm && <p className="error">{errorPasswordConfirm}</p>}
                            </div>

                            <div>
                                <span>Já tem uma conta? </span>
                                <Link to="/login"><span className="linkToRegister">Logar.</span></Link>
                            </div>

                            <button type="submit" className="btn-submit-register">Enviar</button>
                            {loading && <img className="loading-gif" src={Loading} alt="loading..." />}

                        </form>
                    </div>
                </div>

            </section>
            <Footer />
        </>
    )
}
