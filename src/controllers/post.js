const { Router } = require("express");
const { db } = require("../db");
const { autenticar } = require("../authentication");

const rotaPosts = Router();

rotaPosts.get("/posts", async (req, res) => {
  try {
    const posts = await db.post.findMany({
      include: {
        usuario: true,
      },
      orderBy: { id: "desc" },
    });
    res.json(posts);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao buscar posts" });
  }
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
  console.log(req.params.id);
  const idPost = Number(req.params.id);

  try {
    const post = await db.post.findUnique({
      where: { id: idPost },
    });

    if (!post) return res.status(404).json({ erro: "Post não encontrado" });
    console.log(post);
    console.log(req.idusuario);
    if (post.usuarioId !== Number(req.idusuario))
      return res.status(403).json({ erro: "Você não pode excluir este post" });

    await db.post.delete({ where: { id: idPost } });
    res.json({ sucesso: "Post excluído com sucesso!" });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao excluir post" });
  }
});

rotaPosts.put("/posts/:id", async (req, res) => {
  const id = Number(req.params.id);
  const data = {};

  if (req.body.usuarioId) data.usuarioId = req.body.usuarioId;
  if (req.body.horario) data.horario = req.body.horario;
  if (req.body.curtidas) data.curtidas = req.body.curtidas;
  if (req.body.data) data.data = new Date(req.body.data);
  if (req.body.denuncia) data.denuncia = req.body.denuncia;

  try {
    await db.post.update({ where: { id }, data });
    res.json({ sucesso: "ok" });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao atualizar post" });
  }
});

rotaPosts.get("/posts/:id", async (req, res) => {
  try {
    const post = await db.post.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        comentarios: {
          include: {
            usuario: true,
          },
          orderBy: { id: "desc" },
        },
        usuario: true,
      },
    });

    if (!post) return res.status(404).json({ erro: "Post não encontrado" });

    const resposta = {
      id: post.id,
      autor: post.usuario.nome,
      imagem: "/images/transferir 2 (2).svg",
      conteudo: post.conteudo,
      qntLikes: post.curtidas,
      comentarios: post.comentarios.map((c) => ({
        id: c.id,
        usuarioId: c.usuarioId,
        autor: c.usuario.nome,
        imagem: "/images/transferir 2 (2).svg",
        conteudo: c.conteudo,
        qntLikes: c.curtidas,
      })),
    };

    res.json(resposta);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao carregar post" });
  }
});

rotaPosts.put("/posts/:id/like", autenticar, async (req, res) => {
  const { id } = req.params;
  const { acao } = req.body;

  try {
    const post = await db.post.findUnique({ where: { id: Number(id) } });

    if (!post) return res.status(404).json({ erro: "Post não encontrado." });

    const novoValor =
      acao === "curtir" ? post.curtidas + 1 : Math.max(post.curtidas - 1, 0);

    const postAtualizado = await db.post.update({
      where: { id: Number(id) },
      data: { curtidas: novoValor },
    });

    res.json(postAtualizado);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao atualizar curtidas." });
  }
});

module.exports = { rotaPosts };
