import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import api from "../scripts/api";


class SignIn extends Component {
    state = {
        email: "",
        passwordUser: "",
        error: "",
        sucess: "",
        link: "/login"
    };

    handleSignIn = async e => {
        e.preventDefault();
        const { email, passwordUser } = this.state;
        if (!email || !passwordUser) {
            this.setState({ error: "Preencha e-mail e senha para continuar." });
        } else {
            try {
                const response = await api.post("/session/login", { email, passwordUser });
                // this.props.history.push("/home");
                this.setState({ sucess: "Login feito com sucesso." , link: "/products"});
                
            } catch (err) {
                this.setState({
                    error:
                        "Sua senha ou email estão incorretos."
                });
            }
        }
    };

    render() {
        return (
            <div className="login-content">
                <h2>Olá, digite o seu e-mail e a <br /> senha utilizados no cadastro</h2>
                <form onSubmit={this.handleSignIn}>
                    <div className="email">
                        <label>E-mail</label>
                        <div className="email-content">
                            <i className="far fa-envelope"></i>
                            <input
                                type="email"
                                placeholder="Endereço de e-mail"
                                onChange={e => this.setState({ email: e.target.value })}
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
                                onChange={e => this.setState({ passwordUser: e.target.value })}
                            />
                        </div>
                        <label><u>Esqueceu sua senha?</u></label>
                        
                        <button type="submit">Entrar</button>
                        
                    </div>
                    {this.state.error && <p className="error">{this.state.error}</p>}
                    {this.state.sucess && <p className="sucess">{this.state.sucess}</p>}
                    <hr />
                </form>
            </div>
        );
    }
}

export function FormLogin() {
    return (
        new SignIn()
    )
}

