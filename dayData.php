<?php

$servername = "localhost";
$username = "USER_NAME";
$password = "PASSWORD";
$dbname = "DATABASE_NAME";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    // Execute if connection is ok:
    // Get the post request body data
    $post = json_decode(file_get_contents('php://input'), true);
    // The MySQL command
    $sql = "SELECT `data` FROM `dayData` WHERE `date` = '" . $post['date'] . "'";
    // Execute the command & save results
    $result = $conn->query($sql);
    // an Array to save the result objects
    $theArray = array();
    // Save result objects into result array
    while($row = mysqli_fetch_assoc($result)) {
        $theArray[] = $row;
    }
    // Return the array in JSON format without main [ & ]
    $jsonReady = json_encode($theArray);
    $jsonReady = substr($jsonReady, 1, -1);
    echo $jsonReady;
    // Echo the errors if any
    if ($result === FALSE) {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
// Close MySQL connection
$conn->close();

?>





