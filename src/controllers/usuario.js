const { autenticar } = require("../authentication.js");

const { Router } = require("express");

const { db } = require("../db.js");

const rotaUsuarios = Router();

rotaUsuarios.get("/usuarios", autenticar, async (req, res) => {
  const usuarios = await db.usuario.findMany({
    include: {
      posts: true,
      comentarios: true,
    },
  });
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

rotaUsuarios.put("/usuarios/:id/nome", async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ erro: "O nome é obrigatório." });
  }

  try {
    const usuarioAtualizado = await db.usuario.update({
      where: { id: Number(id) },
      data: { nome },
    });

    res.json(usuarioAtualizado);
  } catch (erro) {
    console.error("Erro ao atualizar nome:", erro);
    res.status(500).json({ erro: "Erro ao atualizar nome." });
  }
});

module.exports = { rotaUsuarios };
