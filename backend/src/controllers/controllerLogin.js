const models = require('../Models/modelLogin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const login = async (req, res) => {
  try {
    const { email, senha } = req.body;
   ;
    const user = await models.login(email, senha);
    
    if (user == null) {
      return res.status(401).json({status: 11, error: 'Credenciais inválidas' });
    };

    const HashedPassword = user[0].senha;

    const passwordMatch = await bcrypt.compare(senha, HashedPassword);

    if (passwordMatch) {
      const token = jwt.sign(
        {
          userId: user[0].id,
          nomePreferencia: user[0].nomePreferencia,
          email: user[0].email,
          role: user[0].idCargo,
        },
        process.env.SECRET,
        { expiresIn: '1h' }
      );
      return res.json({ token });
    } else {
      return res.status(401).json({ status: 12 ,error: 'Credenciais inválidas' });
    }
  } catch (error) {
    return res.status(500).json({ status: 8 });
  }
  
} 



module.exports = {
  login,
};

