const paramsString = window.location.search;
const searchParams = new URLSearchParams(paramsString);
const id = searchParams.get("id");

document.querySelector(".card").innerHTML = "";

fetch("/api/clinicas/" + id).then(async (res) => {
  const clinica = await res.json();

  document.querySelector(".card").innerHTML = `
    <h2 class="titulo2">${clinica.nome}</h2>
    <p class="titulo1 endereco">
      ${clinica.endereco}
    </p>
    <p class="titulo1">CEP: ${clinica.cep}</p>

    <div class="mapa">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3525.3738264278946!2d-48.84407708500946!3d-26.304407783386627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94deafe0b084c1af%3A0x2e1b6f0f1f0d0c7f!2sJoinville%2C%20SC!5e0!3m2!1spt-BR!2sbr!4v1695757052000!5m2!1spt-BR!2sbr"
        allowfullscreen=""
        loading="lazy"
      ></iframe>
    </div>

    <div>
      <button class="boton_mapa" id="btnCopiar">📋 Copiar endereço</button>
    </div>
  `;
});

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
