const postagem = {
  id: 1,
  autor: "kenny",
  imagem: "../assets/images/transferir 2 (2).svg",
  conteudo: "autistas KKKKK",
  qntLikes: 0,
  data: 12,
  comentarios: [
    {
      id: 44,
      autor: "vi",
      imagem: "../assets/images/transferir 2 (2).svg",
      conteudo: "autistas KKKKlllK",
      qntLikes: 0,
      data: 12,
    },
    {
      id: 44,
      autor: "vi",
      imagem: "../assets/images/transferir 2 (2).svg",
      conteudo: "autistas KKKKlllK",
      qntLikes: 0,
      data: 12,
    },
  ],
};

(async () => {
  const searchParams = new URLSearchParams(
    window.location.origin.split("?")[1]
  );
  const resposta = await fetch("/posts/1");
  const postagem = await resposta.json();

  document.querySelectorAll(".publi")[0].innerHTML = `
<div class="post">
          <div class="post-header">
            <img
              src="${postagem.imagem}"
              alt="Perfil"
              class="post-perfil"
            />
            <div class="post-user">
              <strong>${postagem.autor}</strong>
              <span>há 1 min</span>
            </div>
            <div class="opciones_div">
              <img
                src="../assets/images/ellipsis-vertical-solid-full 1.svg"
                alt="mas opciones"
                class="opciones"
              />
              <div class="mas_opciones">
                <button class="button_opciones"><img src="../assets/imagens/delete_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt="Eliminar">Deletar</button>
            </div>
            </div>
          </div>
          <p>${postagem.conteudo}</p>
          <div class="post-actions">
            <img src="../assets/images/Frame (2).svg" alt="like" />
            <img src="../assets/images/Frame (1).svg" alt="comentario" />
          </div>
        </div>
`;

  document.querySelectorAll(".publi")[1].innerHTML = "";
  postagem.comentarios.forEach((comentario) => {
    document.querySelectorAll(".publi")[1].innerHTML += `
<div class="post1">
          <div class="post-header">
            <img
              src="${comentario.imagem}"
              alt="Perfil"
              class="post-perfil"
            />
            <div class="post-user">
              <strong>${comentario.autor}</strong>
              <span>há 1 min</span>
            </div>
            <div class="opciones_div">
              <img
                src="../assets/images/ellipsis-vertical-solid-full 1.svg"
                alt="mas opciones"
                class="opciones"
              />
              <div class="mas_opciones">
                <button class="button_opciones"><img src="../assets/imagens/delete_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt="Eliminar">Deletar</button>
            </div>
            </div>
          </div>
          <p>${comentario.conteudo}</p>
          <div class="post-actions">
            <img src="../assets/images/Frame (2).svg" alt="like" />
          </div>
        </div>
`;
  });
})();
