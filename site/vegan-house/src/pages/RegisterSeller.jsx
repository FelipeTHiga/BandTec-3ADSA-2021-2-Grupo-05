import { Title } from '../components/Title';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Submenu } from '../components/Submenu';
import '../styles/registerSeller.scss';
import '../styles/global.scss';
import  serviceSeller  from '../services/crud-seller';
import InputMask from 'react-input-mask'

export function RegisterSeller() {
    return (
        <>
            <Navbar />
            <Submenu />
            <section className="register">
                <div className="container-register">
                    <Title title="Cadastro" />

                    <div className="register-content-seller">
                        <h2>Dados comerciais</h2>
                        <form>
                            <div className="name-seller">
                                <label for="name">Nome comercial</label>
                                <div className="name-content-seller">
                                    <i className="fas fa-user"></i>
                                    <input id="name" type="text" placeholder="Ex. Doces do João" />
                                    <p>*</p>
                                </div>
                            </div>

                            <div className="cnpj-seller">
                                <label for="cnpj">CNPJ</label>
                                <div className="cnpj-content-seller">
                                    <i className="fas fa-id-card"></i>
                                    <InputMask mask="99.999.999/9999-99" id="cnpj" type="text" placeholder="Ex. 11.222.333/4444-55" />
                                    <p>*</p>
                                </div>
                                <label className="instructions">Digite apenas números</label>
                            </div>

                            <div className="email-seller">
                                <label for="email">E-mail comercial</label>
                                <div className="email-content-seller">
                                    <i className="far fa-envelope"></i>
                                    <input id="email" type="email" placeholder="Ex. DocesJ@email.com" />
                                    <p>*</p>
                                </div>
                            </div>
                            <div class="term-area">
                                <input type="checkbox" />
                                <p class="phrase">Li e concordo com os <a class="term" href="">termos do regulamento</a>.</p>
                            </div>
                            <span onClick={serviceSeller.submitSeller}>Enviar</span>
                            {/* <Button onClick={submitSeller}  text="Enviar" /> */}
                        </form>
                    </div>
                </div>

            </section>
            <Footer />
        </>


    )
}