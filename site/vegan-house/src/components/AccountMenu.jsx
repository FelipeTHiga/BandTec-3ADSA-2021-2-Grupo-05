import { Link } from 'react-router-dom';
import "../styles/accountMenu.css";


export function AccountMenu(props) {
    return (
        <div class="container-menu-perfil">
            <section>
                <ul>
                    <li class="radius-top-left-right">
                        <p class="line-up">
                            <b>Minha conta</b>
                        </p>
                    </li>

                    <li class="active">
                        <Link to="/perfil/dados-pessoais">Dados pessoais</Link>
                    </li>
                    <li>
                        <Link to="/perfil/endereco">Endereço</Link>
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