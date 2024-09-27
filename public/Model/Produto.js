const Sequelize = require("sequelize") ; 
const connection = require("../database/database") ;

const Produto = connection.define("produtos", {
    
    nome: { // Criando o campo nome ; 
        type: Sequelize.STRING, // Definindo o tipo como String ; 
        allowNull: false // Definindo que não será permitido valores nulos ; 
    }, 
    quantidade: { // Criando o campo quantidade ; 
        type: Sequelize.INTEGER, // Definindo o tipo como inteiro ; 
        allowNull: false // Definindo que não será permitido valores nulos ; 
    }, 
    preco: { // Criando o campo preço ; 
        type: Sequelize.FLOAT, // Definindo o tipo como float ; 
        allowNull: false // Definindo que não será permitido valores nulos ; 
    },
    desconto: { // Criando o campo desconto ; 
        type: Sequelize.FLOAT, // Definindo o tipo como float ; 
        defaultValue: 0, // Valor padrão a ser inserido ; 
    }
})

Produto.sync({force: false}).then(() => {}) ; // Criando a tabela no banco de dados caso ela não exista ; 

module.exports = Produto ; // Exportando o produto ; 