import { Title } from '../components/Title';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Submenu } from '../components/Submenu';
import { Button } from '../components/Button';
import '../styles/register.scss';
import '../styles/global.scss';



export function Register() {
    return (
        <>
            <Navbar isLogged={false} />
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
                                    <input type="text" placeholder="Ex. João" />
                                    <p>*</p>
                                </div>
                            </div>

                            <div className="last-name">
                                <label>Sobrenome</label>
                                <div className="last-name-content">
                                    <i className="fas fa-user"></i>
                                    <input type="text" placeholder="Ex. Silva" />
                                    <p>*</p>
                                </div>
                            </div>

                            <div className="cpf">
                                <label>CPF</label>
                                <div className="cpf-content">
                                    <i className="fas fa-id-card"></i>
                                    <input type="text" placeholder="Ex. 11122233344" />
                                    <p>*</p>
                                </div>
                                <label className="instructions">Digite apenas números</label>
                            </div>

                            <div className="email">
                                <label>E-mail</label>
                                <div className="email-content">
                                    <i className="far fa-envelope"></i>
                                    <input type="email" placeholder="Ex. joao.silva@email.com" />
                                    <p>*</p>
                                </div>
                            </div>

                            <div className="password">
                                <label>Senha</label>
                                <div className="password-content">
                                    <i className="fas fa-lock"></i>
                                    <input type="password" />
                                    <p>*</p>
                                </div>
                                <label className="instructions">Use de 6 a 20 caracteres</label>
                            </div>

                            <div className="password">
                                <label>Confirme a senha</label>
                                <div className="password-content">
                                    <i className="fas fa-lock"></i>
                                    <input type="password" />
                                    <p>*</p>
                                </div>
                            </div>
                            <Button text="Enviar"/>
                        </form>
                    </div>
                </div>

            </section>
            <Footer />
        </>


    )
}