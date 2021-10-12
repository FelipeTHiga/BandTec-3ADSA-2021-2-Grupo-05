import '../styles/footer.scss';
import logo from '../assets/images/logo.png';

export function Footer() {
    return(
        <>
        <section className="container-footer line-up">
                <div className="container-info-footer">
                    <div className="container-line-great-footer line-up">
                        <div className="line-great-footer line-up"></div>
                    </div>

                    <div className="container-info-footer-2">
                        <div className="container-logo-footer">
                            <div className="container-title-footer">
                                <img src={logo} alt="Logo Vegan House" />
                                <h3>O lar do produtor vegano.</h3>
                            </div>
                        </div>

                        <div className="container-menu-footer">

                            <ul>
                                <li>A Vegan House</li>
                                <li>Quem somos</li>
                                <li>Acesso lojistas</li>
                                <li>Seja nosso lojista</li>
                            </ul>

                            <ul>
                                <li>Redes Sociais</li>
                                <li>
                                    <i className="fab fa-instagram-square"></i> Instagram
                                </li>
                                <li>
                                    <i className="fab fa-facebook-square"></i> Facebook
                                </li>
                                <li>
                                    <i className="fab fa-whatsapp-square"></i> Whatsapp
                                </li>
                            </ul>

                            <ul>
                                <li>Atendimento</li>
                                <li>
                                    <i className="fas fa-phone-square-alt"></i> 0800 579 0000
                                </li>
                                <li>
                                    sac@veganhouse.com
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
            </section>
            </>
    )
}