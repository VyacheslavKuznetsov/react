import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-green/theme.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Auth from "./components/Auth";
import Lk from "./components/Lk";

function App() {
  return (
    <div className="card">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Auth} exact />
          <Route path="/auth" component={Auth} />
          <Route path="/lk" component={Lk} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
