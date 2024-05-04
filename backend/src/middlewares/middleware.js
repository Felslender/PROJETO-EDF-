const connection = require('../Models/connection');
const jwt = require('jsonwebtoken');

 
const validatePassword = (req, res,next) => {
    try {
        const {senha , confirmarSenha} = req.body;

        if (senha !== confirmarSenha) {
            return res.status(422).json({msg: 'As senhas não conferem!'})
        }

        next();
    } catch (error) {
        return res.status(500).json({ status: 10});
    }
    
};

const validateCPF = async(req, res, next) => {

    try{
        const {cpf} = req.body;

        const queryCPF = 'SELECT * FROM (SELECT cpf FROM Alunos UNION SELECT cpf FROM Facilitador UNION SELECT cpf FROM Criancas) AS Login_Senha WHERE cpf = ?';

        const [findCPF] = await connection.execute(queryCPF, [cpf])

        
        if(findCPF.length == 1) {
            return res.status(401).json({msg: "CPF ja cadastrado!", status: 14});
        }
        next();
    }catch (error) {
        return res.status(500).json({ status: 10});
    }
};




const validateEmail = async(req, res, next) => {
    
    try{
        const {email} = req.body;
        
        const queryEmail = 'SELECT * FROM (SELECT senha, email, id, idCargo FROM Alunos UNION SELECT senha, email, id, idCargo FROM Facilitador UNION SELECT senha, email, id, idCargo FROM Admins) AS Login_Senha WHERE email = ?';

        const [findEmail] = await connection.execute(queryEmail, [email])
        if(findEmail.length == 1) {
            return res.status(401).json({msg: "Email ja cadastrado! utilize outro email", status: 13});
        }

        next();
    } catch (error) {
        return res.status(500).json({ status: 10});
    }
};


const validateLogin = (req, res, error, next) => {

    if (error) {
        return res.status(500).json({ status: 10});
      } 

    next();
};


const verifyToken = (req, res, next) => {
    try{
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token == null) return res.sendStatus(401);

        jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        })
    } catch (error) {
        return res.status(500).json({ status: 10});
    };
    
}


const AlunoRole = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET);
        const role = decodedToken.role;

        if (role == 3) {
            next();                
        } else {
            return res.status(401).json({ message: 'Você não tem permissão para realizar esta ação!' });
        }
    } catch (error) {
        return res.status(500).json({ status: 10 });
    }
}

const verifyTurma = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const turmaId = req.query.idTurma;

        if (!userId || !turmaId) {
            return res.status(400).json({ erro: "ID do usuário ou ID da turma não encontrado." });
        }

        const query = 'SELECT * FROM Aluno_turma WHERE idAluno = ? AND idTurma = ?;';

        const [turmasDoAluno] = await connection.execute(query, [userId, turmaId]);

        if (!turmasDoAluno || turmasDoAluno.length === 0) {
            return res.status(403).json({ erro: "Você não tem permissão para acessar esta turma." });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: "Erro interno do servidor" });
    }
};








module.exports = {
validatePassword,
validateLogin,
verifyToken,
validateEmail,
AlunoRole,
validateCPF,
verifyTurma,
};
