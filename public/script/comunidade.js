const postagens = [
  {
    id: 1,
    autor: "kenny",
    imagem: "../assets/images/transferir 2 (2).svg",
    conteudo: "autistas KKKKK",
    qntLikes: 0,
    data: 12,
  },
  {
    id: 2,
    autor: "kily",
    imagem: "../assets/images/transferir 2 (2).svg",
    conteudo: "mentira KKKKK",
    qntLikes: 0,
    data: 12,
  },
];

document.querySelector(".publi").innerHTML = "";

function postar(postagem) {
  document.querySelector(".publi").innerHTML += `<div class="post">
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
          <div class="mas_opciones">
                <button class="button_opciones"><img src="../assets/imagens/delete_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt="Eliminar">Deletar</button>
          </div>
        />
      </div>
    </div>
    <p>${postagem.conteudo}</p>
    <div class="post-actions">
      <img class="like-${postagem.id} vazio" onclick="darLike(${postagem.id})" src="../assets/images/Frame (2).svg" alt="like" />
      <a href="/pages/comentarios.html">
        <img src="../assets/images/Frame (1).svg"alt="comentario"/>
      </a>
      </div>
    </div>`;
}

postagens.forEach((postagem) => {
  postar(postagem);
});

function darLike(postagemId) {
  const coracao = document.querySelector(".like-" + postagemId);
  if (coracao.classList.contains("vazio")) {
    coracao.src = "../assets/images/vermelçho.svg";
  } else {
    coracao.src = "../assets/images/Frame (2).svg";
  }

  coracao.classList.toggle("vazio");
}

document.querySelector("form").addEventListener("submit", (even) => {
  even.preventDefault();
  const postagemNova = {
    autor: "bla",
    conteudo: document.querySelector("textarea").value,
    imagem: "../assets/images/transferir 2 (2).svg",
    qntLikes: 0,
    data: 12,
    id: 3,
  };

  postagens.push(postagemNova);
  postar(postagemNova);
});
