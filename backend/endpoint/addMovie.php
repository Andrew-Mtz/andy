<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
error_reporting(0); 
include_once '../db/database.php';
include_once '../objects/pelicula.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../phpMailer/Exception.php';
require '../phpMailer/PHPMailer.php';
require '../phpMailer/SMTP.php';

$database = new Database();
$db = $database->getConnection();
$pelicula = new Pelicula($db);
$data = json_decode(file_get_contents("php://input"));

if ($data->nombre == null) {
    http_response_code(200);
    echo json_encode(array("message" => "No value for 'nombre' was provided"));
} else if ($data->img == null) {
    http_response_code(200);
    echo json_encode(array("message" => "No value for 'img' was provided"));
} else {
    $pelicula->nombre = $data->nombre;
    $pelicula->checkExistence();
    if ($pelicula->idPelicula == null) {
        $pelicula->nombre = $data->nombre;
        $pelicula->img = $data->img;
        if ($pelicula->addMovie()) {
            http_response_code(200);
            echo json_encode(array("message" => "Movie was added successfully."));

            $mail = new PHPMailer(true);
            try {
                //Server settings
                $mail->SMTPDebug = 0;                      //Enable verbose debug output
                $mail->isSMTP();                                            //Send using SMTP
                $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
                $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
                $mail->Username   = 'pruebacorreophp3@gmail.com';                     //SMTP username
                $mail->Password   = 'pruebacorreo123';                               //SMTP password
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;         //Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
                $mail->Port       = 465;                                    //TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

                //Recipients
                $mail->setFrom('pruebacorreophp3@gmail.com', 'Andrew, Lautaro, Natasha');
                $mail->addAddress('rodrigoalbano@anima.edu.uy', "Rodrigo Albano");     

                $mail->isHTML(true);                                  
                $mail->Subject = 'Info pelicula';
                $mail->Body    .=  "Pelicula: ";
                $mail->Body    .=  $pelicula->nombre;
                $mail->Body    .= " | ";
                $mail->Body    .=  "Imagen: ";
                $mail->Body    .=  $pelicula->img;

                $mail->send();
                http_response_code(200);
                echo json_encode(array("message" => "Correo was send successfully."));

            } catch (Exception $e) {
                echo "Ha ocurrido un error.", $mail->ErrorInfo;
            }
        } else {
            http_response_code(200);
            echo json_encode(array("message" => "Could not add movie."));
        };
    } else {
        http_response_code(200);
        echo json_encode(array("message" => "Movie already exists."));
    }
}