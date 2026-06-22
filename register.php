<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$username = $data['username'] ?? '';
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

if (!$username || !$email || !$password) {
    die(json_encode([
        "success" => false,
        "message" => "Eksik veri gönderildi"
    ]));
}

$password = password_hash($password, PASSWORD_DEFAULT);

$stmt = $db->prepare("
    INSERT INTO users (username, email, password)
    VALUES (?, ?, ?)
");

$stmt->execute([$username, $email, $password]);

echo json_encode([
    "success" => true,
    "message" => "Kayıt başarılı"
]);
?>