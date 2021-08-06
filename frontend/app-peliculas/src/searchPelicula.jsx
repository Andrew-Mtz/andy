import React, { useState } from 'react';
import axios from 'axios';
import './Global.css';


function SearchPelicula() {

  const [inputValues, setInputValues] = useState({
    idPelicula: ''
  });

  const [pelicula, setPelicula] = useState({
    idPelicula: '', nombre: '', img: '' 
  });

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState('');

  const handleOnChange = event => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const getPeliculas = async (idPelicula) => {
    try {
        const response = await axios.post('http://localhost/dw/andy/backend/endpoint/showMovie.php', {
          idPelicula: idPelicula
        })
        if (response.data.message === "Pelicula not found.") {
          setMessage("Pelicula no encontrada.");
          setLoading("");
        } else {
          setMessage('Resultados de la busqueda "' + idPelicula + '"');
          setPelicula(prevState => ({
            ...prevState,
            idPelicula: response.data.idPelicula,
            nombre: response.data.nombre,
            img: response.data.img
          }));
          setLoading("");
        };
      } catch (err) {
        console.error('fallo axios', err);
        setError('Hubo un error al traer las peliculas');
        setLoading("");
      }
    };

  const handleOnClick = (event) => {
    event.preventDefault();
    setLoading("Cargando...");
    getPeliculas(inputValues.idPelicula);
  }
  
  return (
    <div>
      <form id="form-search">
        <p id="search-message"></p>
        <div className="sec-input">
          <label id="lbl-id-peli" htmlFor="idPelicula">Busque su pelicula aquí</label>
          <input id="input-id-peli" type="text" name="idPelicula" onChange={handleOnChange} value={inputValues.idPelicula} />
        </div>
        <p id="message">{message}</p>
        <p id="add-loading">{loading}</p>
        <button className="btn-form" onClick={handleOnClick}>Buscar</button>
      </form>
      <div>
          <div className="container-peli">
              <div className="container-nombre">
                  <p id="pelicula-nombre">{pelicula.nombre}</p>
              </div>
              <div className="container-img">
                  <img alt={pelicula.nombre} id="img-pelicula" src={pelicula.img} />
              </div>
          </div>
      </div>
    </div>
  );
}

export default SearchPelicula;