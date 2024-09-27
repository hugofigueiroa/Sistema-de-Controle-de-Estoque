const Cliente = require("../Model/Cliente"); // Importando o model de Clientes

// LISTANDO OS CLIENTES NO BANCO DE DADOS

exports.listarClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll({ raw: true }); // Selecionando todos os clientes cadastrados no banco de dados ; 
        res.render("cliente", { clientes }); // Renderizando a página de clientes e enviando os clientes cadastrados no banco de dados ;  
    } catch (error) {
        res.status(500).send("Erro ao listar clientes."); // Caso ocorra algum erro ao listar os clientes, será lançado um erro 500 ; 
    }
};
