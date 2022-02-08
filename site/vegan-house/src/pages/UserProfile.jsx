import { Title } from '../components/Title';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AccountMenu } from '../components/AccountMenu';
import { SellerMenu } from '../components/SellerMenu';
import { SectionTitle } from '../components/SectionTitle';
import { UserGreeting } from '../components/UserGreeting';
import { useState } from 'react';
import loginService from '../services/login'
import api from '../services/api';
import '../styles/global.scss';
import '../styles/reset.css';
import '../styles/userProfile.scss';


export function UserProfile() {
    let user = loginService.getSession();
    const [email, setEmail] = useState(user.email);
    const [error, setError] = useState("");
    const [status, setStatus] = useState("");
    var isEmail = false;

    function updateUser(e) {
        e.preventDefault();

        setError("");
        setStatus("");



        if (email.length === 0) {
            setError("Erro no cadastro preencha todos os campos obrigatorios (*)")
        }

        for(var i = 0; i < email.length; i++) {
            if(email[i] === "@") {
               isEmail = true;
            }
        }

        if(!isEmail) {
            setError("Digite um email válido")
        }

        const userUpdate = {
            id: user.id,
            nameUser: user.nameUser,
            surName: user.surName,
            cpf: user.cpf,
            email: document.getElementById("emailUserUpdate").value,
            passwordUser: user.passwordUser
        }

        api({
            method: 'put',
            url: '/users',
            params: {
                idUser: user.id
            },
            data: userUpdate,
        })
            .then((res) => {
                if (res.status === 200) {
                    loginService.setSession(res.data)
                    setStatus("Email atualizado com sucesso")
                }
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
                <div className="container-menu-and-profile">
                    <div className="section-menus align-column">
                        <AccountMenu isSeller={user.isSeller} />
                        <SellerMenu isSeller={user.isSeller} />
                    </div>

                    <div className="section-profile">
                        <div className="container-profile">
                            <SectionTitle text="Dados pessoais" />
                            <div className="container-profile-data">
                                <form>
                                    <div className="container-input">
                                        <label for="name">Nome</label>
                                        <div>
                                            <i className="fas fa-user line-up icon-left-input"></i>
                                            <input value={user.nameUser} className="input-default no-alter" disabled type="text" placeholder="" name="" id="name" />
                                            <i className="fas fa-lock line-up lock"></i>
                                        </div>
                                        <p>Dado não alterável</p>
                                    </div>
                                    <div className="container-input">
                                        <label for="sobreNome">Sobrenome</label>
                                        <div>
                                            <i className="fas fa-user line-up icon-left-input"></i>
                                            <input value={user.surName} className="input-default no-alter" disabled type="text" placeholder="" name="" id="sobreNome" />
                                            <i className="fas fa-lock line-up lock"></i>
                                        </div>
                                        <p>Dado não alterável</p>
                                    </div>
                                    <div className="container-input">
                                        <label for="cpf">CPF</label>
                                        <div>
                                            <i className="far fa-id-card line-up icon-left-input"></i>
                                            <input value={user.cpf} className="input-default no-alter" disabled type="text" placeholder="" name="" id="cpf" />
                                            <i className="fas fa-lock line-up lock"></i>
                                        </div>
                                        <p>Dado não alterável</p>
                                    </div>
                                    <div className="container-input">
                                        <label for="email">E-mail</label>
                                        <div>
                                            <i className="far fa-envelope line-up icon-left-radius"></i>
                                            <input
                                                type="email"
                                                value={email}
                                                className="input-default"
                                                id="emailUserUpdate"
                                                onChange={e => setEmail(e.target.value)}

                                            />
                                            <i className="fas fa-lock line-up lock"></i>
                                        </div>
                                        {error && <p className="error err-userP p-name">{error}</p>}
                                        {status && <p className="sucess">{status}</p>}
                                    </div>
                                    <div className="button-form-profile">
                                        <button onClick={updateUser}>Atualizar</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}