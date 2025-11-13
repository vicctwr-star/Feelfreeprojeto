document.getElementById("btnCopiar").addEventListener("click", () => {
  const endereco = document.querySelector(".endereco").innerText;

  navigator.clipboard
    .writeText(endereco)
    .then(() => {
      const botao = document.getElementById("btnCopiar");
      const textoOriginal = botao.innerText;
      botao.innerText = "Copiado!";
      setTimeout(() => (botao.innerText = textoOriginal), 2000);
    })
    .catch((err) => {
      console.error("Erro ao copiar:", err);
      alert("Não foi possível copiar o endereço.");
    });
});
