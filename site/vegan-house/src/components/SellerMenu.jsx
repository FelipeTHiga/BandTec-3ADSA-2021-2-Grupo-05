import "../styles/accountMenu.css";
import { NavLink } from 'react-router-dom';
import React from 'react';


export function SellerMenu(props) {
    const[activeMenu, setActiveMenu] = React.useState('');
    console.log(activeMenu);
    return (
        <>
            <div class="container-menu-profile">
                {
                    props.isSeller ? (
                        <>
                            <section>
                                <ul className="ul-menu-seller">
                                    <li class="radius-top-left-right">
                                        <p class="line-up">
                                            <b>Comercial</b>
                                        </p>
                                    </li>

                                    <li className="linkSeller">
                                        <NavLink to="/perfil/meus-produtos" activeClassName='activeSeller'>Produtos</NavLink>
                                    </li>
                                    <li className="linkSeller">
                                        <NavLink to="/perfil/minhas-vendas" activeClassName='activeSeller'>Vendas</NavLink>
                                    </li>
                                    <li className="linkSeller" >
                                        <NavLink to="#" /* activeClassName='activeSeller' */>Dados bancários</NavLink>
                                    </li>

                                </ul>
                            </section>
                        </>
                    ) : (<>
                    </>

                    )
                }

            </div >
        </>


    );
}