<?php
class Pelicula
{

    private $conn;
    public $nombre;
    public $img;

    public function __construct($db)
    {
        $this->conn = $db;
    }
    function addMovie()
    {

        $query = "INSERT
            INTO
                pelicula
            SET
                nombre = :nombre,
                img = :img
            ";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':nombre', $this->nombre);
        $stmt->bindParam(':img', $this->img);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    function showMovie()
    {

        $query = "SELECT
                 *
            FROM
                pelicula
            WHERE
                idPelicula = ?
            ";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->idPelicula);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row != null) {
            $this->idPelicula = $row['idPelicula'];
            $this->nombre = $row['nombre'];
            $this->img = $row['img'];
        } else {
            $this->idPelicula = "not found";
        }
    }

    function checkExistence()
    {

        $query = "SELECT
                 *
            FROM
                pelicula
            WHERE
                nombre = ?
            ";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->nombre);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row != null) {
            $this->idPelicula = $row['idPelicula'];
            $this->nombre = $row['nombre'];
            $this->img = $row['img'];
        } else {
            $this->nombre = "not found";
        }
    }

    function allMovies()
    {

        $query = "SELECT
                 *
            FROM
                pelicula
            ";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $row = $stmt->fetchAll(PDO::FETCH_CLASS);

        // $this->idPelicula = $row['idPelicula'];
        return $row;
    }

}