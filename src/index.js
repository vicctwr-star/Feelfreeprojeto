const express = require("express");
const cors = require("cors");
const { rotaUsuarios } = require("./controllers/usuario");
const { rotaLogin } = require("./controllers/login");
const { db } = require("./db.js");

const server = express();

server.use(cors());
server.use(express.json());
server.use(rotaUsuarios);
server.use(rotaLogin);

server.use(express.static("public"));

const { rotaPosts } = require("./controllers/post");
server.use(rotaPosts);

const { rotaComentarios } = require("./controllers/comentario");
server.use(rotaComentarios);

const { rotaClinicas } = require("./controllers/clinica");
const { autenticar } = require("./authentication");
server.use(rotaClinicas);

const { rotaPaginas } = require("./controllers/paginas");
server.use(rotaPaginas);

server.get("/deletarTudo", async (req, res) => {
  await db.post.deleteMany({
    where: {
      usuarioId: 6,
    },
  });

  res.send("Tudo deletado!");
});
server.listen(3000, () => console.log("Rodando"));
