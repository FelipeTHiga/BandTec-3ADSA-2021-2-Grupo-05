import { Link, NavLink } from 'react-router-dom';
import '../styles/accountMenu.scss';


export function AccountMenu(props) {

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
                    <li className="link" >
                        <NavLink to="/perfil/meus-pedidos" activeClassName='active'>Pedidos</NavLink>
                    </li>

                    {
                        props.isSeller ?
                            (
                                <li className="link">
                                     <NavLink to="/perfil/seller" activeClassName='active'>Dados comerciais</NavLink>
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