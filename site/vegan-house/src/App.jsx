import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from './pages/Home';
import { Login } from './pages/Login';
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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
