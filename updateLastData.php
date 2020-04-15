<?php

/* gets the data from a URL */
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

if (isset($_GET['update']) && $_GET['update'] == "lastdatajson") {
    // Get new data
    $json = get_data('https://cdn.fmi.fi/legacy-fmi-fi-content/products/magnetic-disturbance-observation-graphs/serve-data.php');
    //write to json file
    $fp = fopen('lastData.json', 'w');
    fwrite($fp, $json);
    fclose($fp);
} else {
    echo "Missing parameter";
}



?>
