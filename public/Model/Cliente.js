const Sequelize = require("sequelize"); // Importando a biblioteca sequelize;
const connection = require("../database/database"); // Importando a conexão com o banco de dados;

const Cliente = connection.define("clientes", { // Criando a tabela no banco de dados;
    nome: { // Criando o campo nome;
        type: Sequelize.STRING, // Definindo o tipo como String;
        allowNull: false // Definindo que não será permitido valores nulos;
    },
    email: { // Criando o campo email;
        type: Sequelize.STRING, // Definindo o tipo como string;
        allowNull: false // Definindo que não será permitido valores nulos;
    },
    dataRegistro: { // Criando o campo data registro;
        type: Sequelize.DATE, // Definindo o tipo como Date;
        allowNull: false // Definindo que não será permitido valores nulos;
    }
});

Cliente.sync({ force: true }).then(() => { // Criando a tabela no banco de dados;
    return Promise.all([ // Salvando clientes fictícios no banco de dados após a criação da tabela para teste;
        Cliente.create({
            nome: "Hugo Bezerra Figueiroa",
            email: "hugo@gmail.com",
            dataRegistro: "2005-09-05"
        }),
        Cliente.create({
            nome: "Sergio Magno Castor Pinheiro",
            email: "sergio@gmail.com",
            dataRegistro: "2000-01-01"
        }),
        Cliente.create({
            nome: "Kleiton da Silva Ferreira",
            email: "kleiton@gmail.com",
            dataRegistro: "2005-08-28"
        })
    ]);
}).catch(error => {
    console.error("Erro ao criar a tabela ou inserir dados:", error);
});

module.exports = Cliente; // Exportando o Cliente ;  
