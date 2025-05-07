<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'config.php'; // Import the secret key

// Allow requests from your website only
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Output the API key as JSON
echo json_encode(["key" => $api_key]);
?>