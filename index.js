const express = require("express") ; // Importando a biblioteca express ; 
const app = express() ; // Atribuindo a variável "app" uma instência de Express ; 
const bodyParser = require("body-parser") ; // Importando a biblioteca "body-parser" ; 
const connection = require("./public/database/database") ; // Importando a conexão com o banco de dados ; 

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// SESSION ; 
const session = require("express-session"); // Importando a biblioteca "express-session" ;
const cookieParser = require("cookie-parser"); // Importando a biblioteca "cookie-parser" ; 

app.use(cookieParser()); // Usando o cookie parser ;

app.use(session({
    secret: 'senha_cookie',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false ,
        maxAge: 24 * 60 * 60 * 1000 // Tempo que a sessão ficara disponível ; 
    } 
}));

// ROUTERS ; 
const produtoRouter = require("./public/Router/ProdutoRouter") ; // Importando o router de produtos ; 
const administradorRouter = require("./public/Router/AdministradorRouter") ; // Importando o router de administradores ; 
const clienteRouter = require("./public/Router/ClienteRouter") ; // Importando o router de clientes ; 

// VIEW ENGINE ; 
app.set("view engine", "ejs") ;

// STATIC ; 
app.use(express.static("public")) ; 

// BODY PARSER ; 
app.use(bodyParser.urlencoded({extended:false})) ; 
app.use(bodyParser.json()) ;

app.use("/", produtoRouter) ; // Utilizando o controller de produtos ; 
app.use("/", administradorRouter) ; // Utilizando o controller de administrador ; 
app.use("/", clienteRouter) ; // Utilizando o controller de cliente ; 


// DATABASE ; 
connection.authenticate().then(() => console.log("Conexão com o banco de dados realizada")).catch((error) => console.log(error)) ; 

// ROTAS ; 

// CRIANDO ROTA DE CONTATO ; 

app.get("/api/contato", (req, res) => {
    res.render("contato") ; // Renderizando a página de contato ; 
})

// CRIANDO O SERVIDOR ; 
app.listen(8080, () => {console.log("Servidor rodando na porta: localhost:8080")})