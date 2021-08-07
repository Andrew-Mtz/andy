import React, { useState } from 'react';
import axios from 'axios';
import './Global.css';


function AddPelicula() {

  const [inputValues, setInputValues] = useState({
    nombre: '', img: ''
  });

  const [pelicula, setPelicula] = useState({
    nombre: '', img: '' 
  });

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState('');
  const [showPeli, setShowPeli] = useState('none');

  const handleOnChange = event => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const getPeliculas = async (nombre, img) => {
    try {
        const response = await axios.post( 'http://localhost/dw/andy/backend/endpoint/addMovie.php' , {
          nombre: nombre,
          img: img
        })
        if (response.data.message === "Movie already exists.") {
          setMessage("Esta pelicula ya existe.");
          setLoading("");
          setShowPeli("none");
        } else if (response.data.message === "Could not add movie." ) {
          setMessage("No se pudo agregar la pelicula.");
          setLoading("");
          setShowPeli("none");
        } else {
          setMessage("Pelicula agregada correctamente.");
          setLoading("");
            setPelicula(prevState => ({
              ...prevState,
              nombre: nombre,
              img: img
            }));
          setShowPeli("block");
        };
        console.log(nombre, img)
      } catch (err) {
        console.error('fallo axios', err);
        setError('Hubo un error al traer las peliculas');
        setLoading("");
        setShowPeli("none");
      }
    };

  const handleOnClick = (event) => {
    event.preventDefault();
    setLoading("Cargando...");
    getPeliculas(inputValues.nombre, inputValues.img);
  }
  
  return (
    <div>
      <form id="form-add">
        <p id="add-message"></p>
        <div className="sec-input">
          <label id="lbl-nombre" htmlFor="nombre">Agregue la pelicula que desea</label>
          <input id="input-nombre" type="text" name="nombre" onChange={handleOnChange} value={inputValues.nombre} />
          <label id="lbl-img" htmlFor="img">Agregue una url para la imagen</label>
          <input id="input-img" type="text" name="img" onChange={handleOnChange} value={inputValues.img}   />
        </div>
        <p id="message">{message}</p>
        <p id="add-loading">{loading}</p>
        <button className="btn-form" onClick={handleOnClick}>Agregar</button>
      </form>
      <div style={{ display: showPeli }}>
          <div className="container-peli">
              <div className="container-nombre">
                  <p id="pelicula-nombre">{pelicula.nombre}</p>
              </div>
              <div className="container-img">
                  <img alt={pelicula.nombre} id="img-pelicula" src={pelicula.img}/>
              </div>
          </div>
      </div>
    </div>
  );
}

export default AddPelicula;