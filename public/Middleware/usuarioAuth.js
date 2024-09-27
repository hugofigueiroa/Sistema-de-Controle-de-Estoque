function verificarAutenticacao(req, res, next) {
    if (req.session.userId) {
        next(); // Caso o usuário esteja autenticado, prosseguir para a próxima rota ;
    } else {
        res.redirect("/"); // Redireciona para a página de login se não estiver autenticado ; 
    }
}

module.exports = verificarAutenticacao ; // Exportando a função ;