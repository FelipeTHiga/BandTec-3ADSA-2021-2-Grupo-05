import { Link } from 'react-router-dom';
import '../styles/navbar.scss'
import logo from '../assets/images/logo.png';
import loginService from '../services/login'


export function Navbar(props) {
    let authenticatedUser = {
        authenticated: false
    }
    let userLogged = loginService.getSession() ?? authenticatedUser;
    
    function logout() {
        sessionStorage.setItem("user", null)
    }

    return (
        <header className="header">
            <div className="container-header">
                <div className="title-site line-up">
                    <Link to="/">
                        <img src={logo} alt="Logo Vegan House" />
                    </Link>
                </div>

                <section className="container-search-bar line-up">
                    <input placeholder="Busque seus produtos aqui" type="text" />
                    <div className="container-search-icon">
                        <button className="search-button">
                            <Link to="/todos-os-resultados/Todos">
                                <i className="fas fa-search"></i>
                            </Link>
                        </button>

                    </div>
                </section>

                <section className="nav-bar">
                    <ul className="line-up">

                        {userLogged.authenticated ? (
                            <>
                                <li>
                                    <Link to="/perfil/dados-pessoais"><i className="fas fa-user-plus"></i></Link>
                                    <Link to="/perfil/dados-pessoais">Perfil</Link>
                                </li>

                                <li>
                                    <Link to="/carrinho"><i className="fas fa-shopping-cart"></i></Link>
                                    <Link to="/carrinho">Carrinho</Link>
                                </li>

                                <li>
                                    <Link to="/"><i onClick={logout} class="fas fa-door-open"></i></Link>
                                    <Link to="/" onClick={logout}>Sair</Link>
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
                                    <Link to="/carrinho"><i className="fas fa-shopping-cart"></i></Link>
                                    <Link to="/carrinho"><a href="#"> Carrinho</a></Link>
                                </li>
                            </>
                        )}
                    </ul>
                </section>
            </div>
        </header>
    );
}