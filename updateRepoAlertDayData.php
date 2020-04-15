<?php

$servername = "localhost";
$username = "USER_NAME";
$password = "PASSWORD";
$dbname = "DATABASE_NAME";

$is_ok = TRUE;

// Gets the data from a URL
function get_data($url) {
	$ch = curl_init();
	$timeout = 5;
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
	$data = curl_exec($ch);
	curl_close($ch);
	return $data;
}

// Function to add text into log file
function addIntoLog($txt) {
    $myfile = fopen("repoAlertLogFile.txt", "a") or die("Unable to open file!");
    fwrite($myfile, $txt);
    fclose($myfile);
}

// New data
$json = get_data('https://cdn.fmi.fi/legacy-fmi-fi-content/products/magnetic-disturbance-observation-graphs/serve-data.php');

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    // Set timezone and echo date & time
    date_default_timezone_set("Europe/Helsinki");
    $timeStr = date("H:i:s - d.m.Y");
    echo "Date & Time (Helsinki): " . $timeStr . "<br>";
    if ($is_ok === TRUE && date("H") == "0") {
        // The MySQL commad
        $sql = "INSERT INTO dayData(data) VALUES(" . json_encode($json) . ")";
        // Check result
        if ($conn->query($sql) === TRUE) {
            echo "Successfully added:<br><br>$json";
            // Write into log file
            addIntoLog($timeStr . " - Inserted" . "\n");
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
            // Write into log file
            addIntoLog($timeStr . " - Error: " . $conn->error . "\n");
        }
    } else { 
        echo "No data inserted"; 
        // Write into log file
        addIntoLog($timeStr . " - Not inserted" . "\n");
    }
}

// Close MySQL connection
$conn->close();

?>
