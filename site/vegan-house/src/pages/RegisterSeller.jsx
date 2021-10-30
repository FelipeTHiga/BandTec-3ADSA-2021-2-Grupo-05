import { Title } from '../components/Title';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Submenu } from '../components/Submenu';
import { Button } from '../components/Button';
import '../styles/registerSeller.scss';
import '../styles/global.scss';
import { getUser } from '../services/crud-user';



export function RegisterSeller() {
    return (
        <>
            <Navbar isLogged={getUser} />
            <Submenu />
            <section className="register">
                <div className="container-register">
                    <Title title="Cadastro" />

                    <div className="register-content-seller">
                        <h2>Dados comerciais</h2>
                        <form>
                            <div className="name-seller">
                                <label>Nome comercial</label>
                                <div className="name-content">
                                    <i className="fas fa-user"></i>
                                    <input type="text" placeholder="Ex. Doces do João" />
                                    <p>*</p>
                                </div>
                            </div>

                            <div className="cnpj-seller">
                                <label>CNPJ</label>
                                <div className="cnpj-content">
                                    <i className="fas fa-id-card"></i>
                                    <input type="text" placeholder="Ex. 11222333444455" />
                                    <p>*</p>
                                </div>
                                <label className="instructions">Digite apenas números</label>
                            </div>

                            <div className="email-seller">
                                <label>E-mail comercial</label>
                                <div className="email-content">
                                    <i className="far fa-envelope"></i>
                                    <input type="email" placeholder="Ex. DocesJ@email.com" />
                                    <p>*</p>
                                </div>
                            </div>
                            <div class="term-area">
                                <input type="checkbox" />
                                <p class="phrase">Li e concordo com os <a class="term" href="">termos do regulamento</a>.</p>
                            </div>
                            <Button text="Enviar" />
                        </form>
                    </div>
                </div>

            </section>
            <Footer />
        </>


    )
}