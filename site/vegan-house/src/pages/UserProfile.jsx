import { Title } from '../components/Title';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AccountMenu } from '../components/AccountMenu';
import { SellerMenu } from '../components/SellerMenu';
import { SectionTitle } from '../components/SectionTitle';
import { UserGreeting } from '../components/UserGreeting';
import ModalMessage from '../components/ModalMessage';
import { useState } from 'react';
import api from '../scripts/api';
import Loading from '../assets/images/loading.gif'

import loginService from '../services/login'

import '../styles/global.scss';
import '../styles/reset.scss';
import '../styles/userProfile.scss';

export function UserProfile(e) {

    let user = loginService.getSession();
    const [emailError, setEmailError] = useState("");
    const [loading, setLoading] = useState(false);

    const [isModalMessageVisible, setIsModalMessageVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalTitle, setModalTitle] = useState("");

    function updateUser(e) {
        e.preventDefault();
        setEmailError("");
        let userUpdate = loginService.getSession();
        let email;
        if (document.getElementById("emailUserUpdate").value == "" || document.getElementById("emailUserUpdate").value == " ") {
            email = userUpdate.email;
        } else {
            email = document.getElementById("emailUserUpdate").value;
        }
        const user = {
            id: userUpdate.id,
            nameUser: userUpdate.nameUser,
            surName: userUpdate.surName,
            cpf: userUpdate.cpf,
            email: email,
            passwordUser: userUpdate.passwordUser
        }
        setLoading(true);
        api({
            method: 'put',
            url: '/users',
            params: {
                idUser: userUpdate.id
            },
            data: user,
        })
            .then(function (response) {
                setLoading(false);
                if (response.status === 200) {
                    loginService.setSession(response.data);
                    setModalTitle("Atualização de dados");
                    setModalMessage("Dados do perfil atualizados com sucesso!");
                } else {
                    setModalTitle("Atualização de dados");
                    setModalMessage("Ocorreu um erro ao tentar atualizar os dados do perfil.");
                }
                window.location.href = '#top';
                setIsModalMessageVisible(true);
            }).catch((err) => {
                setLoading(false);
                setEmailError("Insira um email válido.");
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
                                <form onSubmit={updateUser}>
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
                                            <input id="emailUserUpdate" placeholder={user.email} className="input-default " type="text" name="" />
                                            <i className="fas fa-lock line-up lock"></i>
                                        </div>
                                        {emailError && <p className='error'>{emailError}</p>}
                                    </div>
                                    <div className="button-form-profile">
                                    <button type='submit'>Atualizar</button>
                                    {loading && <img className="loading-gif" src={Loading} alt="loading..." />}
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {
                isModalMessageVisible ?
                    <ModalMessage
                        onClose={() => setIsModalMessageVisible(false)}
                        height={document.body.scrollHeight}
                        title={modalTitle}
                        message={modalMessage}
                        function={() => setIsModalMessageVisible(false)}
                    />
                    : null
            }
            <Footer />
        </>
    )
}