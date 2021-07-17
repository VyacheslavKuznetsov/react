import { createBrowserHistory } from "history";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-green/theme.css";
import React from "react";
import { Route, Router } from "react-router-dom";
import MainLayout from "./components/MainLayout";

export const history = createBrowserHistory();

function App() {
  return (
    <div className="card">
      <Router history={history}>
        <Route path="/" exact>
          <MainLayout url="/auth" />
        </Route>
        <Route path="/auth/">
          <MainLayout url="/auth" />
        </Route>
        <Route path="/reg/">
          <MainLayout url="/reg" />
        </Route>
        <Route path="/issues/">
          <MainLayout url="/issues" />
        </Route>
        <Route path="/comments/">
          <MainLayout url="/comments" />
        </Route>
      </Router>
    </div>
  );
}

export default App;
