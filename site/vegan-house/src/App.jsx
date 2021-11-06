import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { MyProducts } from "./pages/MyProducts";
import { Register } from "./pages/Register";
import { RegisterSeller } from "./pages/RegisterSeller";
import { ProductPage } from "./pages/ProductPage";
import { ShoppingCart } from "./pages/ShoppingCart";
import { Catalog } from "./pages/Catalog";
import  { PerfilSeller }  from "./pages/PerfilSeller";


// import { NewRoom } from "./pages/NewRoom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Home}/>
        <Route path="/cadastro" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/perfil/cadastro-seller" component={RegisterSeller} />
        <Route path="/perfil/meus-produtos" component={MyProducts} />
        <Route path="/carrinho" component={ShoppingCart} />
        <Route path="/perfil/seller" component={PerfilSeller} />
        <Route path="/todos-os-resultados/" exact={true} component={Catalog}/>
        <Route path="/todos-os-resultados/..." component={ProductPage} />
           {/* /todos os resultados/{props.categoria}/{props.subcategoria}/{props.nomeDoProduto} */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
