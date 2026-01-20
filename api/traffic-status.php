<?php
// Tell browser this is a JSON response
header("Content-Type: application/json");

// Get POST data safely
$location = isset($_POST['location']) ? trim($_POST['location']) : '';
$time = isset($_POST['time']) ? trim($_POST['time']) : '';

// Default response
$response = [
    "status" => "",
    "reason" => "",
    "suggestion" => ""
];

// Validation
if ($location === "" || $time === "") {
    $response["reason"] = "Please select both location and time.";
    echo json_encode($response);
    exit;
}

// Traffic logic
if (
    ($time === "Morning" || $time === "Evening") &&
    in_array($location, ["MG Road", "Brigade Road", "Whitefield"])
) {
    $response["status"] = "Heavy Traffic";
    $response["reason"] = "Peak hour rush and high vehicle density.";
    $response["suggestion"] = "Avoid travel now. Prefer Metro or try later.";
}
elseif ($time === "Afternoon") {
    $response["status"] = "Moderate Traffic";
    $response["reason"] = "Normal traffic with occasional congestion.";
    $response["suggestion"] = "You can travel but expect small delays.";
}
else {
    $response["status"] = "Free Flow";
    $response["reason"] = "Low traffic volume at this time.";
    $response["suggestion"] = "Good time to travel.";
}

// Send JSON response
echo json_encode($response);