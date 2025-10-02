async function listarUsuario() {
  const resposta = await fetch("https://kxtq5f-3000.csb.app/clinicas");
  const json = await resposta.json();

  json.forEach((usuario) => {
    document.querySelector("div").innerHTML += `<p>${usuario.nome} </p> `;
  });
}
