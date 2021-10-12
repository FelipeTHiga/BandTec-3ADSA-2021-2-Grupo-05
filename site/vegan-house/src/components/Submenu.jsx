import '../styles/submenu.scss';
export function Submenu() {
    return (
        <section className="sub-menu line-up">
            <ul className="line-up">
                <li className="foods ">
                    <i className=" fas fa-utensils"></i>
                    <a href="#">Alimentos</a>
                    <i className="fas fa-sort-down"></i>
                </li>
                <li className="cosmetics ">
                    <i className="fas fa-air-freshener"></i>
                    <a href="#">Cosméticos</a>
                    <i className="fas fa-sort-down"></i>
                </li>
                <li className="health ">
                    <i className="fas fa-first-aid"></i>
                    <a href="#">Saúde</a>
                    <i className="fas fa-sort-down"></i>
                </li>
                <li className="accessories ">
                    <i className="fas fa-suitcase"></i>
                    <a href="#">Acessórios</a>
                    <i className="fas fa-sort-down"></i>
                </li>
                <li className="dress ">
                    <i className="fas fa-tshirt"></i>
                    <a href="#">Vestimento</a>
                    <i className="fas fa-sort-down"></i>
                </li>
            </ul>
        </section>
    )
}