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
                <div className="title-site line-up">
                    <Link to="/home">
                        <img src={logo} alt="Logo Vegan House" />
                    </Link>
                </div>

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
                                    <Link to="/cadastro"><i className="fas fa-user-plus"></i></Link>
                                    <Link to="/cadastro">Cadastro</Link>
                                </li>
                                <li>
                                    <Link to="/login"><i className="fas fa-sign-in-alt"></i></Link>
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
                                    <Link to="/cadastro"><i className="fas fa-user-plus"></i></Link>
                                    <Link to="/cadastro">Cadastro</Link>
                                </li>
                                <li>
                                    <Link to="/login"><i className="fas fa-sign-in-alt"></i></Link>
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