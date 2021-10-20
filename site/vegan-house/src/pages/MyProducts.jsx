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
import '../styles/myProducts.css';
import { createProduct, getProductByName, getProducts } from '../scripts/crud-product';
import { getUser, user_logged} from '../scripts/crud-user';
import { ProductTableRow } from '../components/ProductTableRow';
getProducts();
    getUser();
    console.log(user_logged);
export function MyProducts() {
    return (
        <>
            <Navbar isLogged={true} />
            <div className="page-container">
                <UserGreeting username={user_logged.nameUser} isSeller={true}/>
            </div>

            <div className="line-up">
                <Title title="Comercial" />
            </div>

            <div className="page-container">
                <div className="container-menus-and-products">
                    <div className="section-menus align-column">
                        <AccountMenu isSeller={true} />
                        <SellerMenu />
                    </div>

                    <div className="section-products">
                        <div className="container-products">
                            <SectionTitle text="Meus produtos" />

                            <div className="container-product-options">
                                <div className="product-option" >
                                    <label htmlFor="">Buscar produto</label>

                                    <section className="search-bar line-up">
                                        <input id="name_search" className="input" placeholder="Buscar" type="text" />
                                        <button ><i className="fas fa-search"></i></button>
                                    </section>
                                </div>

                                <div className="product-option" >
                                    <label htmlFor="">Ordenar por</label>
                                    <select name="" id="state">
                                        <option value="">-- Categoria -- </option>
                                        <option value="">Alimentos</option>
                                        <option value="">Vestimentas</option>
                                        <i class="fas fa-arrow-down"></i>
                                    </select>
                                </div>

                                <div className="product-option" >
                                    <label htmlFor="">Ordenar por</label>
                                    <select name="" id="state">
                                        <option value="">-- Subcategoria -- </option>
                                        <option value="">Sobremesas</option>
                                        <option value="">Calçados</option>
                                        <i class="fas fa-arrow-down"></i>
                                    </select>
                                </div>

                                <div className="product-option" >
                                    <label htmlFor="">Exibir todos</label>
                                    <a href="#" className="all-product" >Exibir</a>
                                </div>

                            </div>

                            <div className="products-table-header">
                                <label htmlFor="">Nome do produto</label>
                                <label htmlFor="">Categoria</label>
                                <label htmlFor="">Subcategoria</label>
                                <label htmlFor="">Qtd. estoque</label>
                            </div>

                            <div className="products-table-body">
                                <ProductTableRow />
                            </div>
                        </div>

                        <div className="section-products-edit">
                            <div className="container-products">
                                <SectionTitle text="Cadastrar produtos" />

                                <div className="product-edit-camp">
                                    <label>Nome</label>
                                    <input id="name_product" className="input" type="text" placeholder="Ex. Sorverte de banana" />
                                </div>

                                <div className="line-up width-100">
                                    <div className="product-edit-camp margin-right-50">
                                        <label htmlFor="">Categoria</label>
                                        <select name="" id="category">
                                            <option value="alimentos">Alimentos</option>
                                            <option value="medicamentos">Medicamentos</option>
                                            <option value="vestimentas">Vestimentas</option>
                                            <i class="fas fa-arrow-down"></i>
                                        </select>
                                    </div>
                                    <div className="product-edit-camp">
                                        <label htmlFor="">Subcategoria</label>
                                        <select name="" id="sub_category">
                                            <option value="sobremesas">Sobremesas</option>
                                            <option value="calçados">Calçados</option>
                                            <option value="blusas">Blusas</option>
                                            <i class="fas fa-arrow-down"></i>
                                        </select>
                                    </div>
                                </div>

                                <div className="line-up width-100">
                                    <div className="product-edit-camp margin-right-50">
                                        <label htmlFor="">Preço</label>
                                        <input id="price" className="input" type="text" placeholder="R$" />
                                    </div>

                                    <div className="product-edit-camp">
                                        <label htmlFor="">Qtd. estoque</label>
                                        <input id="inventory" className="input" type="text" placeholder="100" />
                                    </div>
                                </div>

                                <div className="line-up width-100 margin-top-20">
                                    <DragDropUpload dragId="dragId-1" />
                                    <DragDropUpload dragId="dragId-2" />
                                    <DragDropUpload dragId="dragId-3" />
                                </div>

                                <div className="product-edit-camp">
                                    <label htmlFor="">Descrição</label>
                                    <textarea name="" id="description" cols="30" rows="10"></textarea>
                                </div>

                                <div className="align-column margin-top-20 margin-bottom-25">
                                    <button className="create-product-btn" onClick={createProduct}>Cadastrar</button>
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