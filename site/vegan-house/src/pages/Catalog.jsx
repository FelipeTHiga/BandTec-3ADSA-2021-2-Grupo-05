import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Submenu } from '../components/Submenu';
import { Card } from '../components/Card';
import '../styles/catalog.scss';
import '../styles/global.scss';
import { getUser } from '../scripts/crud-user';

export function Catalog() {
    return (
        <>
            <Navbar isLogged={getUser} />
            <Submenu />
            <section class="container-search-result">

                <div className="title-catalog">
                    <h1>Todos os resultados/</h1>
                </div>

                <div className="catalog-content">

                    <div className="container-categories">
                        <div className="results-title">
                            <h3><div class="result-number-2"></div> resultado(s)</h3>
                        </div>
                        <div class="categories">
                            <h3 class="category-title">Categorias</h3>
                            <ul class="category-list">
                                <li id="item-0" class="category-itens" onclick="toggleClass('item-0', 'iten-active')">Todos
                                    ()</li>
                                <li id="item-1" class="category-itens" onclick="toggleClass('item-1', 'iten-active')">Acessórios
                                    ()</li>
                                <li id="item-2" class="category-itens" onclick="toggleClass('item-2', 'iten-active')">Alimentos
                                    ()</li>
                                <li id="item-3" class="category-itens" onclick="toggleClass('item-3', 'iten-active')">Cosméticos
                                    ()</li>
                                <li id="item-4" class="category-itens" onclick="toggleClass('item-4', 'iten-active')">Saúde
                                    ()</li>
                                <li id="item-5" class="category-itens" onclick="toggleClass('item-5', 'iten-active')">Vestimenta
                                    ()</li>
                            </ul>
                        </div>
                    </div>
                    <div className="products-catalog">
                        <div class="container-filters">
                            <div class="order">
                                <h3>Ordenar por:</h3>
                            </div>
                            <div class="filters">
                                <button id="btn-filter-1" class="btn-filter"
                                    onclick="toggleClass('btn-filter-1', 'active')">Menor preço</button>
                                <button id="btn-filter-2" class="btn-filter"
                                    onclick="toggleClass('btn-filter-2', 'active')">Maior preço</button>
                                <button id="btn-filter-3" class="btn-filter"
                                    onclick="toggleClass('btn-filter-3', 'active')">Nome</button>
                            </div>

                        </div>
                        <div className="container-cards-products line-up">
                            <Card />
                        </div>
                    </div>
                </div>


            </section>
            <Footer />
        </>
    )
}