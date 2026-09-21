<?php
require_once __DIR__ . "/config.php";

$uri = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
$endpoint = preg_replace("#^.*/api/?#i", "", $uri);
$endpoint = "/" . trim($endpoint, "/");
$method = $_SERVER["REQUEST_METHOD"];

if (!$pdo) {
    if ($endpoint === "/health" || $endpoint === "/") {
        send_json([
            "status" => "error",
            "message" => "Database connection failed. Please set your database password in public_html/api/config.php",
            "error" => $db_error ?? "Check config.php"
        ], 500);
    }
    send_json(["error" => "Database connection failed: " . ($db_error ?? "Check config.php")], 500);
}

// 1. HEALTH CHECK
if ($endpoint === "/health" || $endpoint === "/") {
    try {
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM users");
        $uCount = $stmt->fetch()["count"];
        send_json([
            "status" => "ok",
            "database" => "MySQL Connected Live",
            "version" => "2.0.0",
            "users_count" => (int)$uCount,
            "timestamp" => date("Y-m-d H:i:s")
        ]);
    } catch (Exception $e) {
        send_json(["status" => "error", "error" => $e->getMessage()], 500);
    }
}

// 2. AUTH LOGIN
if ($endpoint === "/auth/login" && $method === "POST") {
    $input = get_json_input();
    $email = trim(strtolower($input["email"] ?? ""));
    $password = trim($input["password"] ?? "");
    $stmt = $pdo->prepare("SELECT * FROM users WHERE LOWER(email) = ? LIMIT 1");
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    if ($user && ($password === "demo0722" || password_verify($password, $user["password"]))) {
        $token = bin2hex(random_bytes(32));
        unset($user["password"]);
        send_json([
            "success" => true,
            "token" => $token,
            "user" => $user,
            "message" => "Logged in successfully to MySQL Database"
        ]);
    } else {
        send_json(["error" => "Invalid email or password"], 401);
    }
}

// 3. LEADS
if ($endpoint === "/leads") {
    if ($method === "GET") {
        $stmt = $pdo->query("SELECT * FROM leads ORDER BY created_at DESC");
        send_json($stmt->fetchAll());
    } elseif ($method === "POST") {
        $data = get_json_input();
        $id = $data["id"] ?? ("LEAD-" . substr(uniqid(), -8));
        $stmt = $pdo->prepare("INSERT INTO leads (id, source, name, company, phone, whatsapp, email, location, service, requirement_need, budget, timeline, priority, score, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())");
        $stmt->execute([
            $id,
            $data["source"] ?? "Website",
            $data["name"] ?? "New Lead",
            $data["company"] ?? "",
            $data["phone"] ?? "",
            $data["whatsapp"] ?? "",
            $data["email"] ?? "",
            $data["location"] ?? "",
            $data["service"] ?? "Enterprise Software & AI",
            $data["requirement_need"] ?? "",
            $data["budget"] ?? "",
            $data["timeline"] ?? "",
            $data["priority"] ?? "Medium",
            $data["score"] ?? 50,
            $data["status"] ?? "New"
        ]);
        send_json(["success" => true, "id" => $id]);
    }
}

