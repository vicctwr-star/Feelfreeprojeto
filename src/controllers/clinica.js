const { Router } = require("express");
const { db } = require("../db");
const rotaClinicas = Router();

rotaClinicas.get("/api/clinicas", async (req, res) => {
  const clinicas = await db.clinicas.findMany();
  res.json(clinicas);
});

rotaClinicas.get("/api/clinicas/:id", async (req, res) => {
  const id = Number(req.params.id);
  const clinica = await db.clinicas.findUnique({
    where: { id },
  });

  if (!clinica) {
    return res.status(404).json({ erro: "Clínica não encontrada." });
  }

  res.json(clinica);
});

rotaClinicas.post("/api/clinicas", async (req, res) => {
  const { nome, endereco, cep } = req.body;

  await db.clinicas.create({
    data: { nome, endereco, cep },
  });

  res.json({ sucesso: "ok" });
});

rotaClinicas.delete("/api/clinicas/:id", async (req, res) => {
  await db.clinicas.delete({
    where: { id: Number(req.params.id) },
  });
  res.json({ sucesso: "ok" });
});

rotaClinicas.put("/api/clinicas/:id", async (req, res) => {
  const id = Number(req.params.id);
  const data = {};

  if (req.body.nome) data.nome = req.body.nome;
  if (req.body.endereco) data.endereco = req.body.endereco;
  if (req.body.cep) data.cep = req.body.cep;

  await db.clinicas.update({ where: { id }, data });
  res.json({ sucesso: "ok" });
});

module.exports = { rotaClinicas };
