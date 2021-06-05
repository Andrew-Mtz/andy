var searchLoading = document.getElementById('search-loading');
var searchMessage = document.getElementById('search-message');
var searchMensajeError = document.getElementById('search-message-error');
var inicialMessage = document.getElementById('inicial-message');
var containerBtns = document.getElementById('container-btns');
var divPeli = document.getElementById('img-pelicula');
var namePeli = document.getElementById('pelicula-nombre');

var formSearch = document.getElementById('form-search');
formSearch.addEventListener('submit', function (e) {
    e.preventDefault();
})

let idMovie = ''
let nombre = ""
let img = ""
onChange = () => {
    idMovie = document.getElementById('input-id-peli').value;
    nombre = document.getElementById('input-nombre').value;
    img = document.getElementById('input-img').value;
}

let body = document.getElementById('body')
let divContForm = document.getElementById('container-form')
let menu = document.getElementById('header')

let urlCheck = "http://localhost/progweb/Peliculas/peliculas/backend/endpoint/showMovie.php";
searchMovie = () => {
    searchMessage.style.display = 'none';
    if (idMovie == "") {
        searchMensajeError.innerHTML = "Ingrese un nombre.";
        searchMensajeError.style.display = 'block';
    } else {
        searchMensajeError.innerHTML = "";
        searchMensajeError.style.display = 'none';
        searchLoading.style.display = 'block';
        axios.post(urlCheck, {
            idPelicula: idMovie
        })
            .then(res => {
                searchMessage.style.display = 'block';
                if (res.data.message == "Pelicula not found.") {
                    searchMessage.innerHTML = "La pelicula que estas buscando no esta disponible.";
                    namePeli.innerHTML = "Not found";
                    divPeli.src = "https://www.actualidadecommerce.com/wp-content/uploads/2019/09/not-found-2384304_1280.jpg";
                    divPeli.style.display = "block"
                    
                } else {
                    searchMessage.innerHTML = 'Resultados de la busqueda "' + idMovie + '"';
                    namePeli.innerHTML = res.data.nombre;
                    divPeli.src = res.data.img;
                    divPeli.style.display = "block"
                }
                console.log(res);
            })
            .catch(function (err) {
                searchMessage.innerText = 'Error de conexión ' + err;
            })
            .then(function () {
                searchLoading.style.display = 'none';
            });
    }
}

var addLoading = document.getElementById('add-loading');
var addMessage = document.getElementById('add-message');
var addMensajeError = document.getElementById('add-message-error');

var formAdd = document.getElementById('form-add');
formAdd.addEventListener('submit', function (e) {
    e.preventDefault();
})

let urlAdd = "http://localhost/progweb/Peliculas/peliculas/backend/endpoint/addMovie.php";
addMovie = () => {
    addMessage.style.display = 'none';
    if (nombre == "" || img == "") {
        addMensajeError.innerHTML = "Llena todos los campos";
        addMensajeError.style.display = 'block';
    } else {
        addMensajeError.innerHTML = "";
        addMensajeError.style.display = 'none';
        addLoading.style.display = 'block';
        axios.post(urlAdd, {
            nombre: nombre,
            img: img
        })
            .then(res => {
                addMessage.style.display = 'block';
                if (res.data.message == "Movie already exists.") {
                    addMessage.innerHTML = "Esta pelicula ya esta agregada.";
                } else if (res.data.message == "Could not add movie.") {
                    addMessage.innerHTML = "Error de conexion con la base de datos.";
                } else {
                    addMessage.innerHTML = "Pelicula agregada correctamente.";
                    namePeli.innerHTML = nombre;
                    divPeli.src = img;
                    divPeli.style.display = "block"
                }
                console.log(res);
            })
            .catch(function (err) {
                addMessage.innerText = 'Error de conexión ' + err;
            })
            .then(function () {
                addLoading.style.display = 'none';
            });
    }
}

var iconLogo1 = document.getElementById('icon-logo-one');
var iconLogo2 = document.getElementById('icon-logo-two');
var iconPlus = document.getElementById('icon-plus');
var iconLupa = document.getElementById('icon-lupa');
var iconArrow = document.getElementById('icon-arrow');

showAdd = () => {
    formAdd.style.display = 'flex'
    formSearch.style.display = 'none'
    iconLogo1.style.display = 'none'
    iconLogo2.style.display = 'none'
    iconLupa.style.display = 'block'
    iconPlus.style.display = 'none'
    iconArrow.style.display = 'block'
    containerBtns.style.display = 'none'
}

showSearch = () => {
    formAdd.style.display = 'none'
    formSearch.style.display = 'flex'
    iconLogo1.style.display = 'none'
    iconLogo2.style.display = 'none'
    iconLupa.style.display = 'none'
    iconPlus.style.display = 'block'
    iconArrow.style.display = 'block'
    containerBtns.style.display = 'none'
}

back = () => {
    formSearch.style.display = 'none'
    formAdd.style.display = 'none'
    iconLogo1.style.display = 'block'
    iconLogo2.style.display = 'block'
    iconLupa.style.display = 'none'
    iconPlus.style.display = 'none'
    iconArrow.style.display = 'none'
    containerBtns.style.display = 'flex'
}

let urlShowAll = "http://localhost/progweb/Peliculas/peliculas/backend/endpoint/allMovies.php";
showAllMovies = () => {
    axios.post(urlShowAll, {})
        .then(res => {
            inicialMessage.style.display = 'block';
            if (res.data.message == "Peliculas is empty.") {
                inicialMessage.innerHTML = "No hay peliculas aun, puede agregar una.";
            } else {
                inicialMessage.innerHTML = "Abajo estan todas las peliculas.";
            }
            console.log(res);
        })
        .catch(function (err) {
            inicialMessage.innerText = 'Error de conexión ' + err;
        })
        .then(function () {
            addLoading.style.display = 'none';
        });
}
