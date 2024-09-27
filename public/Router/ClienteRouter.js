const express = require('express'); // Importando a biblioteca "Express" ; 
const router = express.Router(); // Atribuindo a variável router uma instância de Express ; 
const clienteController = require("../Controller/ClienteController"); // Importando o controller de clientes
const usuarioAuth = require("../Middleware/usuarioAuth") ; // Importando a função para verificar se o usuário está autenticado ;

router.get("/api/clientes", usuarioAuth, clienteController.listarClientes); // Rota para exibir a página de clientes

module.exports = router; // Exportando o router ; 
