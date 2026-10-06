<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH");
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

// Multi-tier external credential lookup (so updates & zip extracts never overwrite the user's password)
if (empty($db_pass)) {
    // 1. Check db_pass.txt in same directory
    if (file_exists(__DIR__ . "/db_pass.txt")) {
        $candidate = trim(file_get_contents(__DIR__ . "/db_pass.txt"));
        if (!empty($candidate)) {
            $db_pass = $candidate;
        }
    }
    // 2. Check config.local.php
    if (empty($db_pass) && file_exists(__DIR__ . "/config.local.php")) {
        @include __DIR__ . "/config.local.php";
    }
    // 3. Check .env in current or parent directories
    if (empty($db_pass)) {
        $envPaths = [__DIR__ . "/.env", __DIR__ . "/../.env", __DIR__ . "/../../.env"];
        foreach ($envPaths as $ep) {
            if (file_exists($ep)) {
                $lines = @file($ep, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
                if (is_array($lines)) {
                    foreach ($lines as $line) {
                        $line = trim($line);
                        if (strpos($line, '#') === 0) continue;
                        if (preg_match('/^(?:DB_PASS|DATABASE_PASSWORD|DB_PASSWORD)\s*=\s*["\']?(.*?)["\']?$/i', $line, $match)) {
                            $db_pass = trim($match[1]);
                            break 2;
                        }
                    }
                }
            }
        }
    }
}

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
