import { Title } from '../components/Title';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AccountMenu } from '../components/AccountMenu';
import { SellerMenu } from '../components/SellerMenu';
import { SectionTitle } from '../components/SectionTitle';
import { Button } from '../components/Button';
import { DragDropUpload } from '../components/DragDropUpload';
import { UserGreeting } from '../components/UserGreeting';
import '../styles/global.scss';
import '../styles/reset.css';
import '../styles/myProducts.scss';
import ProductTableRow from '../components/ProductTableRow';
import productService from '../services/crud-product'
import loginService from '../services/login';
import React, { Component, useState, useEffect, useHistory } from "react";
import api from '../services/api';
import undo from '../assets/images/undo.png'
import redo from '../assets/images/redo.png'

export function MyProducts() {
    let user = loginService.getSession();
    const [products, setProducts] = useState([]);

    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [inventory, setInvetory] = useState("");
    const [price, setPrice] = useState(0.0);
    const [description, setDescription] = useState("");
    const [fkSeller, setFkSeller] = useState(0);
    const [searchName, setSearchName] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    const [searchSubCategory, setSearchSubCategory] = useState("");
    const [acao, setAcao] = useState("Cadastrar produto");

    const [image_url1, setImageUrl1] = useState("");
    const [image_url2, setImageUrl2] = useState("");
    const [image_url3, setImageUrl3] = useState("");
    let idProduct;


    useEffect(() => {
        async function productsAll() {
            const res = await api.get("/products/all");
            setProducts(res.data);
            console.log(res.data);
        }

        productsAll();
    }, [])

    // USAR CONST PARA ADICIONAR O VALE

    function pacthImage(e) {
        e.preventDefault();

        api.patch(`/products/image/${2}`, {
            image_url1: image_url1,
            image_url2: image_url2, 
            image_url3: image_url3
        }).then((res)=>{
            setImageUrl1(res.data.image_url1);
            setImageUrl2(res.data.image_url2);
            setImageUrl3(res.data.image_url3);
        })
    }



    function patch(e) {
        e.preventDefault();

        api.patch(`/products/${id}`, {
            name: name,
            category: category,
            subCategory: subCategory,
            inventory: inventory,
            price: parseFloat(price),
            description: description,
            fkSeller: user.id
        }).then((res) => {
            if (res.status === 200) {
                console.log("Produto atualizado - " + res.statusText);
                alert("O produto foi atualizado!");
                setName("");
                setCategory("");
                setSubCategory("");
                setInvetory("");
                setPrice("");
                setDescription("");
                setFkSeller("");
                document.getElementById("create-btn").style.display = "block";
                document.getElementById("edit-btn").style.display = "none";
                setAcao("Cadastrar produto");
            } else {
                console.log("Ocorreu um erro na atualizacao - " + res.statusText);
            }
            console.log(res.status);
        }).catch((err) => {
            console.log(err);
        })
    }

    function edit(event) {
        console.log(event.target.value);
        setId(event.target.id);
        api.get(`/products/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    setName(res.data.name)
                    setCategory(res.data.category)
                    setSubCategory(res.data.subCategory)
                    setInvetory(res.data.inventory)
                    setPrice(res.data.price)
                    setDescription(res.data.description)
                    setFkSeller(res.data.fkSeller)
                    document.getElementById("create-btn").style.display = "none";
                    document.getElementById("edit-btn").style.display = "block";
                    setAcao("Editar produto")
                }
                console.log(res.status);
            }).catch((err) => {
                console.log(err);
            })
        console.log(event.target.id)
        idProduct = event.target.id;
    }

    function remove(e) {
        e.preventDefault();
        setId(e.target.id);
        api.delete(`/products/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    console.log("Produto deletado - " + res.statusText);
                    alert("O produto foi deletado!")
                } else {
                    console.log("Ocorreu um erro na delecao - " + res.statusText);
                }
                console.log(res.status);
            }).catch((err) => {
                console.log(err);
            })
    }

    function getSearchName(e) {
        e.preventDefault();
        if (searchName) {
            api.get(`/products/name/${searchName}`)
                .then((res) => {
                    if (res.status === 200) {
                        setProducts(res.data)
                    }
                    console.log(res.status);
                    setSearchName("");
                }).catch((err) => {
                    console.log(err);
                })
        } else {
            // api.get(`/products/all/${user.id}`)
            //     .then((res) => {
            //         if (res.status === 200) {
            //             setProducts(res.data)
            //         }
            //         console.log(res.status);
            //     }).catch((err) => {
            //         console.log(err);
            //     })

            api.get(`/products/all`)
                .then((res) => {
                    if (res.status === 200) {
                        setProducts(res.data)
                    }
                    console.log(res.status);
                }).catch((err) => {
                    console.log(err);
                })
        }

    }

    function getAllProducts(e) {
        e.preventDefault();
        // api.get(`/products/all/${user.id}`)
        //     .then((res) => {
        //         if (res.status === 200) {
        //             setProducts(res.data)
        //         }
        //         console.log(res.status);
        //     }).catch((err) => {
        //         console.log(err);
        //     })

        api.get(`/products/all`)
            .then((res) => {
                if (res.status === 200) {
                    setProducts(res.data)
                }
                console.log(res.status);
            }).catch((err) => {
                console.log(err);
            })

        window.location.href = '#section-products-edit'
    }

    function getSearchCategory(e) {
        setSearchCategory(e.target.value);
        api.get(`/products/tag/${searchCategory}`)
            .then((res) => {
                if (res.status === 200) {
                    setProducts(res.data)
                }
                console.log(res.status);
            }).catch((err) => {
                console.log(err);
            })
    }

    // function getSearchSubCategory(e){
    //     e.preventDefault();
    //     api.get(`/products/tag/${searchSubCategory}`)
    //     .then((res) => {
    //         if (res.status === 200) {
    //             setProducts(res.data)
    //         }
    //         console.log(res.status);
    //     }).catch((err) => {
    //         console.log(err);
    //     })
    // }

    return (
        <>
            <Navbar />
            <div className="page-container">
                <UserGreeting username={user.nameUser} isSeller={true} />
            </div>

            <div className="line-up">
                <Title title="Comercial" />
            </div>

            <div className="page-container">
                <div className="container-menus-and-products">
                    <div className="section-menus align-column">
                        <AccountMenu isSeller={true} />
                        <SellerMenu isSeller={true} />
                    </div>

                    <div className="section-products">
                        <div className="container-products">
                            <SectionTitle text="Meus produtos" />

                            <div className="container-product-options">
                                <div className="product-options2">
                                    <div className="product-option" >
                                        <label htmlFor="">Buscar produto</label>

                                        <section className="search-bar line-up">
                                            <input id="name_search" onChange={e => setSearchName(e.target.value)} className="input" placeholder="Buscar" type="text" />
                                            <button onClick={getSearchName}><i className="fas fa-search"></i></button>
                                        </section>
                                    </div>

                                    <div className="product-option" >
                                        <label htmlFor="">Ordenar por</label>
                                        <select name="" id="state" onChange={getSearchCategory}>
                                            <option value="">-- Categoria -- </option>
                                            <option value="Alimentos">Alimentos</option>
                                            <option value="Vestimenta">Vestimenta</option>
                                            <option value="Acessórios">Acessórios</option>
                                            <option value="Cosméticos">Cosméticos</option>
                                            <option value="Saúde">Saúde</option>
                                            <i class="fas fa-arrow-down"></i>
                                        </select>
                                    </div>


                                    <div className="product-option" >
                                        <label htmlFor="">Adicionar produto</label>
                                        <button onClick={getAllProducts} className="all-product" >Cadastrar</button>
                                    </div>

                                </div>
                                <div className="product-options-export-and-import">
                                    <div className="product-option" >
                                        <label htmlFor="">Importar produtos</label>

                                        <label class="file">
                                            <span class="file-custom"></span>
                                            <input type="file" id="file" aria-label="File browser example" />
                                        </label>
                                        <a className="a-download">Baixar documento de layout</a>
                                    </div>

                                    <div className="product-option" >
                                        <label htmlFor="">Exportar produtos</label>
                                        <section className="line-up">
                                            <button className="btn-txt">TXT</button>
                                            <button className="btn-csv">CSV</button>
                                        </section>
                                    </div>

                                </div>

                            </div>
                            <div className="commands">
                                <button><img src={undo} /></button>
                                <button><img src={redo} /></button>
                            </div>
                            <div className="products-table-header">
                                <label htmlFor="">Nome do produto</label>
                                <label htmlFor="">Categoria</label>
                                <label htmlFor="">Subcategoria</label>
                                <label htmlFor="">Qtd. estoque</label>
                            </div>

                            <div className="products-table-body">
                                {products.map(product => (
                                    <ProductTableRow id={product.id} name={product.name} category={product.category} subCategory={product.subCategory} inventory={product.inventory} edit={edit} remove={remove} pro={product} />
                                ))}
                            </div>
                        </div>

                        <div id="section-products-edit" className="section-products-edit">
                            <div className="container-products">
                                <SectionTitle text={acao} />

                                <div className="product-edit-camp">
                                    <label>Nome</label>
                                    <input id="name_product" onChange={e => setName(e.target.value)} value={name} className="input" type="text" placeholder="Ex. Sorverte de banana" />
                                </div>

                                <div className="line-up width-100">
                                    <div className="product-edit-camp margin-right-50">
                                        <label htmlFor="">Categoria</label>
                                        <select name="" onChange={e => setCategory(e.target.value)} value={category} id="category">
                                            <option value="">Selecione uma categoria</option>
                                            <option value="Alimentos">Alimentos</option>
                                            <option value="Vestimenta">Vestimenta</option>
                                            <option value="Acessórios">Acessórios</option>
                                            <option value="Cosméticos">Cosméticos</option>
                                            <option value="Saúde">Saúde</option>
                                            <i class="fas fa-arrow-down"></i>
                                        </select>
                                    </div>
                                    <div className="product-edit-camp">
                                        <label htmlFor="">Subcategoria</label>
                                        <select name="" onChange={e => setSubCategory(e.target.value)} value={subCategory} id="sub_category">
                                            <option value="">Selecione uma Subcategoria</option>
                                            <option value="Alimentos">Alimentos</option>
                                            <option value="Vestimenta">Vestimenta</option>
                                            <option value="Acessórios">Acessórios</option>
                                            <option value="Cosméticos">Cosméticos</option>
                                            <option value="Saúde">Saúde</option>
                                            <i class="fas fa-arrow-down"></i>
                                        </select>
                                    </div>
                                </div>

                                <div className="line-up width-100">
                                    <div className="product-edit-camp margin-right-50">
                                        <label htmlFor="">Preço</label>
                                        <input id="price" onChange={e => setPrice(e.target.value)} value={price} className="input" type="text" placeholder="R$" />
                                    </div>

                                    <div className="product-edit-camp">
                                        <label htmlFor="">Qtd. estoque</label>
                                        <input id="inventory" onChange={e => setInvetory(e.target.value)} value={inventory} className="input" type="text" placeholder="100" />
                                    </div>
                                </div>

                                <div className="line-up width-100 margin-top-20">
                                    <DragDropUpload dragId="dragId-1" />
                                    <DragDropUpload dragId="dragId-2" />
                                    <DragDropUpload dragId="dragId-3" />
                                </div>

                                <div className="product-edit-camp">
                                    <label htmlFor="">Descrição</label>
                                    <textarea name="" id="description" onChange={e => setDescription(e.target.value)} value={description} cols="30" rows="10"></textarea>
                                </div>

                                <div className="align-column margin-top-20 margin-bottom-25">
                                    <button id="create-btn" className="create-product-btn" onClick={productService.createProduct}>Cadastrar</button>
                                    <button id="edit-btn" className="edit-product-btn" onClick={pacthImage}>Editar</button>
                                    
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="margin-top-25">
                <Footer />
            </div>
        </>

    );
}