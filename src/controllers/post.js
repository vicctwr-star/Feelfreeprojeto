const { Router } = require("express");
const { db } = require("../db");
const { autenticar } = require("../authentication");
const rotaPosts = Router();

rotaPosts.get("/posts", async (req, res) => {
  const post = await db.post.findMany({
    include: {
      usuario: true,
    },
  });
  res.json(post);
});

rotaPosts.post("/posts", autenticar, async (req, res) => {
  const { conteudo } = req.body;

  console.log("criando Post");
  console.log({ id: req.idusuario, conteudo });

  const NovoPost = await db.post.create({
    data: {
      curtidas: 0,
      conteudo,
      denuncia: 0,
      usuario: {
        connect: {
          id: req.idusuario,
        },
      },
    },
  });

  console.log(NovoPost);
  res.json({ sucesso: "ok" });
});

rotaPosts.delete("/posts/:id", autenticar, async (req, res) => {
  await db.post.delete({
    where: {
      id: Number(req.params.id),
      usuario: {
        id: req.idusuario,
      },
    },
  });
  res.json({ sucesso: "ok" });
});

rotaPosts.put("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const data = {};

  if (req.body.usuarioId) data.usuarioId = req.body.usuarioId;
  if (req.body.horario) data.horario = req.body.horario;
  if (req.body.curtidas) data.curtidas = req.body.curtidas;
  if (req.body.data) data.data = new Date(req.body.data);
  if (req.body.denuncia) data.denuncia = req.body.denuncia;

  await db.post.update({ where: { id: Number(id) }, data });
  res.json({ sucesso: "ok" });
});

rotaPosts.get("/posts/:id", async (req, res) => {
  const post = await db.post.findUnique({
    where: { id: Number(req.params.id) },
    include: {
      comentarios: {
        include: {
          usuario: true,
        },
      },
      usuario: true,
    },
  });

  console.log(post);

  res.json(post);
});

module.exports = { rotaPosts };
