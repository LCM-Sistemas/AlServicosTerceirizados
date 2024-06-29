<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $profession = $_POST['profession'];
    $experience = $_POST['experience'];
    $privacyPolicy = isset($_POST['privacyPolicy']) ? 'Aceito' : 'Não aceito';

    // Verifica se o arquivo foi enviado sem erros
    if (isset($_FILES['resume']) && $_FILES['resume']['error'] == UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['resume']['tmp_name'];
        $fileName = $_FILES['resume']['name'];
        $fileSize = $_FILES['resume']['size'];
        $fileType = $_FILES['resume']['type'];
        $fileNameCmps = explode(".", $fileName);
        $fileExtension = strtolower(end($fileNameCmps));

        $newFileName = md5(time() . $fileName) . '.' . $fileExtension;
        $uploadFileDir = './uploaded_resumes/';
        $dest_path = $uploadFileDir . $newFileName;

        if (!file_exists($uploadFileDir)) {
            mkdir($uploadFileDir, 0777, true);
        }

        if (move_uploaded_file($fileTmpPath, $dest_path)) {
            $fileUploaded = true;
        } else {
            $fileUploaded = false;
        }
    } else {
        $fileUploaded = false;
    }

    // Prepara o email
    $to = 'alservicosterceirizados@gmail.com, allanlacerda@alservicosterceirizados.com.br';
    $subject = 'Cadastro de Currículo';
    $boundary = md5(time());

    // Cabeçalhos do email
    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"" . $boundary . "\"\r\n";

    // Corpo do email
    $message = "--" . $boundary . "\r\n";
    $message .= "Content-Type: text/html; charset=UTF-8\r\n";
    $message .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $message .= "
    <html>
    <head>
        <title>Cadastro de Currículo</title>
    </head>
    <body>
        <h2>Detalhes do Cadastro</h2>
        <p><strong>Nome:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Telefone:</strong> $phone</p>
        <p><strong>Profissão:</strong> $profession</p>
        <p><strong>Experiência:</strong> $experience</p>
        <p><strong>Política de Privacidade:</strong> $privacyPolicy</p>
    </body>
    </html>\r\n";

    // Inclui o anexo no email
    if ($fileUploaded) {
        $file = $dest_path;
        $content = chunk_split(base64_encode(file_get_contents($file)));

        $message .= "--" . $boundary . "\r\n";
        $message .= "Content-Type: application/octet-stream; name=\"" . $fileName . "\"\r\n";
        $message .= "Content-Transfer-Encoding: base64\r\n";
        $message .= "Content-Disposition: attachment; filename=\"" . $fileName . "\"\r\n\r\n";
        $message .= $content . "\r\n";
    }

    $message .= "--" . $boundary . "--";

    // Envia o email
    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Erro ao enviar o email.']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Método de requisição inválido.']);
}
?>