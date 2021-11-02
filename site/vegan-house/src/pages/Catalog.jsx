import '../styles/catalog.scss';
import '../styles/global.scss';
//import '../scripts/catalog';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Submenu } from '../components/Submenu';
import loginService from '../services/login';
import { ProductCard } from '../components/ProductCard';
import productService from '../services/crud-product';
import React, { Component, useState } from 'react';

let list = [];

function toggleClass(id, classe) {

if(!list.isEmpty) {
    for(var i = 0; i < list.length; i++) {
        list[i].classList.remove(classe);
    }
}

let element = document.getElementById(id);
element.classList.toggle(classe);
//element.setState(classe);
list.push(element);

}
class CatalogClass extends Component {
    state = {
        products: [{
            id: 0,
            name: "",
            category: "",
            subCategory: "",
            inventory: ""
        }],
        error: "",
        testeList: []
    };

    getProd() {
        productService.getProductsAll().then(list => {
            console.log(list)
            this.setState({ testeList: list.data })
        })
    }

    componentDidMount() {
        this.getProd()
    }

    render() {

        return (
            <>
                <Navbar isLogged={loginService.getSession()} />
                <Submenu />
                <section class="container-search-result">
                    <div className="title-catalog">
                        <h1>Todos os resultados/</h1>
                    </div>
                    <div className="catalog-content">
                        <div className="container-categories">
                            <div className="results-title">
                                <h3> {this.state.testeList.length} resultado(s)</h3>
                            </div>
                            <div class="categories">
                                <h3 class="category-title">Categorias</h3>
                                <ul class="category-list">
                                    <li id="item-0" class="category-itens" onClick="toggleClass('item-0', 'iten-active')">Todos
                                        ({this.state.testeList.length})</li>
                                    <li id="item-1" class="category-itens" onClick="toggleClass('item-1', 'iten-active')">Acessórios
                                        ()</li>
                                    <li id="item-2" class="category-itens" onClick="toggleClass('item-2', 'iten-active')">Alimentos
                                        ()</li>
                                    <li id="item-3" class="category-itens" onClick="toggleClass('item-3', 'iten-active')">Cosméticos
                                        ()</li>
                                    <li id="item-4" class="category-itens" onClick="toggleClass('item-4', 'iten-active')">Saúde
                                        ()</li>
                                    <li id="item-5" class="category-itens" onClick="toggleClass('item-5', 'iten-active')">Vestimenta
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
                                        onClick="toggleClass('btn-filter-1', 'active')">Menor preço</button>
                                    <button id="btn-filter-2" class="btn-filter"
                                        onClick="toggleClass('btn-filter-2', 'active')">Maior preço</button>
                                    <button id="btn-filter-3" class="btn-filter"
                                        onClick="toggleClass('btn-filter-3', 'active')">Nome</button>
                                </div>
                            </div>
                            <div className="container-cards-products-changed line-up">
                                <ProductCard />
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </>
        )
    }
}

export function Catalog(params) {
    return (
        new CatalogClass()
    )
}

{/* <script>

</script> */}
