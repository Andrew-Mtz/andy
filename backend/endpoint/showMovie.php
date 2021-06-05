<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
error_reporting(0); 
include_once '../db/database.php';
include_once '../objects/pelicula.php';
  
$database = new Database();
$db = $database->getConnection();
$Pelicula = new Pelicula($db);
$data = json_decode(file_get_contents("php://input"));
$Pelicula->idPelicula = $data->idPelicula;
$Pelicula->showMovie();
  
if($Pelicula->idPelicula!='not found'){
    $pelicula_arr = array(
        "idPelicula" => $Pelicula->idPelicula,
        "nombre" => $Pelicula->nombre,
        "img" => $Pelicula->img,
    );
    http_response_code(200);
    echo json_encode($pelicula_arr);
}
  
else{
    http_response_code(200);
    echo json_encode(array("message" => "Pelicula not found."));
}