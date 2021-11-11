import { Link, NavLink } from 'react-router-dom';
import React from 'react';
import "../styles/accountMenu.css";


export function AccountMenu(props) {

    const[activeMenu, setActiveMenu] = React.useState('');
    console.log(activeMenu);

    return (
        <div class="container-menu-profile">
            <section>
                <ul className="ul-menu">
                    <li class="radius-top-left-right">
                        <p class="line-up">
                            <b>Minha conta</b>
                        </p>
                    </li>

                    <li className="link">
                        <NavLink to="/perfil/dados-pessoais" activeClassName='active'>Dados pessoais</NavLink>
                    </li>
                    <li className="link">
                        <NavLink to="/perfil/endereco" activeClassName='active'>Endereço</NavLink>
                    </li>
                    <li>
                        <a href="#">Pedidos</a>
                    </li>

                    {
                        props.isSeller ?
                            (
                                <li class="radius-bottom-left-right-white">
                                    <a href="#">Dados comerciais</a>
                                </li>
                            ) :
                            (
                                <li class="radius-bottom-left-right">
                                    <Link to="/perfil/cadastro-seller">Trabalhe conosco</Link>
                                </li>
                            )
                    }

                </ul>
            </section>
        </div>

    );
}