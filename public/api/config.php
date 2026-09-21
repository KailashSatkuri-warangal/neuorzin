<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

$db_host = getenv("DB_HOST") ?: (getenv("DATABASE_HOST") ?: "localhost");
$db_name = getenv("DB_NAME") ?: (getenv("DATABASE_NAME") ?: "u884653330_crm");
$db_user = getenv("DB_USER") ?: (getenv("DATABASE_USER") ?: "u884653330_admin");
$db_pass = getenv("DB_PASS") ?: (getenv("DATABASE_PASSWORD") ?: "");

$pdo = null;
$db_error = null;

try {
    $dsn = "mysql:host={$db_host};dbname={$db_name};charset=utf8mb4";
    $pdo = new PDO($dsn, $db_user, $db_pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false
    ]);
} catch (PDOException $e) {
    $db_error = $e->getMessage();
}

function get_json_input() {
    $raw = file_get_contents("php://input");
    return json_decode($raw, true) ?: [];
}

function send_json($data, $code = 200) {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit();
}
