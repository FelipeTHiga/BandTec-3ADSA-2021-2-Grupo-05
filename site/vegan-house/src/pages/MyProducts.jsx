import { Title } from '../components/Title';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AccountMenu } from '../components/AccountMenu';
import { SellerMenu } from '../components/SellerMenu';
import { SectionTitle } from '../components/SectionTitle';
import { DragDropUpload } from '../components/DragDropUpload';
import { UserGreeting } from '../components/UserGreeting';
import { useState, useEffect } from 'react';
import ModalChoice from '../components/ModalChoice';
import ModalMessage from '../components/ModalMessage';
import Loading from '../assets/images/loading.gif'
import ProductTableRow from '../components/ProductTableRow';
import loginService from '../services/login';
import api from '../services/api';
import undo from '../assets/images/undo.png'
import redo from '../assets/images/redo.png'
import file from '../files/Documento-de-layout-importação.pdf';

import '../styles/global.scss';
import '../styles/reset.scss';
import '../styles/myProducts.scss';

export function MyProducts() {

    let user = loginService.getSession();
    const [products, setProducts] = useState([]);
    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [inventory, setInvetory] = useState("");
    const [price, setPrice] = useState(0.0);
    const [description, setDescription] = useState("");
    const [fkSeller, setFkSeller] = useState(0);
    const [searchName, setSearchName] = useState("");
    const [acao, setAcao] = useState("Cadastrar produto");
    const [errorName, setErrorName] = useState("");
    const [errorCategory, setErrorCategory] = useState("");
    const [errorPrice, setErrorPrice] = useState("");
    const [errorDescription, setErrorDescription] = useState("");
    const [errorInventory, setErrorInventory] = useState("");
    const [error, setError] = useState("");
    const [sucess, setSucess] = useState("");
    const [loading, setLoading] = useState(false);

    const [image_url1, setImageUrl1] = useState("");
    const [image_url2, setImageUrl2] = useState("");
    const [image_url3, setImageUrl3] = useState("");

    const [isModalChoiceVisible, setIsModalChoiceVisible] = useState(false);
    const [isModalMessageVisible, setIsModalMessageVisible] = useState(false);
    const [modalIdProduct, setModalIdProduct] = useState();
    const [modalMessage, setModalMessage] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [defaultMessage, setDefaultMessage] = useState("");

    useEffect(() => {

        async function productsAll() {
            const res = await api.get(`products/all/${user.id}`);
            if (res.status === 200) {
                setProducts(res.data);
                setDefaultMessage("");
            } else if (res.status === 204) {
                setProducts([]);
                setDefaultMessage("Não há nenhum produto cadastrado.")
            }
        }

        productsAll();
    }, [])

    function warmings(errors) {

        if (errors.name) {
            setErrorName(errors.name)
        }
        if (errors.category) {
            setErrorCategory(errors.category)
        }
        if (errors.price) {
            setErrorPrice(errors.price)
        }
        if (errors.description) {
            setErrorDescription(errors.description)
        }
        if (errors.inventory) {
            setErrorInventory(errors.inventory)
        }
        window.location.href = '#section-products-edit'
    }

    function pacthImage(idProduto) {

        let form = new FormData();
        form.append("foto1", image_url1.files[0])
        form.append("foto2", image_url2.files[0])
        form.append("foto3", image_url3.files[0])

        api.post(`/products/image/${idProduto}`, form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            setImageUrl1(res.data.image_url1);
            setImageUrl2(res.data.image_url2);
            setImageUrl3(res.data.image_url3);
        }).catch((err) => {
            setError("As imagens não foram cadastradas.")
        })
    }

    function createProduct(e) {
        e.preventDefault();
        setError("");
        setErrorName("");
        setErrorCategory("");
        setErrorPrice("");
        setErrorDescription("");
        setErrorInventory("");

        //setLoading(true);
        api.post(`/products`, {
            name: name,
            price: parseFloat(price),
            category: category,
            description: description,
            inventory: parseInt(inventory),
            fkSeller: user.id
        })
            .then((res) => {
                setLoading(false);
                if (res.status === 201) {
                    setSucess("O produto foi criado!");
                    getAllProducts();
                    window.location.href = '#section-my-products'
                    pacthImage(res.data.id);
                }
            }).catch((err) => {
                setLoading(false);
                if (err.response) {
                    warmings(err.response.data);
                }
                setSucess("");
            })
    }

    function patch(e) {
        e.preventDefault();
        setError("");
        setErrorName("");
        setErrorCategory("");
        setErrorPrice("");
        setErrorDescription("");
        setErrorInventory("");

        api.patch(`/products/${id}`, {
            name: name,
            category: category,
            inventory: inventory,
            price: parseFloat(price),
            description: description,
            fkSeller: fkSeller
        }).then((res) => {
            if (res.status === 200) {
                window.location.href = '#section-my-products'
                pacthImage(id);
                setName("");
                setCategory("");
                setInvetory("");
                setPrice("");
                setDescription("");
                setFkSeller("");
                document.getElementById("create-btn").style.display = "block";
                document.getElementById("edit-btn").style.display = "none";
                setAcao("Cadastrar produto");
                setSucess("O produto foi atualizado!");
                getAllProducts();
            }
        }).catch((err) => {
            if (err.response) {
                warmings(err.response.data);
            }
            setSucess("");
        })
    }

    function edit(e) {
        e.preventDefault();
        let idProduct = e.target.id;
        setLoading(true);
        api.get(`/products/${idProduct}`)
            .then((res) => {
                setLoading(false);
                if (res.status === 200) {
                    window.location.href = '#section-products-edit';
                    setAcao("Editar produto");
                    setId(res.data.id);
                    setName(res.data.name);
                    setCategory(res.data.category);
                    setInvetory(res.data.inventory);
                    setPrice(res.data.price);
                    setDescription(res.data.description);
                    setFkSeller(res.data.fkSeller);
                    document.getElementById("create-btn").style.display = "none";
                    document.getElementById("edit-btn").style.display = "block";
                    setSucess("");
                    getAllProducts();
                }
            }).catch((err) => {
                setLoading(false);
                if (err.response) {
                    warmings(err.response.data);
                }
                setSucess("");
            })
    }

    function undoRequest(e) {
        api.post(`/products/undo`)
            .then((res) => {
                if (res.status === 200) {
                    getAllProducts();
                    setSucess("A ação foi desfeita!");
                }
            }).catch((err) => {
                console.log();
            })
    }

    function redoRequest(e) {
        api.post(`/products/redo`)
            .then((res) => {
                if (res.status === 200) {
                    getAllProducts();
                    setSucess("A ação foi refeita!");
                }
            }).catch((err) => {
                console.log();
            })
    }

    function removeModal(e) {
        window.location.href = '#top';
        let productId = e.target.id;
        setModalIdProduct(productId);
        setIsModalChoiceVisible(true);
    }

    function remove() {
        let productId = modalIdProduct;
        api.delete(`/products/${productId}`)
            .then((res) => {
                if (res.status === 200) {
                    getAllProducts();
                    setSucess("O produto foi removido!");
                    setIsModalChoiceVisible(false);
                    window.location.reload();
                }
            }).catch((err) => {
            })
    }

    function getAllProducts() {
        api.get(`/products/all/${user.id}`)
            .then((res) => {
                if (res.status === 200) {
                    setProducts(res.data);
                    setDefaultMessage("");
                } else if (res.status === 204) {
                    setProducts([]);
                    setDefaultMessage("Não há nenhum produto cadastrado.")
                }
            }).catch((err) => {
            })
    }

    function getSearchName(e) {
        e.preventDefault();
        if (searchName) {
            api.get(`/products/name/${searchName}/${user.id}`)
                .then((res) => {
                    if (res.status === 200) {
                        setProducts(res.data);
                        setDefaultMessage("")
                        setSucess("");
                    } else if (res.status === 204) {
                        setProducts([]);
                        setDefaultMessage(`Nenhum resultado encontrado para "${searchName}"`)
                    }
                    setSearchName("");
                }).catch((err) => {
                })
        } else {
            getAllProducts();
        }
    }

    function cadastroRedi(e) {
        e.preventDefault();
        setAcao("Cadastrar produtos");
        setName("")
        setCategory("")
        setInvetory("")
        setPrice("")
        setDescription("")
        setFkSeller("")
        setSucess("")
        document.getElementById("create-btn").style.display = "block";
        document.getElementById("edit-btn").style.display = "none";
        window.location.href = '#section-products-edit'
    }

    function getSearchCategory(e) {
        let category = e.target.value;
        if (category === "Todos") {
            api.get(`/products/all/${user.id}`)
                .then((res) => {
                    if (res.status === 200) {
                        setProducts(res.data)
                        setSucess("");
                        setDefaultMessage("");
                    } else if (res.status === 204) {
                        setProducts([])
                        setDefaultMessage("Não há nenhum produto cadastrado.")
                    }
                }).catch((err) => {
                })
        } else {
            api.get(`/products/tag/${category}/${user.id}`)
                .then((res) => {
                    if (res.status === 200) {
                        setProducts(res.data)
                        setSucess("");
                        setDefaultMessage("");
                    } else if (res.status === 204) {
                        setProducts([]);
                        setDefaultMessage("Sua busca não teve resultados.");
                    }
                }).catch((err) => {
                })
        }

    }

    function sendTxtFile() {

        var file = document.getElementById('file')

        let form = new FormData();
        form.append("txt", file.files[0])

        api.patch(`products/importTxt/${user.id}`, form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    setModalTitle("Importação de Arquivo")
                    setModalMessage(res.data);
                    window.location.href = '#top';
                    setIsModalMessageVisible(true)
                }
            }).catch((err) => {
            })
    }

    function exportTxt(fileName, idSeller) {
        api.post(`products/exportTxt/${fileName}/${idSeller}`)
            .then((res) => {
                if (res.status === 200) {
                    setModalTitle("Exportação de arquivo");
                    setModalMessage("Arquivo txt exportado com sucesso!");
                } else if (res.status === 204) {
                    setModalTitle("Exportação de arquivo");
                    setModalMessage("Não foi possível exportar o arquivo txt!\nVendedor sem produtos cadastrados.");
                }
                window.location.href = '#top';
                setIsModalMessageVisible(true)
            }).catch((err) => {
            })

        if (document.querySelector('.export-active') !== null) {
            document.querySelector('.export-active').classList.remove('export-active');
        }
        document.getElementById('txt').classList.add('export-active');
    }

    function exportCsv(fileName, idSeller) {
        api.post(`products/exportCsv/${fileName}/${idSeller}`)
            .then((res) => {
                if (res.status === 200) {
                    setModalTitle("Exportação de arquivo");
                    setModalMessage("Arquivo csv exportado com sucesso!");
                } else if (res.status === 204) {
                    setModalTitle("Exportação de arquivo");
                    setModalMessage("Não foi possível exportar o arquivo csv!\nVendedor sem produtos cadastrados.");
                }
                window.location.href = '#top';
                setIsModalMessageVisible(true)
            }).catch((err) => {
            })

        if (document.querySelector('.export-active') !== null) {
            document.querySelector('.export-active').classList.remove('export-active');
        }
        document.getElementById('csv').classList.add('export-active');
    }

    return (
        <>
            <Navbar id="top" />
            <div className="page-container">
                <UserGreeting username={user.nameUser} isSeller={user.isSeller} />
            </div>

            <div className="line-up">
                <Title title="Comercial" />
            </div>

            <div className="page-container">
                <div className="container-menus-and-products">
                    <div className="section-menus align-column">
                        <AccountMenu isSeller={user.isSeller} />
                        <SellerMenu isSeller={user.isSeller} />
                    </div>

                    <div id="section-my-products" className="section-products">
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
                                            <option value="Todos">-- Categoria -- </option>
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
                                        <button onClick={cadastroRedi} className="all-product" >Cadastrar</button>
                                    </div>

                                </div>
                                <div className="product-options-export-and-import">
                                    <div className="product-option" >
                                        <label htmlFor="">Importar produtos</label>

                                        <label class="file">
                                            <button className="btn-send" onClick={() => { sendTxtFile() }}>Enviar</button>
                                            <span class="file-custom"></span>
                                            <input type="file" id="file" aria-label="File browser example" />
                                        </label>

                                        <a className="a-download" href={file} target="_blank" download>Baixar documento de layout</a>
                                    </div>

                                    <div className="product-option" >
                                        <label htmlFor="">Exportar produtos</label>
                                        <section className="line-up">
                                            <button id="txt" className="btn-export left export-active" onClick={() => { exportTxt("meus-produtos", user.id) }} >TXT</button>
                                            <button id="csv" className="btn-export right" onClick={() => { exportCsv("meus-produtos", user.id) }}>CSV</button>
                                        </section>
                                    </div>

                                </div>

                            </div>
                            <div className="commands">
                                <button onClick={undoRequest}><img src={undo} /></button>
                                <button onClick={redoRequest}><img src={redo} /></button>
                            </div>
                            {sucess && <p className="sucess">{sucess}</p>}
                            <div className="products-table-header" id="section-products">
                                <label htmlFor="">Nome do produto</label>
                                <label htmlFor="">Categoria</label>
                                <label htmlFor="">Qtd. estoque</label>
                            </div>
                            <div className="products-table-body">
                                {products.map(product => (
                                    <ProductTableRow id={product.id} name={product.name} category={product.category} inventory={product.inventory} edit={edit} removeModal={removeModal} pro={product} />
                                ))}
                                <div className='defaultMessage card-products'>{defaultMessage}</div>
                            </div>
                        </div>

                        <div id="section-products-edit" className="section-products-edit">
                            <div className="container-products">
                                <SectionTitle text={acao} />

                                <div className="product-edit-camp">
                                    <label>Nome</label>
                                    <input id="name_product" onChange={e => setName(e.target.value)} value={name} className="input" type="text" placeholder="Ex. Sorvete de banana" />
                                    {errorName && <p className="error">{errorName}</p>}
                                </div>

                                <div className="line-up width-100">
                                    <div className="product-edit-camp">
                                        <label htmlFor="">Categoria</label>
                                        <select name="" onChange={e => setCategory(e.target.value)} value={category} id="category">
                                            <option value="">Selecione uma categoria</option>
                                            <option value="Acessórios">Acessórios</option>
                                            <option value="Alimentos">Alimentos</option>
                                            <option value="Cosméticos">Cosméticos</option>
                                            <option value="Saúde">Saúde</option>
                                            <option value="Vestimenta">Vestimenta</option>
                                            <i class="fas fa-arrow-down"></i>
                                        </select>
                                        {errorCategory && <p className="error">{errorCategory}</p>}
                                    </div>
                                </div>

                                <div className="line-up width-100">
                                    <div className="product-edit-camp margin-right-50">
                                        <label htmlFor="">Preço</label>
                                        <input id="price" onChange={e => setPrice(e.target.value.replace(/[^0-9,]/g, ''))} value={price} className="input" type="text" placeholder="R$" />
                                        {errorPrice && <p className="error">{errorPrice}</p>}
                                    </div>

                                    <div className="product-edit-camp">
                                        <label htmlFor="">Qtd. estoque</label>
                                        <input id="inventory" onChange={e => setInvetory(e.target.value.replace(/[^0-9]/g, ''))} value={inventory} className="input" type="text" placeholder="100" />
                                        {errorInventory && <p className="error">{errorInventory}</p>}
                                    </div>
                                </div>

                                <div className="line-up width-100 margin-top-20">
                                    <DragDropUpload dragId="dragId-1" setImage={setImageUrl1} />
                                    <DragDropUpload dragId="dragId-2" setImage={setImageUrl2} />
                                    <DragDropUpload dragId="dragId-3" setImage={setImageUrl3} />
                                </div>

                                <div className="product-edit-camp">
                                    <label htmlFor="">Descrição</label>
                                    <textarea name="" id="description" onChange={e => setDescription(e.target.value)} value={description} cols="30" rows="10"></textarea>
                                    {errorDescription && <p className="error">{errorDescription}</p>}
                                </div>

                                <div className="align-column margin-top-20 margin-bottom-25">
                                    <button id="create-btn" className="create-product-btn" onClick={createProduct}>Cadastrar</button>
                                    <button id="edit-btn" className="edit-product-btn" onClick={patch}>Salvar</button>
                                    {loading && <img className="loading-gif" src={Loading} alt="loading..." />}
                                </div>
                                {error && <p>{error}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="margin-top-25">
                <Footer />
            </div>

            {
                isModalChoiceVisible ?
                    <ModalChoice
                        onClose={() => setIsModalChoiceVisible(false)}
                        height={document.body.scrollHeight}
                        title="Confirmação"
                        message="Você tem certeza que deseja excluir esse produto?"
                        remove={remove}
                    />
                    : null
            }
            {
                isModalMessageVisible ?
                    <ModalMessage
                        onClose={() => setIsModalMessageVisible(false)}
                        height={document.body.scrollHeight}
                        title={modalTitle}
                        message={modalMessage}
                        function={() => window.location.reload()}
                    />
                    : null
            }
        </>

    );
}