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
    
    // The MySQL command
    $sql = "SELECT `date` FROM `dayData`";
    // Execute the command & save results
    $result = $conn->query($sql);
    // an Array to save the result objects
    $theArray = array();
    // Save result objects into result array
    while($row = mysqli_fetch_assoc($result)) {
        $theArray[] = $row;
    }
    // Return the array in JSON format
    echo json_encode($theArray);
    // Echo the errors if any
    if ($result === FALSE) {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
// Close MySQL connection
$conn->close();

?>





