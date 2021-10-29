import { Title } from '../components/Title';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AccountMenu } from '../components/AccountMenu';
import { SellerMenu } from '../components/SellerMenu';
import { SectionTitle } from '../components/SectionTitle';
import { UserGreeting } from '../components/UserGreeting';
import { user_logged } from '../scripts/crud-user';
import { Button } from '../components/Button';
import '../styles/global.scss';
import '../styles/reset.css';
import '../styles/userProfile.scss';


export function UserProfile() {
    return (
        <>
            <Navbar isLogged={true} />
            <div className="page-container">
                <UserGreeting username={user_logged.nameUser} isSeller={false} />
            </div>

            <div className="line-up">
                <Title title="Seu perfil" />
            </div>
            <div className="page-container">
                <div className="container-menu-and-profile">
                    <div className="section-menus align-column">
                        <AccountMenu isSeller={false} />
                        <SellerMenu isSeller={false} />
                    </div>

                    <div className="section-profile">
                        <div className="container-profile">
                            <SectionTitle text="Dados pessoais" />
                            <div className="container-profile-data">
                                <form action="" method="PUT">
                                    <div class="container-input">
                                        <label for="name">Nome</label>
                                        <div>
                                            <i class="fas fa-user line-up icon-left-input"></i>
                                            <input class="input-default no-alter" disabled type="text" placeholder="" name="" id="name" />
                                            <i class="fas fa-lock line-up lock"></i>
                                        </div>
                                        <p>Dado não alterável</p>
                                    </div>
                                    <div class="container-input">
                                        <label for="sobreNome">Sobrenome</label>
                                        <div>
                                            <i class="fas fa-user line-up icon-left-input"></i>
                                            <input class="input-default no-alter" disabled type="text" placeholder="" name="" id="sobreNome" />
                                            <i class="fas fa-lock line-up lock"></i>
                                        </div>
                                        <p>Dado não alterável</p>
                                    </div>
                                    <div class="container-input">
                                        <label for="cpf">CPF</label>
                                        <div>
                                            <i class="far fa-id-card line-up icon-left-input"></i>
                                            <input class="input-default no-alter" disabled type="text" placeholder="" name="" id="cpf" />
                                            <i class="fas fa-lock line-up lock"></i>
                                        </div>
                                        <p>Dado não alterável</p>
                                    </div>
                                    <div class="container-input">
                                        <label for="email">E-mail</label>
                                        <div>
                                            <i class="far fa-envelope line-up icon-left-radius"></i>
                                            <input class="input-default " type="text" placeholder="" name="" id="email" />
                                            <i class="fas fa-lock line-up lock"></i>
                                        </div>
                                    </div>
                                    <div className="button-form-profile">
                                    <Button text="Atualizar" />
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