const express = require('express'); // Importando a biblioteca "Express" ; 
const router = express.Router(); // Atribuindo uma instância do Express a variável ; 
const administradorController = require("../Controller/AdministradorController") ; // Importando o controller do administrador ; 
const usuarioAuth = require("../Middleware/usuarioAuth") ; // Importando a função para verificar se o usuário está autenticado ;
const Administrador = require("../Model/Administrador") // Importando o model de Administrador ; 
const bcrypt = require('bcrypt'); // Importando o "bcrypt" ; 

// Rota de login ; 
router.get("/", (req, res) => {
    if(req.session.userId) { // Caso o usuário já esteja autenticado será redirecionado para a página de home do Sistema ; 
        return res.redirect("/api/produtos") // Redirecionando para a página de "Home" ; 
    }
    res.render("index") ; // Renderizando a página de login ; 
})

// Rota de validação do login ; 

router.post("/", async (req, res) => { 
    let email = req.body.email; // Atribuindo o e-mail a variável ; 
    let senha = req.body.senha; // Atribuindo a senha a variável ; 

    try {
        
        const administrador = await Administrador.findOne({ where: { email: email } }); // Buscando o usuário pelo email ; 

        
        if (administrador) { // Verificando se o administrador existe ; 
            if (email === "administradorpadrao@gmail.com") { // Verificando se o email é do administrador padrão ;
                const senhaValida = await bcrypt.compare(senha, administrador.senha); // Comparando a senha fornecida pelo usuário com a senha hash cadastrada ; 
                if (senhaValida) { // Caso a senha seja válida ; 
                    req.session.userId = administrador.id; // Atribuindo a sessão o ID do usuário ; 
                    res.redirect("/api/produtos"); // Redirecionando para a rota principal após o login ; 
                } else { // Caso a senha seja inválida ; 
                    res.redirect("/"); // Redirecionando para a página de login ;  
                }
            } else { // Caso o administrador não seja o "Padrão" .  
                const senhaValida = await bcrypt.compare(senha, administrador.senha); // Comparando a senha informada com a senha cadastrada e criptografada no banco de dados ; 
                if (senhaValida) { // Caso a senha seja válida ; 
                    req.session.userId = administrador.id; // Atribuindo a sessão o ID do usuário ; 
                    res.redirect("/api/produtos"); // Redireciona para a rota principal após o login ; 
                } else { // Caso a senha seja inválida ; 
                    res.redirect("/"); // Redirecionando para a página de login ; 
                }
            }
        } else { // Caso o e-mail não seja encontrado ; 
            res.redirect("/"); // Redirecionando para a página de login ; 
        }
    } catch (erro) {
        res.status(500).send("Erro ao realizar o login."); // Caso ocorra um erro será enviado um código 500 ; 
    }
});

router.get("/logout", (req, res) => {
    req.session.destroy((err) => { // Destruindo a sessão ; 
        if(err) { // Caso ocorra um erro ao destruir a sessão ; 
            return res.status(500).send("Erro ao fazer logout."); // Em caso de erro será lançado um código 500 ; 
        }
        res.redirect("/") ; // Redirecionando para a página de Login ; 
    })
})

router.get("/api/administradores",usuarioAuth,  administradorController.listarAdministradores) ;
router.post("/api/administradores",usuarioAuth, administradorController.adicionarAdministrador);
router.delete("/api/administradores/:id",usuarioAuth, administradorController.deletarAdministrador) ; 
router.put("/api/administradores/:id",usuarioAuth, administradorController.atualizarAdministrador) ; 

module.exports = router ; // Exportando o router ; 