const Sequelize = require("sequelize"); // Importando a biblioteca sequelize
const connection = require("../database/database"); // Importando a conexão com o banco de dados
const bcrypt = require('bcrypt'); // Importando a biblioteca "bcrypt" ; 

const Administrador = connection.define("administradores", { // Criando a tabela no banco de dados ;
    nome: { // Campo nome ; 
        type: Sequelize.STRING, // Definindo o tipo como String ; 
        allowNull: false // Não permitindo valores null ; 
    },
    email: { // Campo e-mail ;
        type: Sequelize.STRING, // Definindo o tipo como String ;
        allowNull: false // Não permitindo valores null ;
    },
    senha: { // Campo senha ;
        type: Sequelize.STRING, // Definindo o tipo como String ;
        allowNull: false // Não permitindo valores null ;
    },
    funcao: { // Campo função ; 
        type: Sequelize.STRING, // Definindo o tipo como String ;
        allowNull: false // Não permitindo valores null ;
    }
});

Administrador.sync({ force: false }).then(() => {

    // Verificando se já existe o administrador padrão cadastrado no sistema

    Administrador.findOne({ where: { email: "administradorpadrao@gmail.com"}})
        .then(async administrador => {
            if (!administrador) {
                // Criando e salvando o administrador padrão com senha criptografada
                const salt = await bcrypt.genSalt(10); // Gerando salt ;
                const hash = await bcrypt.hash("administradorpadrao", salt); // Hash da senha ; 

                await Administrador.create({
                    nome: "Administrador",
                    email: "administradorpadrao@gmail.com",
                    senha: hash, // Usando a senha hash ; 
                    funcao: "Administrador"
                });
            }
        });
});

module.exports = Administrador; // Exportando o Administrador ; 
