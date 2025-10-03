document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const nome = document.querySelector("#nome");
  const senha = document.querySelector("#senha");
  login(nome.value, senha.value);
});

async function login(nome, senha) {
  console.log({ nome, senha });
  const resposta = await fetch("https://kxtq5f-3000.csb.app/login", {
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
  console.log(json);
}
