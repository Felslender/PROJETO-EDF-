const connection = require('./connection');


const login = async(email, senha) => {

        const queryEmail = 'SELECT * FROM (SELECT senha, email, nomePreferencia, id, idCargo FROM Alunos UNION SELECT senha, email, nomePreferencia,id, idCargo FROM Facilitador UNION SELECT senha, email, NULL AS nomePreferencia, id, idCargo FROM Admins) AS Login_Senha WHERE email = ?';
        const [user] = await connection.execute(queryEmail, [email]);
    
        if (user.length !== 1) {
          return null;
        } else {
        return user;
        }
};

module.exports = {

login,

};