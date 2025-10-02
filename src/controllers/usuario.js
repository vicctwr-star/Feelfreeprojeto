const { autenticar } = require("../authentication.js");

const { Router } = require("express");

const { db } = require("../db.js");

const rotaUsuarios = Router();

rotaUsuarios.get("/usuarios", autenticar, async (req, res) => {
  const usuarios = await db.usuario.findMany();
  res.json(usuarios);
});

rotaUsuarios.post("/usuario", async (req, res) => {
  const { nome, senha, email } = req.body;

  await db.usuario.create({
    data: { nome, senha, email },
  });

  res.json({ sucesso: "ok" });
});

rotaUsuarios.delete("/usuarios/:id", autenticar, async (req, res) => {
  await db.usuario.delete({
    where: { id: Number(req.params.id) },
  });
  res.json({ sucesso: "ok" });
});

rotaUsuarios.put("/usuarios/:id", autenticar, async (req, res) => {
  const id = Number(req.params.id);
  const data = {};

  if (req.body.nome) data.nome = req.body.nome;
  if (req.body.email) data.email = req.body.email;
  if (req.body.senha) data.senha = req.body.senha;

  await db.usuario.update({ where: { id }, data });
  res.json({ sucesso: "ok" });
});

module.exports = { rotaUsuarios };
