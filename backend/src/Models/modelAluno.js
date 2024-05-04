const connection = require('./connection');
const bcrypt = require('bcrypt')




class User {
    constructor(nome, nomePreferencia, cpf, celWhatsapp, email, senha, sexo, estadoCivil, modalidade){
        this.nome = nome, 
        this.nomePreferencia = nomePreferencia, 
        this.cpf = cpf, 
        this.celWhatsapp = celWhatsapp, 
        this.email = email, 
        this.senha = senha, 
        this.sexo = sexo, 
        this.estadoCivil = estadoCivil,  
        this.modalidade = modalidade
    }
};

class Crianca {
    constructor(idAluno, idEscola, idTurma, nome, cpf, dataNascimento, sexo, grauParentesco){
        this.idAluno = idAluno,
        this.idEscola = idEscola,
        this.idTurma = idTurma,
        this.nome = nome,
        this.cpf = cpf,
        this.dataNascimento = dataNascimento,
        this.sexo = sexo,
        this.grauParentesco = grauParentesco
    }
};

const createCrianca = async(infCrianca, userId) => {
    const {idAluno, idEscola, idTurma, nome, cpf, dataNascimento, sexo, grauParentesco } = infCrianca;

    const query = "INSERT INTO Criancas(idAluno, idEscola, idTurma, nome, cpf, dataNascimento, sexo, grauParentesco) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";

    const newCrianca = new Crianca(idAluno ,idEscola, idTurma, nome, cpf, dataNascimento, sexo, grauParentesco)

    const [createdCrianca] = await connection.execute(query, [userId, newCrianca.idEscola, newCrianca.idTurma, newCrianca.nome, newCrianca.cpf, newCrianca.dataNascimento, newCrianca.sexo, newCrianca.grauParentesco]);

    return createdCrianca;
};


const createAluno = async(infAluno) => {

        const {nome, nomePreferencia, cpf, celWhatsapp, email, senha, sexo, estadoCivil, modalidade} = infAluno;
        
        const query = 'INSERT INTO Alunos(nome, nomePreferencia, cpf, celWhatsapp, email, senha, sexo, estadoCivil, modalidade, idCargo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 3)'
        
        const newAluno = new Aluno(nome, nomePreferencia, cpf, celWhatsapp, email, senha, sexo, estadoCivil, modalidade)
        
        const salt = await bcrypt.genSalt(12)
        const SenhaHash = await bcrypt.hash(senha,salt)
        
        const [createdAluno] = await connection.execute(query, [newAluno.nome, newAluno.nomePreferencia, newAluno.cpf, newAluno.celWhatsapp, newAluno.email, SenhaHash, newAluno.sexo, newAluno.estadoCivil, newAluno.modalidade])
        
    
        return createdAluno;

    

};


const getAllCriancas = async(userId) => {
    try {
        const query = 'SELECT * FROM Criancas WHERE idAluno = ?'

        const [CriancasAluno] = await connection.execute(query, [userId])
        return CriancasAluno;
    } catch (error) {
        return res.status(500).json({ status: 5});
    }

    
};


const getAllInfoAluno = async(userid)  => {

    
        const query = 'SELECT nome, nomePreferencia, sexo, cpf, estadoCivil, email, celWhatsapp FROM Alunos WHERE id = ?'

        const [InfoAluno] = await connection.execute(query, [userid]);
        return InfoAluno;    

};


const getAll = async() => {

    try {
        const query = ('SELECT * FROM Alunos');

        const [alunos] = await connection.execute(query);
        return alunos;
    } catch (error) {
        return res.status(500).json({ status: 7 });
    }

}; 



const getAllTurmas = async(userId) => {

    const query = 'SELECT Aluno_turma.idTurma AS idTurma, Escola.nomeEscola AS nomeEscola, Modulos.modulo AS nomeModulo, Aluno_turma.descricao AS descricao FROM Aluno_turma JOIN Turma ON Aluno_turma.idTurma = Turma.id JOIN Modulos ON Turma.idModulo = Modulos.id JOIN Escola ON Turma.idEscola = Escola.id WHERE Aluno_turma.idAluno = ?;'

    const [suasTurmas] = await connection.execute(query, [userId]);

    return suasTurmas;
};


const getAllAulasTurma = async(idTurma) => {

    const query = 'SELECT Turma_visitas.idTurma, Visitas.data_visita AS Dia_da_visita, Visitas.horario AS Horario_da_visita, Visitas.modalidade AS Modalidade_da_visita FROM Turma_visitas JOIN Turma ON Turma_visitas.idTurma = Turma.id JOIN Visitas ON Turma_visitas.idVisita = Visitas.id where Turma_visitas.idTurma = ?;'

    const [aulaTurma] = await connection.execute(query, [idTurma]);

    return aulaTurma;
};


const getAllFacilitadorTurma = async(idTurma) => {

    const query = 'SELECT Facilitador_turma.idTurma, Facilitador.nome as nomeFacilitador FROM Facilitador_turma JOIN Turma ON Facilitador_turma.idTurma = Turma.id JOIN Facilitador ON Facilitador_turma.idFacilitador = Facilitador.id WHERE Facilitador_turma.idTurma = ?;'

    const [facilitadoresTurma] = await connection.execute(query, [idTurma]);

    return facilitadoresTurma;
};


module.exports = {
getAll,
createAluno,
createCrianca,
getAllCriancas,
getAllInfoAluno,
getAllTurmas,
getAllAulasTurma,
getAllFacilitadorTurma,
};

