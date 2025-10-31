const express = require("express");
const cors = require("cors");
const { rotaUsuarios } = require("./controllers/usuario");
const { rotaLogin } = require("./controllers/login");
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

server.listen(3000, () => console.log("Rodando"));
