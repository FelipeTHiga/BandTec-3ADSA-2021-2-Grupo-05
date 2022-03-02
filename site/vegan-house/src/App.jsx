import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from './pages/Home';
import { Register } from "./pages/Register";
import { Login } from './pages/Login';
import { UserProfile } from "./pages/UserProfile";
import { UserAdress } from "./pages/UserAdress";
import { MyOrders } from "./pages/MyOrders";
import { RegisterSeller } from "./pages/RegisterSeller";
import { SellerProfile } from "./pages/SellerProfile";
import { MyProducts } from "./pages/MyProducts";
import { MySales } from "./pages/MySales";
import { Catalog } from "./pages/Catalog";
import { ProductPage } from "./pages/ProductPage";
import { ShoppingCart } from "./pages/ShoppingCart";
import { Checkout } from "./pages/Checkout";
import { PaymentResponse } from "./pages/PaymentResponse";
import { PageNotFound } from './pages/PageNotFound';

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/cadastro" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/perfil/dados-pessoais" exact component={UserProfile} />
        <Route path="/perfil/endereco" exact component={UserAdress} />
        <Route path="/perfil/meus-pedidos" exact component={MyOrders} />
        <Route path="/perfil/cadastro-seller" exact component={RegisterSeller} />
        <Route path="/perfil/seller" exact component={SellerProfile} />
        <Route path="/perfil/meus-produtos" exact component={MyProducts} />
        <Route path="/perfil/minhas-vendas" exact component={MySales} />
        <Route path="/todos-os-resultados/" exact component={Catalog}/>
        <Route path="/todos-os-resultados/:categoryUrl" exact component={Catalog} />
        <Route path="/todos-os-resultados/:category/:id/:fkSeller" exact component={ProductPage} />
        <Route path="/carrinho" exact component={ShoppingCart} />
        <Route path="/checkout" exact component={Checkout} />
        <Route path="/payment-response/:id/:status/:desc" exact component={PaymentResponse} />
        <Route path="*" exact component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
