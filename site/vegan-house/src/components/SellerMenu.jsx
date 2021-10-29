import "../styles/accountMenu.css";


export function SellerMenu(props) {
    return (
        <>
            <div class="container-menu-perfil">
                {
                    props.isSeller ? (
                        <>
                            <section>
                                <ul>
                                    <li class="radius-top-left-right">
                                        <p class="line-up">
                                            <b>Comercial</b>
                                        </p>
                                    </li>

                                    <li>
                                        <a href="#">Produtos</a>
                                    </li>

                                    <li class="radius-bottom-left-right-white">
                                        <a href="#">Vendas</a>
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