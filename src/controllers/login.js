const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { db } = require("../db");
const { chaveSecreta } = require("../authentication");
const rotaLogin = Router();

rotaLogin.post("/api/login", async (req, res) => {
  const { email, senha } = req.body;
  console.log("oie");
  const usuario = await db.usuario.findFirst({
    where: { email },
  });
  console.log(usuario);
  if (!usuario) {
    res.status(401).json({ mensagem: "Usuario ou senha invalido" });
    return;
  }
  if (senha !== usuario.senha) {
    res.status(401).json({ mensagem: "Usuario ou senha invalido" });
  }

  const token = jwt.sign({ id: usuario.id, tipo: "usuario" }, chaveSecreta);

  res.json({
    token,
    nome: usuario.nome,
  });
});

module.exports = { rotaLogin };
