import { Link } from 'react-router-dom';
import '../styles/navbar.scss'
import logo from '../assets/images/logo.png';
interface NavbarProps {
    isLogged: boolean;
}

export function Navbar({ isLogged }: NavbarProps) {
    return (
        <header className="header">
            <div className="container-header">
                <div className="title-site line-up"><img src={logo} alt="Logo Vegan House" /></div>

                <section className="container-search-bar line-up">
                    <input placeholder="Busque seus produtos aqui" type="text" />
                    <div className="container-search-icon">
                        <button><i className="fas fa-search"></i></button>

                    </div>
                </section>

                <section className="nav-bar">
                    <ul className="line-up">
                        {isLogged ? (
                            <>
                                <li>
                                    <i className="fas fa-user-plus"></i>
                                    <Link to="/cadastro">Cadastro</Link>
                                </li>
                                <li>
                                    <i className="fas fa-sign-in-alt"></i>
                                    <Link to="/login">Entrar</Link>
                                </li>
                                <li>
                                    <i className="fas fa-shopping-cart"></i>
                                    <a href="#"> Carrinho</a>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <i className="fas fa-user-plus"></i>
                                    <Link to="/cadastro">Cadastro</Link>
                                </li>
                                <li>
                                    <i className="fas fa-sign-in-alt"></i>
                                    <Link to="/login">Entrar</Link>
                                </li>
                                <li>
                                    <i className="fas fa-shopping-cart"></i>
                                    <a href="#"> Carrinho</a>
                                </li>
                            </>
                        )}
                    </ul>
                </section>
            </div>
        </header>
    );
}