<?php
require 'db.php';
$data = json_decode(file_get_contents('php://input'), true);
$stmt = $db->prepare("SELECT * FROM users WHERE username = ?");
$stmt->execute([$data['username']]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($data['password'], $user['password'])) {
    echo json_encode(["user" => $user['username'], "role" => $user['role']]);
} else {
    http_response_code(400);
    echo json_encode(["message" => "Giriş bilgileri hatalı."]);
}
?>