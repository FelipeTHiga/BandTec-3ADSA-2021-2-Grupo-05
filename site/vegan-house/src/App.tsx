import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Login } from './pages/Login';

import { Register } from "./pages/Register";


// import { NewRoom } from "./pages/NewRoom";

function App() {
  return (

    <BrowserRouter>
      <Switch>
        <Route path="/cadastro" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
