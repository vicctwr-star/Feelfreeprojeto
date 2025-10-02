const { Router } = require("express");
const { db } = require("../db");
const { autenticar } = require("../authentication");

const rotaComentarios = Router();

rotaComentarios.get("/comentarios", async (req, res) => {
  const post = await db.comentario.findMany();
  res.json(post);
});

rotaComentarios.post("/comentario", async (req, res) => {
  const { usuarioId, postId, conteudo, curtidas } = req.body;

  await db.comentario.create({
    data: {
      conteudo,
      curtidas,
      usuario: {
        connect: {
          id: usuarioId,
        },
      },
      post: {
        connect: {
          id: postId,
        },
      },
    },
  });
  res.json({ sucesso: "ok" });
});

rotaComentarios.delete("/comentarios/:id", async (req, res) => {
  await db.comentario.delete({
    where: {
      id: Number(req.params.id),
      OR: [{ usuarioId: usuarioId }, { post: { usuarioId: usuarioId } }],
    },
  });

  res.json({ sucesso: "ok" });
});

rotaComentarios.put("/comentarios/:id", async (req, res) => {
  const id = req.params.id;
  const data = {};

  if (req.body.conteudo) data.conteudo = req.body.conteudo;
  if (req.body.curtidas) data.curtidas = req.body.curtidas;

  await db.comentario.update({ where: { id: Number(id) }, data });
  res.json({ sucesso: "ok" });
});

module.exports = { rotaComentarios };
