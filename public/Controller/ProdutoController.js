const Produto = require("../Model/Produto") ; // Importando o model de Produtos ; 

// LISTANDO OS PRODUTOS DO BANCO DE DADOS ; 

exports.listarProdutos = async (req, res) => {
    try {
        const produtos = await Produto.findAll({ raw: true }); // Selecionando todos os produtos cadastrados no banco de dados ; 
        res.render("home", { produtos }); // Renderizando a página de home com os produtos cadastrados ; 
    } catch (error) {
        res.status(500).send("Erro ao listar produtos."); // Caso ocorra um erro ao listar os produtos será lançado um erro 500 ; 
    }
};

// CRIANDO PRODUTO DO BANCO DE DADOS ; 

exports.criarProduto = async (req, res) => {
    try {
        let nomeProduto = req.body.nomeProduto; // Recuperando o nome do produto e atribuindo a variável ; 
        let quantidadeProduto = req.body.quantidadeProduto; // Recuperando a quantidade do produto e atribuindo a variável ; 
        let precoProduto = req.body.precoProduto; // Recuperando o preço do produto e atribuindo a variável ; 

        if (quantidadeProduto < 0 || isNaN(precoProduto) || precoProduto <= 0) { // Validando os dados informados pelo usuário ; 
            return res.redirect("/api/registrarproduto"); // Caso o usuário tenha digitado algum valor inválido, será redirecionado para a página de adicionar produto ; 
        }

        await Produto.create({ // Criando o produto no banco de dados; 
            nome: nomeProduto,
            quantidade: quantidadeProduto,
            preco: precoProduto,
            desconto: 0
        });

        res.redirect("/api/produtos"); // Após inserir o produto no banco, será redirecionado para a página de listar os produtos ; 
    } catch (error) {
        res.status(500).send("Erro ao adicionar produto"); // Caso ocorra um erro ao adicionar o produto, será lançado um código 500 ; 
    }
};

// DELETAR PRODUTO NO BANCO DE DADOS ; 

exports.deletarProduto = async (req, res) => {
    try {
        let idProduto = req.params.id; // Recuperando o ID do produto e atribuindo a variável ;
        const produtoDeletado = await Produto.destroy({ // Deletando o produto no banco de dados e atribuindo a variável para verificar se foi excluído ; 
            where: {
                id: idProduto
            }
        });

         
        if (produtoDeletado === 0) { // Se a variável for igual a 0, significa que nenhum produto foi encontrado e deletado ; 
            return res.status(404).send("Produto não encontrado."); // Será lançado um erro 404 ; 
        }

        res.redirect("/api/produtos"); // Redireciona para a página de exibição de produtos após a exclusão ;
    } catch (error) {
        res.status(500).send("Erro ao remover produto"); // Caso ocorra um erro ao remover, será lançado um erro 500 ; 
    }
};

// INCREMENTAR PRODUTO NO BANCO DE DADOS ; 

exports.incrementarProduto = async (req, res) => {
    try {
        let idProduto = req.body.id ; // Recuperando o ID do produto a ser incrementado ; 
        let quantidade = req.body.quantidade ; // Recuperando a quantidade do produto que será incrementado ; 
        
        if(quantidade <= 0) { // Verificando se a quantidade é negativa ou igual a 0 ; 
            return res.redirect("/api/produtos") ; // Caso o valor seja inválido será redirecionado para a página de exibição de produtos ;
        }
    
        const produto = await Produto.findByPk(idProduto) ; // Recuperando o produto no banco de dados pelo ID ; 

        if(!produto) { // Verificando se o produto existe ;
            return res.status(404).send("Produto não encontrado"); // Caso o produto não exista será lançado um código 404 ; 
        }

        produto.quantidade += quantidade ; // Incrementando a quantidade ; 
        await produto.save() ; // Salvando a alteração no banco de dados ; 
        res.redirect("/api/produtos"); // Redirecionando para a página de exibição de produtos ; 
    }
    catch (erro) {
        res.status(500).send("Erro ao incrementar produto"); // Caso ocorra algum erro será lançado um código 500 ; 
    }
}

// DECREMENTAR PRODUTO NO BANCO DE DADOS ; 

exports.decrementarProduto = async (req, res) => {
    try {
        let idProduto = req.body.id ; // Recuperando o ID do produto a ser decrementado ; 
        let quantidade = req.body.quantidade ; // Recuperando a quantidade do produto a ser decrementada ; 

        if(quantidade <= 0) { // Verificando se a quantidade é negativa ou igual a 0 ; 
            return res.redirect("/api/produtos") ; // Caso o valor seja inválido será redirecionado para a página de exibição de produtos ;
        }

        const produto = await Produto.findByPk(idProduto) ; // Recuperando o produto no banco de dados pelo ID ; 

        if(!produto) { // Verificando se o produto existe ;
            return res.status(404).send("Produto não encontrado"); // Caso o produto não exista será lançado um código 404 ; 
        }

        if(produto.quantidade - quantidade < 0) { // Impedindo que o estoque fique negativo ; 
            return res.redirect("/api/produtos") ; // Redirecionando para a página de exibição de produtos ;
        }

        produto.quantidade -= quantidade ; // Decrementando a quantidade ; 
        await produto.save() ; // Salvando a alteração no banco de dados ; 
        res.redirect("/api/produtos"); // Redirecionando para a página de exibição de produtos ; 
    }
    catch (erro) {
        res.status(500).send("Erro ao decrementar produto"); // Caso ocorra algum erro será lançado o código 500 ; 
    }
}

// ADICIONAR DESCONTO AO PRODUTO NO BANCO DE DADOS ; 

exports.adicionarDesconto = async (req, res) => {
    try {

        let idProduto = req.body.idProduto ; // Recuperando o ID do produto ; 
        let desconto = req.body.descontoProduto ; // Recuperando o valor do desconto do produto ; 

        const produto = await Produto.findByPk(idProduto) ; // Recuperando o produto no banco de dados pelo ID ; 

        if(!produto) { // Verificando se o produto existe ;
            return res.status(404).send("Produto não encontrado") ; // Caso o produto não exista será lançado um erro 404 ; 
        }

        produto.desconto = desconto ; // Aplicando o desconto ao produto ; 
        await produto.save() ; // Salvando a alteração no banco de dados ; 
        res.redirect("/api/produtos") ; // Redirecionando para a página de exibição de produtos ; 
    }
    catch (erro) {
        res.status(500).send("Erro ao aplicar desconto do produto"); // Caso ocorra um erro será lançado um código 500 ; 
    }
}