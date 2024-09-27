const Sequelize = require("sequelize") ; // Importando a biblioteca "sequelize" ; 

// Estabelecendo o contato com o banco de dados ; 
const connection = new Sequelize("sistemadecontroledeestoque","root", "05092005hb", {
    host: "localhost", 
    dialect: "mysql"
}) ; 

module.exports = connection ; 