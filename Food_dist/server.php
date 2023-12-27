<?php
// Щоб php приймав JSON:
$_POST = json_decode(file_get_contents("php://input"), true);

echo var_dump($_POST); 
// Бере дані які прийшли з клієна, перетворює їх в рядок і потім показує їх на клієнті
// Це той самий respons