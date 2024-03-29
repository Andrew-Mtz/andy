import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Global.css';


function ShowPelis() {

  const [peliculas, setPeliculas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
      const getPeliculas = async () => {
          try {
              const response = await axios.post('http://localhost/dw/andy/backend/endpoint/allMovies.php')
              if (response.data.message === "Peliculas is empty.") {
                  setPeliculas("No se encontro ninguna pelicula");
              }else{
                  console.log(response.data.map((pelicula) => (
                      pelicula
                    )))
                  setPeliculas(response.data);
              };
            } catch (err) {
              console.error('fallo axios', err);
              setError('Hubo un error al traer las peliculas');
            }
          };
      getPeliculas();
    }, []);
  
  return (
    <div>
      <div className="container-pelis">
          {peliculas.map((pelicula) => (
            <div className="container-peli">
                <div className="container-nombre">
                    <p id="pelicula-nombre">{pelicula.nombre}</p>
                </div>
                <div className="container-img">
                    <img alt={pelicula.nombre} id="img-pelicula" src={pelicula.img}/>
                </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ShowPelis;
