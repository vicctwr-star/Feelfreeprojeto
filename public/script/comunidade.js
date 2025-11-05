(async () => {
  const response = await fetch("/posts");
  const postagens = (await response.json()).map((postagem) => ({
    id: postagem.id,
    autor: postagem.usuario.nome,
    imagem: "/images/transferir 2 (2).svg",
    conteudo: postagem.conteudo,
    qntLikes: postagem.curtidas,
    data: postagem.data,
  }));
  console.log(postagens);

  document.querySelector(".publi").innerHTML = "";

  postagens.forEach((postagem) => {
    postar(postagem);
  });

  document.querySelector("form").addEventListener("submit", (even) => {
    even.preventDefault();
    const postagemNova = {
      autor: localStorage.getItem("nome") || "guest",
      conteudo: document.querySelector("textarea").value,
      imagem: "/images/transferir 2 (2).svg",
      qntLikes: 0,
      data: 12,
      id: 3,
    };

    postagens.push(postagemNova);
    postar(postagemNova, true);
  });
})();

async function postar(postagem, db = false) {
  if (db) {
    const response = await fetch("/posts", {
      method: "POST",
      body: JSON.stringify({
        conteudo: postagem.conteudo,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });

    if (!response.ok) {
      alert("Deu erro");
      return;
    }
  }

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
          src="/images/ellipsis-vertical-solid-full 1.svg"
          alt="mas opciones"
          class="opciones"
        />
      </div>
    </div>
    <p>${postagem.conteudo}</p>
    <div class="post-actions">
      <img class="like-${postagem.id} vazio" onclick="darLike(${postagem.id})" src="/images/Frame (2).svg" alt="like" />
      <a href="/comentarioss?id=${postagem.id}">
        <img src="/images/Frame (1).svg"alt="comentario"/>
      </a>
      </div>
    </div>`;
}

function darLike(postagemId) {
  const coracao = document.querySelector(".like-" + postagemId);
  if (coracao.classList.contains("vazio")) {
    coracao.src = "/images/vermelçho.svg";
  } else {
    coracao.src = "/images/Frame (2).svg";
  }

  coracao.classList.toggle("vazio");
}
