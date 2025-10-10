document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const nome = document.querySelector("#email");
    const senha = document.querySelector("#senha");
    login(nome.value, senha.value);
  });
  
  async function login(nome, senha) {
    console.log({ nome, senha });
    const resposta = await fetch("https://r5nvtc-3000.csb.app/login", {
      method: "POST",
      body: JSON.stringify({
      nome,
      senha,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });
  
  const json = await resposta.json();
  sessionStorage.setItem("token", json.token)
  window.location.assign("file:///D:/Thiago%203/blbsbslbsl/feelfree/pages/telainicial.html")  
}
})