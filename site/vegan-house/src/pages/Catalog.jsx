import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Submenu } from '../components/Submenu';
import { ProductCard } from '../components/ProductCard';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';

import api from '../services/api';

import '../styles/catalog.scss';
import '../styles/global.scss';

export function Catalog() {

    let { categoryUrl } = useParams();
    const history = useHistory();

    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState("lowest-price");
    const [category, setCategory] = useState(categoryUrl);
    const [countAcessories, setCountAcessories] = useState(0);
    const [countFood, setCountFood] = useState(0);
    const [countCosmetics, setCountCosmetics] = useState(0);
    const [countHealth, setCountHealth] = useState(0);
    const [countClothing, setCountClothing] = useState(0);
    const [countAll, setCountAll] = useState(0);
    const [defaultMessage, setDefaultMessage] = useState("");
    const [defaultMessageAll, setDefaultMessageAll] = useState("");

    var isCategoryAll = category === "Todos" ? "" : category;

    useEffect(() => {

        function productAll() {
            var name = sessionStorage.getItem("nameProd");
            if (categoryUrl === name) {
                categoryUrl = "";
                setCategory(name);
                if (document.querySelector('.iten-active') !== null) {
                    document.querySelector('.iten-active').classList.remove('iten-active');
                }
                api.get(`/products/name/${name}`)
                    .then((res) => {
                        if (res.status === 200) {
                            setProducts(res.data);
                            setDefaultMessage("");
                            sessionStorage.setItem("nameProd", "");
                        } else if (res.status === 204) {
                            setProducts([]);
                            setDefaultMessage(`Nenhum resultado encontrado para "${name}"`);
                        }
                    }).catch((err) => {
                    })
            } else {
                api({
                    method: 'get',
                    url: `/products/filter/lowest-price/${categoryUrl}`,
                })
                    .then((res) => {
                        if (document.querySelector('.iten-active') !== null) {
                            document.querySelector('.iten-active').classList.remove('iten-active');
                        }
                        //document.getElementById(`${categoryUrl}`).className = "iten-active";
                        var category = `${categoryUrl}`
                        var query = '.teste#' + category
                        document.querySelector(query).className = "iten-active";

                        if (res.status === 200) {
                            setProducts(res.data);
                            setDefaultMessage("");
                        } else if (res.status === 204) {
                            setProducts([]);
                            setDefaultMessage("Sua busca não teve resultados.");
                        }
                    })
            }
        }

        async function countCategory() {
            const res = await api.get("/products/countCategory");
            await setCategoryAll(res.data)
        }

        countCategory();
        productAll();

    }, [], [])

    function setCategoryAll(data) {

        for (var i = 0; i <= data.length - 1; i++) {

            switch (data[i][1]) {
                case "Todos":
                    setCountAll(data[i][0]);
                    break;
                case "Acessórios":
                    setCountAcessories(data[i][0]);
                    break;
                case "Alimentos":
                    setCountFood(data[i][0]);
                    break;
                case "Cosméticos":
                    setCountCosmetics(data[i][0]);
                    break;
                case "Saúde":
                    setCountHealth(data[i][0]);
                    break;
                case "Vestimenta":
                    setCountClothing(data[i][0]);
                    break;
                default:
                    break;
            }
        }
    }

    function getProductByCategory(e) {

        e.preventDefault();
        setCategory(e.target.id);
        history.push(`/todos-os-resultados/${e.target.id}`);

        api.get(`/products/tag/${e.target.id}`)
            .then((res) => {
                if (res.status === 200) {
                    setProducts(res.data);
                    setDefaultMessage("");
                } else if (res.status === 204) {
                    setProducts([]);
                    setDefaultMessage("Sua busca não teve resultados.");
                }
            }).catch((err) => {
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
                setDefaultMessageAll("")
            } else if (res.status === 204) {
                setProducts([])
                setDefaultMessageAll("Sua busca não teve resultados.")
            }
        }).catch((err) => {
        })

        if (document.querySelector('.b-active') !== null) {
            document.querySelector('.b-active').classList.remove('b-active');
        }
        document.getElementById(e.target.id).classList.add('b-active');
    }

    return (
        <>
            <Navbar isCatalog={true} setProducts={setProducts} />
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
                                <li id="Todos" className="iten-active teste"
                                    onClick={getProductByCategory}>Todos ({countAll})</li>
                                <li id="Acessórios" className="teste"
                                    onClick={getProductByCategory}>Acessórios ({countAcessories})</li>
                                <li id="Alimentos" className="teste"
                                    onClick={getProductByCategory}>Alimentos
                                    ({countFood})</li>
                                <li id="Cosméticos" className="teste"
                                    onClick={getProductByCategory}>Cosméticos
                                    ({countCosmetics})</li>
                                <li id="Saúde" className="teste"
                                    onClick={getProductByCategory}>Saúde
                                    ({countHealth})</li>
                                <li id="Vestimenta" className="teste"
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
                                    price={product.price} category={product.category} fkSeller={product.fkSeller} />
                            ))}
                            <div className='defaultMessage catalog-products'>{defaultMessage}</div>
                            <div className='defaultMessage catalog-products'>{defaultMessageAll}</div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}