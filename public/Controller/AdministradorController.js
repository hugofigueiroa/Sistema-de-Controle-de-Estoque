const Administrador = require("../Model/Administrador") ; // Importando o model de Administradores ; 
const bcrypt = require("bcryptjs") ; // Importando a biblioteca "bcryptjs" ;

// LISTANDO OS ADMINISTRADORES NO BANCO DE DADOS ; 
exports.listarAdministradores = async (req, res) => {
    try {
        let errorMessage = undefined ; // Mensagem de erro (caso necessite) ; 
        const administradores = await Administrador.findAll({ raw: true }); // Selecionando todos os administradores no banco de dados ; 
        res.render("administrador", {administradores, errorMessage}); // Renderizando a página de administradores e enviando os administradores no banco, e a mensagem de erro ; 
    } catch (error) {
        res.status(500).send("Erro ao listar produtos.");
    }
};

// ADICIONANDO ADMINISTRADOR NO BANCO DE DADOS ; 
exports.adicionarAdministrador = async (req, res) => {
    try {
        let errorMessage = undefined ; // Mensagem de erro (caso necessite) ; 

        let nome = req.body.nomeAdministrador ; // Atribuindo o nome do administrador a variável ; 
        let email = req.body.emailAdministrador ; // Atribuindo o email do administrador a variável ; 
        let senha = req.body.senhaAdministrador ; // Atribuindo a senha do administrador a variável ; 
        let funcao = req.body.funcaoAdministrador ; // Atribuindo a função do administrador a variável ; 

        const administradorExistente = await Administrador.findOne({where: {email: email}}) // Verificando se já existe algum usuário com o e-mail cadastrado ; 

        if(administradorExistente) { // Caso o administrador exista ; 
            const administradores = await Administrador.findAll({ raw: true }); // Selecionando todos os administradores para renderizar na página de administradores ; 
            return res.render("administrador", { administradores,
                errorMessage: "E-mail já cadastrado", // Enviando a mensagem de erro informando que o e-mail já existe ; 
            })
        } 

        let salt = bcrypt.genSaltSync(10) ; // Controla a complexidade do hashing ;
        let hash = bcrypt.hashSync(senha, salt); // Cria um hash seguro da senha ; 

        await Administrador.create({ // Insere o administrador no banco de dados ; 
            nome: nome,
            email: email, 
            senha: hash, 
            funcao: funcao
        })
        
        res.redirect("/api/administradores") ; // Após inserir retorna para a página de administradores ;
          
    } catch (erro) { 
        res.redirect("/api/administradores"); // Em caso de erro redireciona para a página de administradores ;  
    }
}

// EXCLUINDO ADMINISTRADOR DO BANCO DE DADOS ; 

exports.deletarAdministrador = async (req, res) => {
    try {
        let idRemocao = req.params.id ; // Recuperando o ID do administrador e atribui a variável ; 

        const administradorDeletado = await Administrador.destroy({ // Deletando o administrador no banco de dados e atribuindo o resultado a variável ;
            where: {
                id: idRemocao
            }
        })
    
        if(administradorDeletado === 0) { // Verificando se o administrador foi deletado ; 
            return res.status(404).send("Administrador não encontrado."); // Caso não seja removido, será lançado um erro de código 404 ; 
        }
    
        res.redirect("/api/administradores"); // Redireciona para a página de administradores após a exclusão ;
    } catch(error) {
        console.log("Erro ao remover administrador", error)
    }
}

// EDITANDO ADMINISTRADOR NO BANCO DE DADOS ; 

exports.atualizarAdministrador = async (req, res) => {
    try {
        let id = req.params.id; // Recuperando o ID do administrador ; 
        let nome = req.body.nome; // Recuperando o nome do administrador ;
        let email = req.body.email; // Recuperando o e-mail do administrador ;
        let funcao = req.body.funcao; // Recuperando a função do administrador ;

        const administrador = await Administrador.findOne({ where: { id: id } }); // Verificar se existe um administrador com o ID informado ; 

        if (!administrador) {
            return res.status(404).send("Administrador não encontrado."); // Caso o administrador não seja encontrado será lançado um erro 404 ; 
        }

        const administradorExistente = await Administrador.findOne({ where: { email: email } }); // Verificando se já existe um usuário com o e-mail informado ; 

        if (administradorExistente && administradorExistente.id !== id) { // Se um administrador com o e-mail já existe, mas não é o mesmo que está para ser atualizado;
            const administradores = await Administrador.findAll({ raw: true }); // Selecionando todos os administradores cadastrados no banco de dados ; 
            return res.render("administrador", { // Renderizando a página de administrador com os administradores e a mensagem de erro ;  
                administradores,
                errorMessage: "E-mail já cadastrado"
            });
        }

        await Administrador.update({ // Atualizando o administrador ; 
            nome: nome,
            email: email,
            funcao: funcao
        }, {
            where: {
                id: id 
            }
        });

        res.redirect("/api/administradores"); // Redirecionar após a atualização ; 
    } catch (error) {
        res.status(500).send("Erro ao atualizar administrador."); // Caso ocorra algum erro ao atualizar será lançado um erro 500 ; 
    }
};