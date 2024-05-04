const models = require('../Models/modelAluno');
const connection = require('../Models/connection');

const getAll = async(req,res) => {

    try {
        const Alunos = await models.getAll();
        return res.status(200).json(Alunos);
    } catch (error) {
        return res.status(500).json({ status: 7});
    }
};


const createAluno = async(req, res) => {

    try {
        
        const createdAluno = await models.createAluno(req.body);
        return res.status(201).json(createdAluno);
    } catch (error) {
        return res.status(500).json({ status: 4 , error: error.message});
    }
    
};


const createCrianca = async (req, res) => {
    try{
        const userId = req.user.userId; 
        const criancaData = req.body;
        criancaData.ID_Aluno = userId;
    
        const createdCrianca = await models.createCrianca(criancaData, userId);
        return res.status(201).json(createdCrianca);
    } catch(error){
        return res.status(500).json({status: 3});
    }
};


const getAllCriancas = async (req, res) => {
    
    try {
        const userId = req.user.userId; 
        const criancaData = req.body;
        criancaData.ID_Aluno = userId;

        const CriancasAluno = await models.getAllCriancas(userId);
        return res.status(200).json(CriancasAluno);
    } catch (error) {
        return res.status(500).json({ status: 5 });
    }

};

const getAllInfoAluno = async (req, res) => {

        const userId = req.user.userId; 
        const AlunoData = req.body;
        AlunoData.ID_Aluno = userId;

        const InfoAlunoList = await models.getAllInfoAluno(userId);

        if(!InfoAlunoList.length){
            return res.status(500).json({ erro: "erro ao buscar por suas informações" });
        }
        const firstAluno = InfoAlunoList[0]
        return res.status(200).json(firstAluno);
};

const getAllTurmas = async (req, res) => {
    try {
        const userId = req.user.userId; 
        const AlunoData = req.body;
        AlunoData.ID_Aluno = userId;
        
        const suasTurmas = await models.getAllTurmas(userId);

        return res.status(200).json(suasTurmas);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: "Erro interno do servidor" });
    }
};



const getAllAulasTurma = async(req, res) => {

    const idTurma = req.params.idTurma;
    const aulaTurma = await models.getAllAulasTurma(idTurma);

    res.status(200).json({aulas: aulaTurma});
};



const getAllFacilitadorTurma = async(req, res) => {
    try{
    const idTurma = req.params.idTurma;
    const facilitadoresTurma = await models.getAllFacilitadorTurma(idTurma);

    res.status(200).json({facilitadores: facilitadoresTurma});
    } catch(error){
        res.status(500).json({error: "Nenhum facilitador encontrado!"})
    }
}


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