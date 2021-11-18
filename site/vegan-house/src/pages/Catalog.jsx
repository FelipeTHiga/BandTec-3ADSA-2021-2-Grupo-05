import '../styles/catalog.scss';
import '../styles/global.scss';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Submenu } from '../components/Submenu';
import loginService from '../services/login';
import { ProductCard } from '../components/ProductCard';
import React, { Component, useEffect, useState } from 'react';
import api from '../services/api';
import { useParams } from 'react-router';

export function Catalog() {

    let {categoryUrl} = useParams();

    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(categoryUrl);
    const [filter, setFilter] = useState("lowest-price");
    
    const [countAcessories, setCountAcessories] = useState(0);
    const [countFood, setCountFood] = useState(0);
    const [countCosmetics, setCountCosmetics] = useState(0);
    const [countHealth, setCountHealth] = useState(0);
    const [countClothing, setCountClothing] = useState(0);
    const [countAll, setCountAll] = useState(0);

    var isCategoryAll = category == "Todos" ? "" : category;

    // const [countCategory, setCountCategory] = useState({
    //     countAll: 0,
    //     countAcessories: 0,
    //     countFood: 0,
    //     countCosmetics: 0,
    //     countHealth: 0,
    //     countClothing: 0,
    // })

    useEffect(() => {
        async function productAll() {
            const res = await api.get(`/products/filter/lowest-price/${categoryUrl}`);
            setProducts(res.data);
            console.log(res.data);
        }

        async function countCategory() {
            const res = await api.get("/products/countCategory");
            console.log(res.data);
            setCategoryAll(res.data)
        }

        productAll();
        countCategory();
    }, [])

    function setCategoryAll(data) {

        for (var i = 0; i <= 5; i++) {
            switch (data[i][1]) {
                case "Todos":
                    setCountAll(data[i][0]);
                    break;
                case "Acessorios":
                    setCountAcessories(data[i][0]);
                    break;
                case "Alimentos":
                    setCountFood(data[i][0]);
                    break;
                case "Cosmeticos":
                    setCountCosmetics(data[i][0]);
                    break;
                case "Saude":
                    setCountHealth(data[i][0]);
                    break;
                    case "Vestimenta":
                    setCountClothing(data[i][0]);
                    break;
            }
        }
    }

    function getProductByCategory(e) {

        e.preventDefault();
        setCategory(e.target.id);

        api.get(`/products/tag/${e.target.id}`)
            .then((res) => {
                if (res.status === 200) {
                    setProducts(res.data)
                }
                console.log(res.status);
            }).catch((err) => {
                console.log(err);
            })

        if (document.querySelector('.iten-active') !== null) {
            document.querySelector('.iten-active').classList.remove('iten-active');
        }
        e.target.className = "iten-active";
    }

    function getProductByFilter(e) {

        e.preventDefault();
        setFilter(e.target.id);

        api.get(`/products/filter/${e.target.id}/${category}`, {
        }).then((res) => {
            if (res.status === 200) {
                setProducts(res.data)
            }
            console.log(res.status);
        }).catch((err) => {
            console.log(err);
        })

        if (document.querySelector('.b-active') !== null) {
            document.querySelector('.b-active').classList.remove('b-active');
        }
        document.getElementById(e.target.id).classList.add('b-active');
    }

    return (
        <>
            <Navbar isLogged={false} />
            <Submenu />
            <section className="container-search-result">
                <div className="title-catalog">
                    
                    <h1>{`Todos os resultados / ${isCategoryAll}`}</h1>
                </div>
                <div className="catalog-content">
                    <div className="container-categories">
                        <div className="results-title">
                            <h3>{countAll} resultado(s)</h3>
                        </div>
                        <div className="categories">
                            <h3 className="category-title">Categorias</h3>
                            <ul className="category-list">
                                <li id="Todos" className="iten-active"
                                    onClick={getProductByCategory}>Todos ({countAll})</li>
                                <li id="Acessorios"
                                onClick={getProductByCategory}>Acessórios ({countAcessories})</li>
                                <li id="Alimentos"
                                onClick={getProductByCategory}>Alimentos
                                ({countFood})</li>
                                <li id="Cosmeticos"
                                onClick={getProductByCategory}>Cosméticos
                                ({countCosmetics})</li>
                                <li id="Saude"
                                onClick={getProductByCategory}>Saúde
                                ({countHealth})</li>
                                <li id="Vestimenta"
                                onClick={getProductByCategory}>Vestimenta
                                ({countClothing})</li>
                            </ul>
                        </div>
                    </div>
                    <div className="products-catalog">
                        <div className="container-filters">
                            <div className="order">
                                <h3>Ordenar por:</h3>
                            </div>
                            <div className="filters">
                                <button id="lowest-price" className="btn-filter b-active"
                                    onClick={getProductByFilter}
                                >Menor preço</button>
                                <button id="highest-price" className="btn-filter"
                                    onClick={getProductByFilter}
                                >Maior preço</button>
                                <button id="name" className="btn-filter"
                                    onClick={getProductByFilter}>Nome</button>
                            </div>
                        </div>
                        <div className="container-cards-products-changed line-up">
                            {products.map(product => (
                                <ProductCard id={product.id} name={product.name}
                                    price={product.price} category={product.category} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
