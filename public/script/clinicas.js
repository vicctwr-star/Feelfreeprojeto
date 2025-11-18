document.querySelector(".clinicas").innerHTML = "";

fetch("/api/clinicas").then(async (res) => {
  const clinicas = await res.json();

  clinicas.forEach((clinica) => {
    document.querySelector(".clinicas").innerHTML += `
  <div class="clinica">
      <div class="nome">${clinica.nome}</div>
      <div class="endereco">
          ${clinica.endereco}
      </div>
      <a href="/infoClinica?id=${clinica.id}">Ver mais informações...</a>
    </div>
  `;
  });
});
