const { Router } = require("express");
const { db } = require("../db");
const { autenticar } = require("../authentication");
const rotaPosts = Router();

rotaPosts.get("/posts", async (req, res) => {
  const post = await db.post.findMany();
  res.json(post);
});

rotaPosts.post("/posts", async (req, res) => {
  const { usuarioId, curtidas, conteudo, denuncia } = req.body;

  await db.post.create({
    data: {
      curtidas,
      conteudo,
      denuncia,
      usuario: {
        connect: {
          id: usuarioId,
        },
      },
    },
  });
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
  if (req.body.data) data.data = req.body.data;
  if (req.body.denuncia) data.denuncia = req.body.denuncia;

  await db.post.update({ where: { id: Number(id) }, data });
  res.json({ sucesso: "ok" });
});

rotaPosts.get("/posts/:id", async (req, res) => {
  const post = await db.post.findUnique({
    where: { id: Number(req.params.id) },
    include: {
      comentarios: true,
    },
  });
  res.json(post);
});

module.exports = { rotaPosts };
