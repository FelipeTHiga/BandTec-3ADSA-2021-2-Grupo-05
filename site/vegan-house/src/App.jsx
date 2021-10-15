import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from "./pages/Register";
import { RegisterSeller } from "./pages/RegisterSeller";
import { MyProducts } from "./pages/MyProducts";
import { ShoppingCart } from "./pages/ShoppingCart";


// import { NewRoom } from "./pages/NewRoom";

function App() {
  return (

    <BrowserRouter>
      <Switch>
        <Route path="/home" component={Home}/>
        <Route path="/cadastro" component={Register} />
        <Route path="/perfil/cadastro-seller" component={RegisterSeller} />
        <Route path="/login" component={Login} />
        <Route path="/perfil/meus-produtos" component={MyProducts} />
        <Route path="/carrinho" component={ShoppingCart} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
