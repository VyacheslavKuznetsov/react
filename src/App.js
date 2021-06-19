import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import About from './components/About';
import Main from './components/Main';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Main} exact />
        <Route path="/main" component={Main} />
        <Route path="/about" component={About} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
