document.querySelector("#btnSalvar").addEventListener("click", async () => {
  const novoNome = document.querySelector("#novoNome").value.trim();

  if (!novoNome) {
    alert("Digite um nome antes de salvar!");
    return;
  }

  const idUsuario = localStorage.getItem("idUsuario");

  const resposta = await fetch(`/usuarios/${idUsuario}/nome`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nome: novoNome }),
  });

  if (resposta.ok) {
    const dados = await resposta.json();
    localStorage.setItem("nome", dados.nome);
    alert("Nome alterado com sucesso!");
    window.location.href = "/configuracoes";
  } else {
    const erro = await resposta.json();
    alert(erro.erro || "Erro ao alterar nome.");
  }
});
