import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Submenu } from '../components/Submenu';
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
                                    (<div class="result-number-2"></div>)</li>
                                <li id="item-1" class="category-itens" onclick="toggleClass('item-1', 'iten-active')">Acessórios
                                    (<div class="result-acessories"></div>)</li>
                                <li id="item-2" class="category-itens" onclick="toggleClass('item-2', 'iten-active')">Alimentos
                                    (<div class="result-food"></div>)</li>
                                <li id="item-3" class="category-itens" onclick="toggleClass('item-3', 'iten-active')">Cosméticos
                                    (<div class="result-cosmetics"></div>)</li>
                                <li id="item-4" class="category-itens" onclick="toggleClass('item-4', 'iten-active')">Saúde
                                    (<div class="result-health"></div>)</li>
                                <li id="item-5" class="category-itens" onclick="toggleClass('item-5', 'iten-active')">Vestimenta
                                    (<div class="result-clothing"></div>)</li>
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
                        </div>
                </div>

                {/* <div class="second-section">
                    <div class="left-column">
                        <div class="total-results">
                            <h3 class="result-title">
                                <div class="result-number"></div>resultado(s)
                            </h3>
                        </div>
                    </div>

                    <div class="right-column">
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
                    </div>
                </div>


                <div class="third-section">

                    <div class="left-column">
                        <div class="container-categories">
                            <h3 class="category-title">Categorias</h3>
                            <ul class="category-list">
                                <li id="item-0" class="category-itens" onclick="toggleClass('item-0', 'iten-active')">Todos
                                    (<div class="result-number-2"></div>)</li>
                                <li id="item-1" class="category-itens" onclick="toggleClass('item-1', 'iten-active')">Acessórios
                                    (<div class="result-acessories"></div>)</li>
                                <li id="item-2" class="category-itens" onclick="toggleClass('item-2', 'iten-active')">Alimentos
                                    (<div class="result-food"></div>)</li>
                                <li id="item-3" class="category-itens" onclick="toggleClass('item-3', 'iten-active')">Cosméticos
                                    (<div class="result-cosmetics"></div>)</li>
                                <li id="item-4" class="category-itens" onclick="toggleClass('item-4', 'iten-active')">Saúde
                                    (<div class="result-health"></div>)</li>
                                <li id="item-5" class="category-itens" onclick="toggleClass('item-5', 'iten-active')">Vestimenta
                                    (<div class="result-clothing"></div>)</li>
                            </ul>
                        </div>
                    </div>

                    <div class="container-products">
                        <div class="container-products-and-arrow line-up new-style">

                            <div class="container-cards-products line-up teste">
                            </div>

                        </div>
                    </div>
                </div>


                <div class="fourth-section right-column">
                    <div class="container-pages">
                        <h3 class="page-number">${ }</h3>
                        <i class="fas fa-caret-right arrow"></i>
                    </div>
                </div> */}


            </section>
            <Footer />
        </>
    )
}