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
                        <a href="#">Dados pessoais</a>
                    </li>
                    <li>
                        <a href="#">Endereço</a>
                    </li>
                    <li>
                        <a href="#">Segurança</a>
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
                                    <a href="#">Trabalhe conosco</a>
                                </li>
                            )
                    }

                </ul>
            </section>
        </div>

    );
}