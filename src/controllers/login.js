const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { db } = require("../db");
const rotaLogin = Router();

rotaLogin.get("/login", async (req, res) => {
  const { nome, senha } = req.body;

  const usuario = db.usuario.findUnique({
    where: { nome },
  });
  if (senha !== usuario.senha) {
    res.status(401).json({ mensagem: "Usuario ou senha invalido" });
  }

  const token = jwt.sign(
    { id: usuario.id, tipo: "usuario" },
    "Chave-secreta-123456789"
  );

  res.json({
    token,
  });
});

module.exports = { rotaLogin };
