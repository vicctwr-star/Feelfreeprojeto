document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.querySelector("#email").value.trim();
    const senha = document.querySelector("#senha").value.trim();

    if (!email || !senha) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      const resposta = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const json = await resposta.json();
      console.log(json);

      if (!resposta.ok || !json.token) {
        alert(json.mensagem || "Email ou senha incorretos.");
        return;
      }

      sessionStorage.setItem("token", json.token);
      localStorage.setItem("nome", json.nome);
      window.location.assign("/telaInicial");
    } catch (erro) {
      console.error("Erro no login:", erro);
      alert("Erro ao tentar fazer login. Tente novamente.");
    }
  });
});
