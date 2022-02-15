import { useState } from "react";
import { useHistory } from "react-router";
import api from "../services/api";
import loginService from "../services/login";
import Loading from '../assets/images/loading.gif'


export function FormLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [erro, setErro] = useState("");
    const [sucess, setSucess] = useState(sessionStorage.getItem("sucess"));
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    function login(e) {
        
        e.preventDefault();
        if(!email && !password) {
            setErro("Os campos email e senha não estão preechidos!");
            sessionStorage.setItem("sucess", "");
            setSucess(null);
        } else if(!email) {
            setErro("O email não está preechido");
            sessionStorage.setItem("sucess", "");
            setSucess(null);
        } else if(!password) {
            setErro("A senha não está preenchida");
            sessionStorage.setItem("sucess", "");
            setSucess(null);
        } else {
            setLoading(true);
            api.post(`/session/login`, {
                email: email,
                passwordUser: password 
            })
                .then((res) => {
                    setLoading(false);
                    if (res.status === 200) {
                        sessionStorage.setItem("sucess", "");
                        loginService.setSession(res.data)
                        setSucess(null)
                        history.push("");
                    } else {
                        setErro("A senha ou o email estão incorretos!");
                        sessionStorage.setItem("sucess", "");
                        setSucess(null);
                    }
                }).catch((res) => {
                    setLoading(false);
                    sessionStorage.setItem("sucess", "");
                    setErro("Ocorreu um erro ao tentar realizar login!");
                    setSucess(null);
                })
        }
    }
        return (
            <div className="login-content">
                <h2>Olá, digite o seu e-mail e a <br /> senha utilizados no cadastro</h2>
                {sucess && <p className="sucess">{sucess}</p>}
                <form onSubmit={login}>
                    <div className="email">
                        <label>E-mail</label>
                        <div className="email-content">
                            <i className="far fa-envelope"></i>
                            <input
                                type="email"
                                placeholder="Endereço de e-mail"
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Ex. joao.silva@email.com"
                            />
                        </div>
                    </div>
                    <div className="password">
                        <label>Senha</label>
                        <div className="password-content">
                            <i className="fas fa-lock"></i>
                            <input
                                type="password"
                                placeholder="Senha"
                                onChange={e => setPassword( e.target.value)}
                            />
                        </div>

                    </div>

                    <button type="submit">Entrar</button>
                    {erro && <p className="error">{erro}</p>}
                    {loading && <img className="loading-gif" src={Loading} alt="loading..." />}
                    <hr />
                </form>
            </div>
        );
    }

