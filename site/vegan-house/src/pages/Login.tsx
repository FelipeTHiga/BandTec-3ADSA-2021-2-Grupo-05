import { Title } from '../components/Title';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Submenu } from '../components/Submenu';
import '../styles/login.scss';
import '../styles/global.scss';


export function Login() {
    return (
        <>
            <Navbar isLogged={false} />
            <Submenu />
            <section className="login-section">
                <div className="container-login">
                    <Title title="Login" />


                    <div className="login-content">
                        <h2>Olá, digite o seu e-mail e a <br /> senha utilizados no cadastro</h2>
                        <form>
                            <div className="email">
                                <label>E-mail</label>
                                <div className="email-content">
                                    <i className="far fa-envelope"></i>
                                    <input type="email" placeholder="Ex. joao.silva@email.com" />
                                </div>
                            </div>

                            <div className="password">
                                <label>Senha</label>
                                <div className="password-content">
                                    <i className="fas fa-lock"></i>
                                    <input type="password" />
                                </div>
                            </div>

                            <button>Enviar</button>
                        </form>
                    </div>
                </div>
            </section>
            <Footer />
        </>


    )
}