import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import About from "./components/About";
import Main from "./components/Main";
import "primereact/resources/themes/saga-green/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css"

function App() {
  return (
    <div className="card">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Main} exact />
          <Route path="/main" component={Main} />
          <Route path="/about" component={About} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
