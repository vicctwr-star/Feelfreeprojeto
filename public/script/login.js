document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.querySelector("#email");
    const senha = document.querySelector("#senha");
    login(email.value, senha.value);
  });

  async function login(email, senha) {
    console.log({ email, senha });
    const resposta = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        senha,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    const json = await resposta.json();
    console.log(json);
    sessionStorage.setItem("token", json.token);
    window.location.assign("/");
  }
});
