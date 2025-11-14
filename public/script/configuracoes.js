document.addEventListener("DOMContentLoaded", async () => {
  const idUsuario = localStorage.getItem("idUsuario");
  if (!idUsuario) return alert("Usuário não encontrado. Faça login novamente.");

  const resposta = await fetch(`/usuarios/${idUsuario}`);
  const usuario = await resposta.json();

  if (!resposta.ok) {
    alert(usuario.erro || "Erro ao buscar dados do usuário.");
    return;
  }

  document.querySelector("#nomezinho").innerHTML = usuario.nome;
});
