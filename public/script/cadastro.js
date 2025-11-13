document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const nome = document.querySelector("#nome");
    const email = document.querySelector("#email");
    const telefone = document.querySelector("#telefone");
    const senha = document.querySelector("#senha");
    const senha2 = document.querySelector("#senha2");

    login(nome.value, senha.value, email.value, telefone.value, senha2.value);
  });

  async function login(nome, senha, email, telefone, senha2) {
    console.log({ nome, senha, email, telefone, senha2 });

    if (senha != senha2) return;

    const resposta = await fetch("/usuario", {
      method: "POST",
      body: JSON.stringify({
        nome,
        senha,
        email,
        telefone,
        senha2,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    const json = await resposta.json();
    console.log(json);
    window.location.assign("/");
  }
});
