const chaveSecreta = "Chave-secreta-do-token-123456789";
const jwt = require("jsonwebtoken");

function autenticar(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send("O token de acesso é necessário");
  }

  try {
    const decodificado = jwt.verify(token, chaveSecreta);
    req.idusuario = decodificado.id;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).send("O token de acesso deve ser válido!");
  }
}

module.exports = { autenticar };
