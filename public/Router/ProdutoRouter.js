const express = require('express'); // Importando a biblioteca "Express" ; 
const router = express.Router(); ;; // Atribuindo a variável router uma instância de Express ; 
const produtoController = require("../Controller/ProdutoController") ; // Imporando o controller de produtos ; 
const Produto = require("../Model/Produto") ; // Importando o model de produtos ; 
const usuarioAuth = require("../Middleware/usuarioAuth") ; // Importando a função que verificará se o usuário está autenticado ; 


router.get("/api/registrarprodutos", usuarioAuth, (req, res) => {res.render("adicionarProduto")}) ; // Rota para exibir a página de adicionar produto ;

router.get("/api/registrarDesconto",usuarioAuth, async (req, res) => { // Rota para exibir a página de adicionar desconto a um produto ; 
    try {
        const produtos = await Produto.findAll({raw: true}) ; // Selecionando tods os produtos no banco de dados ;
        res.render("adicionarDesconto", {produtos}) // Renderizando a página de adicionar desconto e enviando os produtos cadastrados no banco de dados ;
    }
    catch (error) {
        console.error("Erro ao carregar os produtos:", error); // Caso ocorra um erro será exibido no console ; 
    }
})
 
router.get("/api/produtos", usuarioAuth, produtoController.listarProdutos); // Rota para exibir os produtos que estão cadastrados ; 
router.delete("/api/produtos/:id", usuarioAuth, produtoController.deletarProduto) ; // Rota para remover um produto ;
router.post("/api/produtos", usuarioAuth, produtoController.criarProduto) ; // Rota para adicionar produto ; 
router.put("/api/incrementarproduto", usuarioAuth, produtoController.incrementarProduto) ; // Rota para incrementar um produto ; 
router.put("/api/decrementarproduto", usuarioAuth, produtoController.decrementarProduto) ; // Rota para decrementar um produto ; 
router.post("/api/atualizardesconto", usuarioAuth, produtoController.adicionarDesconto) ; // Rota para atualizar o desconto do produto ;

module.exports = router ; // Exportando os routers ; 