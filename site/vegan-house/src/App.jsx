import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { MyProducts } from "./pages/MyProducts";
import { ProductPage } from "./pages/ProductPage";
import { Register } from "./pages/Register";
import { RegisterSeller } from "./pages/RegisterSeller";



// import { NewRoom } from "./pages/NewRoom";

function App() {
  return (

    <BrowserRouter>
      <Switch>
        <Route path="/home" component={Home}/>
        <Route path="/cadastro" component={Register} />
        <Route path="/perfil/cadastro-seller" component={RegisterSeller} />
        <Route path="/login" component={Login} />
        <Route path="/productPage" component={ProductPage}/>
        <Route path="/myProducts" component={MyProducts}/>
        {/* /todos os resultados/{props.categoria}/{props.subcategoria}/{props.nomeDoProduto} */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