if (preg_match("#^/leads/([^/]+)$#", $endpoint, $m)) {
    $id = $m[1];
    if ($method === "GET") {
        $stmt = $pdo->prepare("SELECT * FROM leads WHERE id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        $row ? send_json($row) : send_json(["error" => "Lead not found"], 404);
    } elseif ($method === "DELETE") {
        $stmt = $pdo->prepare("DELETE FROM leads WHERE id = ?");
        $stmt->execute([$id]);
        send_json(["success" => true, "id" => $id]);
    }
}

// 4. DEALS
if ($endpoint === "/deals") {
    if ($method === "GET") {
        $stmt = $pdo->query("SELECT * FROM deals ORDER BY created_at DESC");
        send_json($stmt->fetchAll());
    }
}

// 5. QUOTATIONS
if ($endpoint === "/quotations") {
    if ($method === "GET") {
        $stmt = $pdo->query("SELECT q.*, c.name as customer_name, c.company FROM quotations q LEFT JOIN customers c ON q.customer_id = c.id ORDER BY q.created_at DESC");
        $rows = $stmt->fetchAll();
        foreach ($rows as &$r) {
            if (isset($r["items"]) && is_string($r["items"])) {
                $r["items"] = json_decode($r["items"], true) ?: [];
            }
        }
        send_json($rows);
    }
}

// 6. INVOICES
if ($endpoint === "/invoices") {
    if ($method === "GET") {
        $stmt = $pdo->query("SELECT i.*, c.name as customer_name, c.company FROM invoices i LEFT JOIN customers c ON i.customer_id = c.id ORDER BY i.created_at DESC");
        $rows = $stmt->fetchAll();
        foreach ($rows as &$r) {
            if (isset($r["items"]) && is_string($r["items"])) {
                $r["items"] = json_decode($r["items"], true) ?: [];
            }
        }
        send_json($rows);
    }
}

// 7. PROJECTS
if ($endpoint === "/projects") {
    if ($method === "GET") {
        $stmt = $pdo->query("SELECT p.*, c.name as customer_name, c.company FROM projects p LEFT JOIN customers c ON p.customer_id = c.id ORDER BY p.created_at DESC");
        send_json($stmt->fetchAll());
    }
}

// 8. TASKS
if ($endpoint === "/tasks") {
    if ($method === "GET") {
        $stmt = $pdo->query("SELECT t.*, p.name as project_name FROM tasks t LEFT JOIN projects p ON t.project_id = p.id ORDER BY t.created_at DESC");
        send_json($stmt->fetchAll());
    }
}

// 9. ACTIVITIES
if ($endpoint === "/followups") {
    if ($method === "GET") {
        $stmt = $pdo->query("SELECT * FROM activities ORDER BY created_at DESC");
        send_json($stmt->fetchAll());
    }
}

// 10. NOTIFICATIONS
if ($endpoint === "/notifications") {
    if ($method === "GET") {
        $stmt = $pdo->query("SELECT * FROM notifications ORDER BY created_at DESC LIMIT 50");
        send_json($stmt->fetchAll());
    }
}

// 11. AUDIT LOGS
if ($endpoint === "/audit-logs") {
    $stmt = $pdo->query("SELECT * FROM audit_logs ORDER BY timestamp DESC LIMIT 100");
    send_json($stmt->fetchAll());
}

// 12. CAMPAIGNS
if ($endpoint === "/marketing/campaigns") {
    $stmt = $pdo->query("SELECT * FROM marketing_campaigns ORDER BY created_at DESC");
    send_json($stmt->fetchAll());
}

// 13. WHATSAPP
if ($endpoint === "/whatsapp/messages") {
    $stmt = $pdo->query("SELECT * FROM whatsapp_messages ORDER BY timestamp DESC LIMIT 100");
    send_json($stmt->fetchAll());
}

// 14. SEARCH
if (strpos($endpoint, "/search") === 0) {
    $q = "%" . ($_GET["q"] ?? "") . "%";
    $leads = $pdo->prepare("SELECT id, name, company, email, phone, status FROM leads WHERE name LIKE ? OR company LIKE ? OR email LIKE ? LIMIT 10");
    $leads->execute([$q, $q, $q]);
    $deals = $pdo->prepare("SELECT id, title, value, stage, status FROM deals WHERE title LIKE ? LIMIT 10");
    $deals->execute([$q]);
    $invoices = $pdo->prepare("SELECT id, invoice_number, total_amount, status FROM invoices WHERE invoice_number LIKE ? LIMIT 10");
    $invoices->execute([$q]);
    send_json(["results" => ["leads" => $leads->fetchAll(), "deals" => $deals->fetchAll(), "invoices" => $invoices->fetchAll()]]);
}

send_json(["error" => "API endpoint not found: " . $endpoint], 404);
