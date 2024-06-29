<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtém os dados do formulário
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $telefone = $_POST['telefone'];
    $whatsapp = $_POST['whatsapp'];
    $servico = $_POST['servico'];
    $outro = $_POST['outro'];
    $carga_horaria = $_POST['carga_horaria'];
    $escalas = $_POST['escalas'];
    $remuneracao = $_POST['remuneracao'];
    $beneficios = $_POST['beneficios'];
    $observacoes = $_POST['observacoes'];

    // Prepara o email
    $to = 'alservicosterceirizados@gmail.com, allanlacerda@alservicosterceirizados.com.br';
    $subject = 'Simulação de Proposta';
    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    $message = "
    <html>
    <head>
        <title>Simulação de Proposta</title>
    </head>
    <body>
        <h2>Detalhes da Proposta</h2>
        <p><strong>Nome:</strong> $nome</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Telefone:</strong> $telefone</p>
        <p><strong>WhatsApp:</strong> $whatsapp</p>
        <p><strong>Serviço:</strong> $servico</p>
        <p><strong>Outro:</strong> $outro</p>
        <p><strong>Carga Horária:</strong> $carga_horaria</p>
        <p><strong>Escalas:</strong> $escalas</p>
        <p><strong>Remuneração:</strong> $remuneracao</p>
        <p><strong>Benefícios:</strong> $beneficios</p>
        <p><strong>Observações:</strong> $observacoes</p>
    </body>
    </html>";

    // Envia o email
    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Erro ao enviar o email.']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Método de requisição inválido.']);
}
