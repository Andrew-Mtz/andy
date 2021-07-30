import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import ShowPelis from './showPelis';
import SearchPelicula from './searchPelicula';
import AddPelicula from './addPelicula';
import './Global.css';

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/agregar">Agregar</Link>
          </li>
          <li>
            <Link to="/buscar">Buscar</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/agregar">
            <Agregar />
          </Route>
          <Route path="/buscar">
            <Buscar />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <ShowPelis />;
}

function Agregar() {
  return <AddPelicula />;
}

function Buscar() {
  return <SearchPelicula />;
}