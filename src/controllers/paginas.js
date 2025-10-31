const { Router } = require("express");
const rotaPaginas = Router();

rotaPaginas.get("/", async (req, res) => {
  res.sendFile(__dirname + "/pages/telaInicial.html");
});

rotaPaginas.get("/login", async (req, res) => {
  res.sendFile(__dirname + "/pages/login.html");
});

rotaPaginas.get("/cadastro", async (req, res) => {
  res.sendFile(__dirname + "/pages/cadastro.html");
});


rotaPaginas.get("/clinicas", async (req, res) => {
    res.sendFile(__dirname + "/pages/clinicas.html");
});


rotaPaginas.get("/codigo", async (req, res) => {
    res.sendFile(__dirname + "/pages/codigo.html");
});


rotaPaginas.get("/comentarios", async (req, res) => {
    res.sendFile(__dirname + "/pages/comentarios.html");
});


rotaPaginas.get("/comunidade", async (req, res) => {
    res.sendFile(__dirname + "/pages/comunidade.html");
});


rotaPaginas.get("/confi", async (req, res) => {
    res.sendFile(__dirname + "/pages/confi.html");
});


rotaPaginas.get("/configurações", async (req, res) => {
    res.sendFile(__dirname + "/pages/configurações.html");
});


rotaPaginas.get("/direitos", async (req, res) => {
    res.sendFile(__dirname + "/pages/direitos.html");
});


rotaPaginas.get("/infoClinica", async (req, res) => {
    res.sendFile(__dirname + "/pages/infoClinica.html");
});


rotaPaginas.get("/perfil", async (req, res) => {
    res.sendFile(__dirname + "/pages/perfil.html");
});


rotaPaginas.get("/usuarios", async (req, res) => {
    res.sendFile(__dirname + "/pages/usuarios.html");
});

module.exports = { rotaPaginas };
