const express = require("express");
const cors = require("cors");
const { rotaUsuarios } = require("./controllers/usuario");
const server = express();

server.use(cors());
server.use(express.json());
server.use(rotaUsuarios);

const { rotaPosts } = require("./controllers/post");
server.use(rotaPosts);

const { rotaComentarios } = require("./controllers/comentario");
server.use(rotaComentarios);

const { rotaClinicas } = require("./controllers/clinica");
const { autenticar } = require("./authentication");
server.use(rotaClinicas);

server.get("/", autenticar, (req, res) => {
  res.send(req.idusario);
});

server.listen(3000, () => console.log("Rodando"));
