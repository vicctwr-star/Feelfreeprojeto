const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { db } = require("../db");
const { chaveSecreta } = require("../authentication");
const rotaLogin = Router();

rotaLogin.post("/login", async (req, res) => {
  const { nome, senha } = req.body;

  const usuario = await db.usuario.findFirst({
    where: { nome },
  });
  console.log(usuario);
  if (senha !== usuario.senha) {
    res.status(401).json({ mensagem: "Usuario ou senha invalido" });
  }
  const token = jwt.sign({ id: usuario.id, tipo: "usuario" }, chaveSecreta);

  res.json({
    token,
  });
});

module.exports = { rotaLogin };
