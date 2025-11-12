(async () => {
  const response = await fetch("/posts");
  const postagens = (await response.json()).map((postagem) => ({
    id: postagem.id,
    autor: postagem.usuario.nome,
    imagem: "/images/transferir 2 (2).svg",
    conteudo: postagem.conteudo,
    qntLikes: postagem.curtidas,
    data: postagem.data,
    usuarioId: postagem.usuarioId,
  }));

  console.log(postagens);

  document.querySelector(".publi").innerHTML = "";
  postagens.forEach((postagem) => postar(postagem));

  document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const postagemNova = {
      autor: localStorage.getItem("nome") || "guest",
      conteudo: document.querySelector("textarea").value,
      imagem: "/images/transferir 2 (2).svg",
      qntLikes: 0,
      data: new Date().toISOString(),
      usuarioId: localStorage.getItem("idUsuario"),
    };

    postar(postagemNova, true);
  });
})();

async function postar(postagem, db = false) {
  if (db) {
    const response1 = await fetch("/posts", {
      method: "POST",
      body: JSON.stringify({
        conteudo: postagem.conteudo,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });

    if (!response1.ok) {
      alert("Deu erro ao postar.");
      return;
    }

    const response = await fetch("/posts");
    const postagens = (await response.json()).map((postagem) => ({
      id: postagem.id,
      autor: postagem.usuario.nome,
      imagem: "/images/transferir 2 (2).svg",
      conteudo: postagem.conteudo,
      qntLikes: postagem.curtidas,
      data: postagem.data,
      usuarioId: postagem.usuarioId,
    }));

    console.log(postagens);

    document.querySelector(".publi").innerHTML = "";
    postagens.forEach((postagem) => postar(postagem));
  }

  const idUsuarioLogado = localStorage.getItem("idUsuario");

  document.querySelector(".publi").innerHTML += `
    <div class="post">
      <div class="post-header">
        <img src="${postagem.imagem}" alt="Perfil" class="post-perfil" />
        <div class="post-user">
          <strong>${postagem.autor}</strong>
          <span>há 1 min</span>
        </div>
        <div class="opciones_div">
          ${
            postagem.usuarioId == idUsuarioLogado
              ? `<img 
                  src="/images/lixeira.svg.svg" 
                  alt="excluir" 
                  class="opciones"
                  onclick="excluirPost(${postagem.id})"
                />`
              : ""
          }
        </div>
      </div>
      <p>${postagem.conteudo}</p>
      <div class="post-actions">
        <img 
          class="like-${postagem.id} vazio" 
          onclick="darLike(${postagem.id})" 
          src="/images/Frame (2).svg" 
          alt="like" 
        />
        <a href="/comentarioss?id=${postagem.id}">
          <img src="/images/Frame (1).svg" alt="comentario" />
        </a>
      </div>
    </div>`;
}

function darLike(postagemId) {
  const coracao = document.querySelector(".like-" + postagemId);
  coracao.classList.toggle("vazio");
  coracao.src = coracao.classList.contains("vazio")
    ? "/images/Frame (2).svg"
    : "/images/vermelçho.svg";
}

async function excluirPost(id) {
  if (!confirm("Tem certeza que deseja excluir este post?")) return;

  console.log(id);
  try {
    const resposta = await fetch(`/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });

    const resultado = await resposta.json();

    if (resposta.ok) {
      alert("Post excluído com sucesso!");
      const post = document.querySelector(`.like-${id}`).closest(".post");
      if (post) post.remove();
    } else {
      alert(resultado.erro || "Erro ao excluir o post.");
    }
  } catch (erro) {
    console.error("Erro ao tentar excluir post:", erro);
    alert("Erro ao conectar com o servidor.");
  }
}
