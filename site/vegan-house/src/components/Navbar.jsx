import { Link } from 'react-router-dom';
import '../styles/navbar.scss'
import logo from '../assets/images/logo.png';
import loginService from '../services/login'
import { useState } from 'react';
import { useHistory } from 'react-router';
import api from '../services/api';


export function Navbar(props) {
    let authenticatedUser = {
        authenticated: false
    }
    let userLogged = loginService.getSession() ?? authenticatedUser;

    function logout() {
        sessionStorage.setItem("user", null)
    }

    const [searchProduct, setSearchProduct] = useState("");

    const history = useHistory();
    function search() {
        sessionStorage.setItem("nameProd", searchProduct);
        var name = sessionStorage.getItem("nameProd");
        if (searchProduct === "" && props.isCatalog !== true) {
            history.push(`/todos-os-resultados/Todos`);
        } else if (props.isCatalog === true) {
            if (name !== "") {
                api.get(`/products/name/${name}`)
                    .then((res) => {
                        if (res.status === 200) {
                            props.setProducts(res.data);
                            sessionStorage.setItem("nameProd", "");
                        }
                    }).catch((err) => {
                    })
            } else {
                api({
                    method: 'get',
                    url: `/products/all`,
                }).then((res) => {
                    props.setProducts(res.data);
                }) 
            }
        } else {
            history.push(`/todos-os-resultados/${name}`);
        }
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
                    <input placeholder="Busque seus produtos aqui" type="text" onChange={e => setSearchProduct(e.target.value)} />
                    <div className="container-search-icon">
                        <button className="search-button" onClick={search}>
                            <i className="fas fa-search" onClick={search}></i>
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