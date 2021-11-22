import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { MyProducts } from "./pages/MyProducts";
import { Register } from "./pages/Register";
import { RegisterSeller } from "./pages/RegisterSeller";
import { ProductPage } from "./pages/ProductPage";
import { ShoppingCart } from "./pages/ShoppingCart";
import { UserProfile } from "./pages/UserProfile";
import { UserAdress } from "./pages/UserAdress";
import { Catalog } from "./pages/Catalog";
import { PerfilSeller } from "./pages/PerfilSeller";
import { MyOrders } from "./pages/MyOrders";
import { MySales } from "./pages/MySales";


// import { NewRoom } from "./pages/NewRoom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/cadastro" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/perfil/cadastro-seller" component={RegisterSeller} />
        <Route path="/perfil/dados-pessoais" component={UserProfile} />
        <Route path="/perfil/endereco" component={UserAdress} />
        <Route path="/perfil/seller" component={PerfilSeller} />
        <Route path="/perfil/meus-pedidos" component={MyOrders} />
        <Route path="/perfil/meus-produtos" component={MyProducts} />
        <Route path="/todos-os-resultados/:categoryUrl" exact={true} component={Catalog} />
        <Route path="/todos-os-resultados/:category/:id" exact={true} component={ProductPage} />
        <Route path="/produto" component={ProductPage} />
        <Route path="/carrinho" component={ShoppingCart} />
        <Route path="/perfil/minhas-vendas" component={MySales} />
        {/* na url colocar um parametro :id*/}
        {/* /todos os resultados/{props.categoria}/{props.subcategoria}/{props.nomeDoProduto} */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
