import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { MyProducts } from "./pages/MyProducts";
import { Register } from "./pages/Register";
import { RegisterSeller } from "./pages/RegisterSeller";
import { getProducts } from "./scripts/crud-product";
import { ProductPage } from "./pages/ProductPage";
import { ShoppingCart } from "./pages/ShoppingCart";
import { Catalog } from "./pages/Catalog";


// import { NewRoom } from "./pages/NewRoom";

function App() {
  return (

    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Home}/>
        <Route path="/cadastro" component={Register} />
        <Route path="/perfil/cadastro-seller" component={RegisterSeller} />
        <Route path="/login" component={Login} />
        {/* /todos os resultados/{props.categoria}/{props.subcategoria}/{props.nomeDoProduto} */}
        <Route path="/perfil/meus-produtos" component={MyProducts} /> 
        <Route path="/carrinho" component={ShoppingCart} />
        <Route path="/produto" component={ProductPage} />
        <Route path="/catalogo" component={Catalog} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
